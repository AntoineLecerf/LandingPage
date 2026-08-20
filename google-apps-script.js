/**
 * ==============================================================================
 * 🥩 1001 GOÛTS - GOOGLE APPS SCRIPT (ENREGISTREMENT GOOGLE SHEETS UNIQUEMENT)
 * ==============================================================================
 * Ce script enregistre 100% des prospects dans votre Google Sheet
 * sans demander aucune autorisation d'accès à vos emails.
 */

// ⚙️ CONFIGURATION
const CONFIG = {
  SPREADSHEET_ID: "1jafZFxsShP_9PGPjRi7BkmKMTYPCeWXo2ogO3Fg7Omc", // Votre Google Sheet officiel
  SHEET_NAME: "Prospects Bouchers"
};

/**
 * 🌐 Point d'entrée GET (Vérification de l'état du webhook)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "Webhook Google Sheet 1001 Goûts actif 🥩",
    spreadsheetId: CONFIG.SPREADSHEET_ID
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * 🚀 Point d'entrée POST (Réception et enregistrement du formulaire)
 */
function doPost(e) {
  try {
    let data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    const dateStr = Utilities.formatDate(new Date(), "Europe/Paris", "dd/MM/yyyy HH:mm:ss");
    const firstName = (data.firstName || "").trim();
    const shopName = (data.shopName || "").trim();
    const email = (data.email || "").trim();
    const postalCode = (data.postalCode || "").trim();
    const obstacles = Array.isArray(data.obstacles) ? data.obstacles.join(", ") : (data.obstacles || "");

    // Enregistrement dans Google Sheet
    saveToSheet({
      timestamp: dateStr,
      firstName: firstName,
      shopName: shopName,
      email: email,
      postalCode: postalCode,
      obstacles: obstacles
    });

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Erreur doPost : " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 📊 Écriture dans Google Sheet
 */
function saveToSheet(entry) {
  let ss;
  try {
    ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  } catch (e) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    // En-têtes officiels
    sheet.appendRow([
      "Date & Heure",
      "Prénom",
      "Nom de la boucherie",
      "Email professionnel",
      "Code Postal",
      "Obstacles au quotidien"
    ]);

    // Style de l'en-tête (Vert épinard #19522A)
    const headerRange = sheet.getRange(1, 1, 1, 6);
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
    entry.obstacles
  ]);

  try {
    sheet.autoResizeColumns(1, 6);
  } catch (e) {}
}
