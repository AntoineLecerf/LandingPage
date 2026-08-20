/**
 * ==============================================================================
 * 🥩 1001 GOÛTS - AUTOMATISATION GOOGLE APPS SCRIPT (SHEETS + EMAIL AUTOMATIQUE)
 * ==============================================================================
 * 
 * Ce script permet :
 * 1. D'enregistrer automatiquement chaque prospect dans votre Google Sheet
 * 2. D'envoyer instantanément un email HTML personnalisé avec le Guide PDF
 * 3. D'alerter l'équipe 1001 Goûts à chaque nouvelle soumission
 *
 * 📌 INSTRUCTIONS D'INSTALLATION :
 * 1. Ouvrez votre Google Sheet (ex: "1001 Goûts - Inscriptions Bouchers")
 * 2. Cliquez sur : Extensions > Apps Script
 * 3. Supprimez le code par défaut et collez l'intégralité de ce fichier
 * 4. Personnalisez la constante PDF_DOWNLOAD_URL avec l'URL de votre PDF
 * 5. Cliquez sur "Déployer" (bouton bleu en haut à droite) > "Nouveau déploiement"
 * 6. Choisissez le type : "Application Web" (icône engrenage)
 *    - Description : "Webhook Formulaire Bouchers"
 *    - Exécuter en tant que : "Moi" (votre compte Google)
 *    - Qui a accès : "Tout le monde" (indispensable pour que le site puisse envoyer les données)
 * 7. Cliquez sur "Déployer", accordez les autorisations Google requises.
 * 8. Copiez l'URL de l'application Web fournie (se terminant par /exec)
 * 9. Collez cette URL dans votre variable VITE_GOOGLE_SCRIPT_URL (dans .env ou Bouchers.jsx)
 */

// ⚙️ CONFIGURATION
const CONFIG = {
  SHEET_NAME: "Prospects Bouchers",
  ADMIN_EMAIL: "contact@1001gouts.com", // Votre adresse pour être notifié (ou "" pour désactiver)
  SENDER_NAME: "1001 Goûts · Artisans Bouchers",
  PDF_DOWNLOAD_URL: "https://www.1001gouts.com/guide-complet-artisan-boucher-2027.pdf", // Lien direct vers le PDF hébergé
  WEBSITE_URL: "https://www.1001gouts.com"
};

/**
 * Point d'entrée pour les requêtes POST provenant de la landing page
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const dateStr = Utilities.formatDate(new Date(), "Europe/Paris", "dd/MM/yyyy HH:mm:ss");

    const firstName = (data.firstName || "").trim();
    const shopName = (data.shopName || "").trim();
    const email = (data.email || "").trim();
    const postalCode = (data.postalCode || "").trim();
    const obstacles = Array.isArray(data.obstacles) ? data.obstacles.join(", ") : (data.obstacles || "");

    // 1. Enregistrement dans Google Sheet
    saveToSheet({
      timestamp: dateStr,
      firstName: firstName,
      shopName: shopName,
      email: email,
      postalCode: postalCode,
      obstacles: obstacles
    });

    // 2. Envoi de l'email automatique au prospect
    if (email) {
      sendProspectEmail({
        firstName: firstName,
        shopName: shopName,
        email: email
      });
    }

    // 3. Notification interne pour l'équipe (optionnel)
    if (CONFIG.ADMIN_EMAIL) {
      sendAdminNotification({
        timestamp: dateStr,
        firstName: firstName,
        shopName: shopName,
        email: email,
        postalCode: postalCode,
        obstacles: obstacles
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Erreur doPost : " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Création ou mise à jour de la feuille Google Sheet avec les en-têtes
 */
function saveToSheet(entry) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    // Création des en-têtes officiels
    sheet.appendRow([
      "Date & Heure",
      "Prénom",
      "Nom de la boucherie",
      "Email professionnel",
      "Code Postal",
      "Obstacles au quotidien",
      "Guide envoyé"
    ]);

    // Mise en forme de l'en-tête (Vert 1001 Goûts)
    const headerRange = sheet.getRange(1, 1, 1, 7);
    headerRange.setBackground("#19522A");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Arial");
    sheet.setFrozenRows(1);
  }

  // Ajout de la ligne prospect
  sheet.appendRow([
    entry.timestamp,
    entry.firstName,
    entry.shopName,
    entry.email,
    entry.postalCode,
    entry.obstacles,
    "Oui (automatique)"
  ]);

  // Ajustement automatique de la largeur des colonnes
  sheet.autoResizeColumns(1, 7);
}

/**
 * Envoi de l'email HTML soigné avec la charte graphique 1001 Goûts
 */
function sendProspectEmail(prospect) {
  const subject = "🥩 Votre Guide Complet de l'Artisan Boucher 2027 est disponible !";
  
  const htmlBody = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #FDF3E2; color: #4A4A4A; margin: 0; padding: 20px; }
      .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; border: 1px solid #D9DCD5; overflow: hidden; }
      .header { background: #19522A; padding: 35px 30px; text-align: center; color: #ffffff; }
      .header h1 { margin: 0 0 8px 0; font-size: 24px; font-weight: bold; color: #ffffff; letter-spacing: 0.5px; }
      .header p { margin: 0; font-size: 15px; color: #FF859D; font-style: italic; }
      .content { padding: 30px; line-height: 1.65; font-size: 15px; }
      .btn { display: inline-block; background-color: #F48631; color: #ffffff !important; font-weight: bold; text-decoration: none; padding: 14px 30px; border-radius: 50px; margin: 20px 0; font-size: 16px; }
      .box { background: #FDF3E2; border-left: 4px solid #558D4D; padding: 15px 20px; border-radius: 8px; margin: 20px 0; }
      .footer { text-align: center; padding: 20px; font-size: 12px; color: #667079; background: #fafafa; border-top: 1px solid #eeeeee; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <h1>1001 GOÛTS</h1>
        <p>Pour valoriser le savoir-faire artisanal</p>
      </div>
      
      <div class="content">
        <p>Bonjour <strong>${prospect.firstName}</strong>,</p>
        
        <p>Merci pour votre participation à la consultation pour votre boucherie <strong>${prospect.shopName}</strong>.</p>
        
        <p>Comme promis, votre <strong>Guide Complet de l'Artisan Boucher 2027</strong> est prêt à être consulté.</p>
        
        <div style="text-align: center;">
          <a href="${CONFIG.PDF_DOWNLOAD_URL}" class="btn" target="_blank">
            📥 Télécharger mon Guide Complet (PDF)
          </a>
        </div>
        
        <div class="box">
          <p style="margin: 0; font-weight: bold; color: #19522A; margin-bottom: 8px;">Ce que vous trouverez dans ce guide :</p>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
            <li>Stratégies concrètes pour préserver vos marges brutes face à l'inflation énergétique.</li>
            <li>Méthodes d'achats groupés en direct éleveurs sans intermédiaires.</li>
            <li>Comment attirer et fidéliser les jeunes foyers de votre quartier à la viande locale.</li>
          </ul>
        </div>
        
        <p style="font-size: 13px; color: #667079;">
          <strong>Notre engagement :</strong> 1001 Goûts applique une règle stricte de <strong>0% de commission</strong> sur les ventes artisanales. Nous sommes à vos côtés pour défendre la juste rémunération de votre savoir-faire.
        </p>
        
        <p style="margin-top: 25px;">
          Bien confraternellement,<br>
          <strong>L'équipe 1001 Goûts</strong><br>
          <a href="${CONFIG.WEBSITE_URL}" style="color: #558D4D; text-decoration: none;">www.1001gouts.com</a>
        </p>
      </div>
      
      <div class="footer">
        1001 Goûts · Consultation Artisans Bouchers · 0% Commission
      </div>
    </div>
  </body>
  </html>
  `;

  GmailApp.sendEmail(prospect.email, subject, "Votre guide est disponible ici : " + CONFIG.PDF_DOWNLOAD_URL, {
    htmlBody: htmlBody,
    name: CONFIG.SENDER_NAME
  });
}

/**
 * Notification par email à l'administrateur
 */
function sendAdminNotification(entry) {
  const subject = `🔔 Nouveau prospect boucher : ${entry.firstName} (${entry.shopName} - ${entry.postalCode})`;
  const body = `
Nouveau prospect inscrit sur la landing page Bouchers :

- Date : ${entry.timestamp}
- Prénom : ${entry.firstName}
- Boucherie : ${entry.shopName}
- Email : ${entry.email}
- Code Postal : ${entry.postalCode}
- Obstacles cochés : ${entry.obstacles}

L'email de confirmation avec le guide a été envoyé automatiquement.
  `;

  GmailApp.sendEmail(CONFIG.ADMIN_EMAIL, subject, body);
}
