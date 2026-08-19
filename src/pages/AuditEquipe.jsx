import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, MessageSquare, Shield, Target, Sparkles, Layers, FileText, ChevronRight, AlertCircle } from 'lucide-react';

const AuditEquipe = () => {
  const [activeTab, setActiveTab] = useState('sections');

  const sectionsAudit = [
    {
      number: '1',
      title: 'Hero Section',
      modelRef: 'Food Truck : « Les food trucks ne devraient pas avancer seuls ! »',
      boucherHeadline: '« Les artisans bouchers ne devraient pas avancer seuls ! »',
      objective: 'Capter immédiatement l’attention par une empathie forte sur la solitude et la surcharge de l\'artisan face aux géants de la distribution.',
      toneAlignment: 'Tonalité 1001 Goûts : Authenticité, plaidoyer pour les métiers de bouche, valorisation du geste et du temps passé.',
      keyPains: 'Solitude du chef d’entreprise, cumul des casquettes (découpe, normes hygiène, gestion des marges face à l\'énergie, administratif).',
      copywritingAnalysis: [
        'Sous-titre miroir : « Gérer une boucherie artisanale, c\'est découper à la perfection, valoriser le terroir, maîtriser ses marges face à l\'énergie et résister à la grande distribution. »',
        'Lead magnet immédiat : promesse d\'un guide 2026-2027 remis sans frais en 2 min d\'avis de terrain.',
        'Visuel smartphone avec badge "0% commission · 100% artisans" pour ancrer la promesse de valeur 1001 Goûts.'
      ],
      teamDiscussion: 'Est-ce que l\'accent mis sur la résistance face aux barquettes industrielles résonne bien auprès de votre échantillon de bouchers testés ?'
    },
    {
      number: '2',
      title: 'Section 2 : Guide Complet Offert',
      modelRef: 'Food Truck : « Guide complet du food truck offert ! » (3 puces de valeur)',
      boucherHeadline: '« Guide complet de l\'artisan boucher offert ! »',
      objective: 'Matérialiser la valeur immédiate du cadeau (Lead Magnet) avant la demande de saisie du formulaire.',
      toneAlignment: 'Tonalité 1001 Goûts : Pédagogie bienveillante, partage de savoir-faire, solutions pragmatiques pour "consommer et produire autrement".',
      keyPains: 'Peur de perdre du temps sur un formulaire inutile si le bénéfice perçu n\'est pas limpide.',
      copywritingAnalysis: [
        'Puce 1 (Marges & Inflation) : « Préserver vos marges brutes face aux hausses du coût de l\'énergie (chambres froides) et des matières premières. »',
        'Puce 2 (Clientèle locale) : « Capter et fidéliser les jeunes actifs du quartier sans sacrifier ses soirées sur les réseaux sociaux. »',
        'Puce 3 (Filière & Recrutement) : « Astuces d\'achats directs éleveurs, circuits courts et recrutement d\'apprentis pour 2026-2027. »'
      ],
      teamDiscussion: 'Le format "Livre blanc / Guide PDF 2026-2027" est-il le format le plus incitatif pour des artisans souvent en boutique de 6h à 20h ?'
    },
    {
      number: '3',
      title: 'Section 3 : Formulaire & Accroche (#formulaire)',
      modelRef: 'Food Truck : Formulaire 2/5 (champs + 2 obstacles max) + Pitch 3/5 « Obtenez les meilleures astuces... »',
      boucherHeadline: '« Obtenez votre guide en 2 min ! » & « Obtenez les meilleures astuces des artisans bouchers »',
      objective: 'Convertir le visiteur en prospect qualifié en réduisant la friction au minimum (temps estimé : 2 min).',
      toneAlignment: 'Tonalité 1001 Goûts : Respect absolu des données, réassurance éthique, co-construction confraternelle.',
      keyPains: 'Méfiance envers le démarchage commercial intrusif ou les abonnements cachés.',
      copywritingAnalysis: [
        'Formulaire segmenté : Prénom, Nom de boucherie, Email, Code Postal.',
        'Checklist "Obstacles rencontrés (2 max)" ciblée boucherie : Marges, Recrutement ouvriers/apprentis, Concurrence supermarchés, Factures d\'énergie, Réseaux sociaux.',
        'Micro-copy réassurance : mention explicite de respect RGPD et politique 0% commission.'
      ],
      teamDiscussion: 'Voulons-nous ajouter une question sur le type de viande (traditionnelle / bio / halal / charcuterie traiteur) ou garder le formulaire ultra-court ?'
    },
    {
      number: '4',
      title: 'Section 4 : Pourquoi remplir le formulaire ? (3 Piliers)',
      modelRef: 'Food Truck : Administration, Communication, Logistique',
      boucherHeadline: '« Pourquoi remplir le formulaire ? » (Gestion & Marges, Communication, Réseau & Confraternité)',
      objective: 'Justifier la démarche de co-construction de l\'application 1001 Goûts et susciter le sentiment d\'appartenance à un mouvement pro-artisanat.',
      toneAlignment: 'Tonalité 1001 Goûts : La communauté comme rempart contre l\'isolement, le "consommActeur" qui vient soutenir le commerce de proximité.',
      keyPains: 'Sentiment d\'impuissance face aux charges fixes et à la mutation des habitudes d\'achat.',
      copywritingAnalysis: [
        'Pilier 1 (Gestion & Marges) : Réponses et leviers pour vivre dignement de son métier sans rogner sur la qualité de découpe.',
        'Pilier 2 (Communication) : Automatiser sa présence auprès des habitants de sa commune sans complexité technique.',
        'Pilier 3 (Réseau & Confraternité) : Force du réseau solidaire 1001 Goûts pour l\'entraide, les achats groupés et la transmission.'
      ],
      teamDiscussion: 'Est-il pertinent d\'introduire dès cette section le futur label "1001 Engagés" pour valoriser les artisans qui font du 100% maison ?'
    },
    {
      number: '5',
      title: 'Section 5 : Preuves Sociales (Témoignages)',
      modelRef: 'Food Truck : 3 citations de gérants avec photo & localisation',
      boucherHeadline: '« Preuves sociales » — Retours de confrères bouchers-charcutiers',
      objective: 'Activer la preuve sociale entre pairs ("Si d\'autres artisans réputés font confiance à 1001 Goûts, je peux y aller").',
      toneAlignment: 'Tonalité 1001 Goûts : Vérité du terrain, pas de faux jargon marketing, parler de carcasse, de froid et de marges réelles.',
      keyPains: 'Scepticisme vis-à-vis des start-ups "tech" qui ne comprennent pas la réalité de l\'artisanat alimentaire.',
      copywritingAnalysis: [
        'Témoignage 1 (Laurent D., 78) : Focus sur l\'équilibre qualité/marges et les coûts du froid.',
        'Témoignage 2 (Stéphanie M., 69) : Focus sur la captation de la clientèle jeune sans y passer ses nuits.',
        'Témoignage 3 (Karim B., 13) : Focus sur la politique 0% commission et la solidarité entre pros.'
      ],
      teamDiscussion: 'Pour la version finale de production, prévoyez-vous d\'interviewer de vrais bouchers partenaires pour intégrer leurs photos réelles ?'
    },
    {
      number: '6',
      title: 'Section 6 : Foire Aux Questions (FAQ)',
      modelRef: 'Food Truck : 4 questions/réponses sur les modalités pratiques',
      boucherHeadline: '« Foire Aux Questions » (Délais, 0% commission, Données, Accès Testeur)',
      objective: 'Lever les dernières objections d\'abandon juste avant la prise de décision.',
      toneAlignment: 'Tonalité 1001 Goûts : Transparence totale, engagement éthique sans détour.',
      keyPains: '"Combien ça coûte ?", "Est-ce un piège ?", "Mes coordonnées vont-elles être revendues ?".',
      copywritingAnalysis: [
        'Q1 : Envoi immédiat en PDF interactif à la validation.',
        'Q2 : Affirmation catégorique de 0% de commission sur les ventes.',
        'Q3 : Confidentialité totale et usage exclusif pour guider le dev de l\'app.',
        'Q4 : Accès prioritaire VIP sans frais pour tester l\'app avant tout le monde.'
      ],
      teamDiscussion: 'Faut-il ajouter une question sur la compatibilité avec leur logiciel de caisse ou garder une FAQ 100% axée sur le guide et la communauté ?'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#FDF3E2] text-[#19522A] pb-24">
      {/* Top Banner Notice */}
      <div className="bg-[#19522A] text-white py-3 px-6 text-xs sm:text-sm font-medium flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="bg-[#F48631] text-white px-2 py-0.5 rounded-full font-bold text-[10px] uppercase">
            Page Interne Équipe
          </span>
          <span>Analyse éditoriale & Débriefing équipe (Vouée à être retirée en production)</span>
        </div>
        <Link
          to="/"
          className="bg-white/15 hover:bg-white/25 text-white px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft size={14} />
          Retour à la Landing Page
        </Link>
      </div>

      {/* Main Header */}
      <header className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#D9DCD5]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F48631]">Dossier d'alignement stratégique</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#19522A] leading-tight">
              Audit & Analyse Copywriting Section par Section
            </h1>
            <p className="text-base text-[#4A4A4A] mt-2 max-w-3xl leading-relaxed">
              Ce document détaille l'adaptation du message pour la cible <strong>Artisans Bouchers</strong>, en miroir parfait avec la landing page <strong>Food Trucks</strong> de votre collègue, tout en respectant l'ADN de marque et le ton officiel de <strong>1001 Goûts</strong>.
            </p>
          </div>
          <Link
            to="/"
            className="bg-[#F48631] hover:bg-[#d97223] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 flex-shrink-0"
          >
            Voir le rendu en direct
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mt-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'sections'
                ? 'bg-[#19522A] text-white shadow-md'
                : 'bg-white text-[#19522A] border border-[#D9DCD5] hover:bg-[#FDF3E2]'
            }`}
          >
            <Layers size={16} />
            Analyse des 6 Sections
          </button>
          <button
            onClick={() => setActiveTab('dna')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'dna'
                ? 'bg-[#19522A] text-white shadow-md'
                : 'bg-white text-[#19522A] border border-[#D9DCD5] hover:bg-[#FDF3E2]'
            }`}
          >
            <Sparkles size={16} />
            ADN Éditorial 1001 Goûts
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-[#19522A] text-white shadow-md'
                : 'bg-white text-[#19522A] border border-[#D9DCD5] hover:bg-[#FDF3E2]'
            }`}
          >
            <Target size={16} />
            Matrice Isomorphique (Food Truck vs Boucher)
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6">
        
        {/* ========================================================================= */}
        {/* TAB 1 : ANALYSE DES 6 SECTIONS                                           */}
        {/* ========================================================================= */}
        {activeTab === 'sections' && (
          <div className="space-y-8 mt-6">
            {sectionsAudit.map((sec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-[#D9DCD5] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#D9DCD5]/60 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-[#19522A] text-white font-display text-lg flex items-center justify-center flex-shrink-0">
                      {sec.number}
                    </span>
                    <div>
                      <span className="text-xs font-bold uppercase text-[#F48631] tracking-wider">
                        Étape {sec.number} du tunnel
                      </span>
                      <h2 className="font-display text-2xl text-[#19522A]">
                        {sec.title}
                      </h2>
                    </div>
                  </div>
                  <div className="bg-[#FDF3E2] px-4 py-2 rounded-xl text-xs font-semibold text-[#19522A] border border-[#D9DCD5]">
                    Ref Modèle : {sec.modelRef}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  {/* Left Column: Objectives & Tone */}
                  <div className="space-y-4">
                    <div className="bg-[#558D4D]/10 p-4 rounded-2xl border border-[#558D4D]/20">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#558D4D] flex items-center gap-1.5 mb-1.5">
                        <Target size={14} />
                        Objectif Psychologique
                      </h3>
                      <p className="text-xs sm:text-sm text-[#19522A] leading-relaxed">
                        {sec.objective}
                      </p>
                    </div>

                    <div className="bg-[#F48631]/10 p-4 rounded-2xl border border-[#F48631]/20">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#F48631] flex items-center gap-1.5 mb-1.5">
                        <Shield size={14} />
                        Alignement Voix de Marque 1001 Goûts
                      </h3>
                      <p className="text-xs sm:text-sm text-[#19522A] leading-relaxed">
                        {sec.toneAlignment}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#4A4A4A] flex items-center gap-1.5 mb-1.5">
                        <AlertCircle size={14} />
                        Douleur Cible Adressée
                      </h3>
                      <p className="text-xs sm:text-sm text-[#667079] leading-relaxed">
                        {sec.keyPains}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Copywriting Breakdown */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#19522A] mb-3 flex items-center gap-1.5">
                      <FileText size={14} />
                      Choix Éditoriaux & Copywriting Retenu
                    </h3>
                    <div className="bg-[#FDF3E2] p-5 rounded-2xl border border-[#D9DCD5] space-y-3 text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                      {sec.copywritingAnalysis.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-[#558D4D] flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Team Talking Point Footer */}
                <div className="bg-[#19522A]/5 p-4 rounded-2xl border border-[#19522A]/15 flex items-start gap-3">
                  <MessageSquare size={18} className="text-[#19522A] flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-[#19522A]">
                    <strong className="font-bold">Point de discussion pour votre équipe :</strong> {sec.teamDiscussion}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2 : ADN ÉDITORIAL 1001 GOÛTS                                         */}
        {/* ========================================================================= */}
        {activeTab === 'dna' && (
          <div className="space-y-8 mt-6">
            <div className="bg-white rounded-3xl p-8 border border-[#D9DCD5] shadow-sm">
              <h2 className="font-display text-2xl text-[#19522A] mb-4">
                La Voix de Marque 1001 Goûts (Extraite de 1001gouts.com)
              </h2>
              <p className="text-sm text-[#667079] leading-relaxed mb-8">
                L'analyse approfondie du site officiel de 1001 Goûts met en lumière un positionnement unique, basé sur l'alliance entre le plaisir de bien manger et la défense intransigeante du commerce artisanal de proximité.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#FDF3E2] border border-[#D9DCD5]">
                  <div className="w-10 h-10 rounded-xl bg-[#19522A] text-white flex items-center justify-center font-bold mb-4">
                    1
                  </div>
                  <h3 className="font-display text-lg text-[#19522A] mb-2">
                    Lutte contre l'isolement de l'artisan
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                    <em>« Face aux chaînes et franchises nationales industrialisées, les artisans ne parviennent pas à se rémunérer à leur juste valeur. »</em> Le discours 1001 Goûts pose la marque comme un allié solidaire et non comme une plateforme de captation de valeur.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#FDF3E2] border border-[#D9DCD5]">
                  <div className="w-10 h-10 rounded-xl bg-[#F48631] text-white flex items-center justify-center font-bold mb-4">
                    2
                  </div>
                  <h3 className="font-display text-lg text-[#19522A] mb-2">
                    Le concept du « ConsommActeur »
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                    Les clients de quartier recherchent du sens, du sain et de la traçabilité. La boucherie artisanale doit être présentée comme le lieu par excellence de cette reconnexion avec le terroir.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#FDF3E2] border border-[#D9DCD5]">
                  <div className="w-10 h-10 rounded-xl bg-[#558D4D] text-white flex items-center justify-center font-bold mb-4">
                    3
                  </div>
                  <h3 className="font-display text-lg text-[#19522A] mb-2">
                    0% de commission & Juste Rémunération
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                    Contrairement aux plateformes de livraison qui prélèvent 20 à 30%, 1001 Goûts sanctuarise la marge de l'artisan : <em>« Aider les artisans à valoriser leur savoir-faire et vivre de leurs passions »</em>.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#FDF3E2] border border-[#D9DCD5]">
                  <div className="w-10 h-10 rounded-xl bg-[#FF859D] text-[#19522A] flex items-center justify-center font-bold mb-4">
                    4
                  </div>
                  <h3 className="font-display text-lg text-[#19522A] mb-2">
                    Le Label « 1001 Engagés »
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
                    La valorisation des artisans qui privilégient le "fait maison", la découpe noble et le respect des filières locales, créant un puissant signal de qualité certifiée pour les clients.
                  </p>
                </div>
              </div>

              {/* Lexical Field */}
              <div className="mt-8 pt-8 border-t border-[#D9DCD5]">
                <h3 className="font-display text-lg text-[#19522A] mb-4">
                  Champ Lexical & Vocabulaire Clé à Préserver
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Confrères & Confraternité',
                    'Juste Rémunération',
                    '0% Commission',
                    'ConsommActeurs',
                    'Savoir-faire artisanal',
                    'Valorisation de la carcasse',
                    'Circuits courts & Terroir',
                    'Commerce de proximité',
                    'Moins d’intermédiaires',
                    'Transparence & Qualité',
                    'Alléger la charge mentale',
                    'Anti-gaspillage',
                  ].map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-[#19522A]/10 text-[#19522A] text-xs font-semibold px-3 py-1.5 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3 : MATRICE ISOMORPHIQUE COMPARATIVE                                 */}
        {/* ========================================================================= */}
        {activeTab === 'matrix' && (
          <div className="bg-white rounded-3xl p-8 border border-[#D9DCD5] shadow-sm mt-6 overflow-x-auto">
            <h2 className="font-display text-2xl text-[#19522A] mb-2">
              Matrice Isomorphique : Food Truck vs Artisan Boucher
            </h2>
            <p className="text-sm text-[#667079] leading-relaxed mb-6">
              Cette grille prouve la symétrie absolue de structure entre le travail de votre collègue et votre landing page, condition essentielle pour votre projet de groupe.
            </p>

            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-[#19522A] text-[#19522A]">
                  <th className="py-3 px-4 font-bold">Section</th>
                  <th className="py-3 px-4 font-bold bg-[#FDF3E2]/60">Page Food Truck (Colleague)</th>
                  <th className="py-3 px-4 font-bold bg-[#558D4D]/10 text-[#558D4D]">Page Artisan Boucher (Notre Page)</th>
                  <th className="py-3 px-4 font-bold">Cohérence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9DCD5]">
                <tr>
                  <td className="py-4 px-4 font-bold text-[#19522A]">1. Hero H1</td>
                  <td className="py-4 px-4 text-[#4A4A4A] bg-[#FDF3E2]/30">
                    « Les food trucks ne devraient pas avancer seuls ! »
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#19522A] bg-[#558D4D]/5">
                    « Les artisans bouchers ne devraient pas avancer seuls ! »
                  </td>
                  <td className="py-4 px-4 text-[#558D4D] font-bold">100% Identique</td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-[#19522A]">1. Hero Subtitle</td>
                  <td className="py-4 px-4 text-[#4A4A4A] bg-[#FDF3E2]/30">
                    Chef cuisinier, comptable, responsable administratif...
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#19522A] bg-[#558D4D]/5">
                    Chef artisan, gestionnaire de marges, hygiène & administratif...
                  </td>
                  <td className="py-4 px-4 text-[#558D4D] font-bold">Transposition directe</td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-[#19522A]">2. Le Guide</td>
                  <td className="py-4 px-4 text-[#4A4A4A] bg-[#FDF3E2]/30">
                    Guide complet du food truck offert ! (Emplacements, démarches)
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#19522A] bg-[#558D4D]/5">
                    Guide complet de l'artisan boucher offert ! (Marges, énergie, local)
                  </td>
                  <td className="py-4 px-4 text-[#558D4D] font-bold">Symétrie parfaite</td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-[#19522A]">3. Formulaire</td>
                  <td className="py-4 px-4 text-[#4A4A4A] bg-[#FDF3E2]/30">
                    Prénom, Nom Food Truck, Email, CP, Obstacles (Mairie, Spots, Météo)
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#19522A] bg-[#558D4D]/5">
                    Prénom, Nom Boucherie, Email, CP, Obstacles (Marges, Énergie, Recrutement)
                  </td>
                  <td className="py-4 px-4 text-[#558D4D] font-bold">Isomorphisme UX</td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-[#19522A]">4. 3 Piliers</td>
                  <td className="py-4 px-4 text-[#4A4A4A] bg-[#FDF3E2]/30">
                    Administration · Communication · Logistique
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#19522A] bg-[#558D4D]/5">
                    Gestion & Marges · Communication · Réseau & Recrutement
                  </td>
                  <td className="py-4 px-4 text-[#558D4D] font-bold">Trinité d'arguments</td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-[#19522A]">5. Preuves sociales</td>
                  <td className="py-4 px-4 text-[#4A4A4A] bg-[#FDF3E2]/30">
                    3 Avis clients / gérants de food trucks
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#19522A] bg-[#558D4D]/5">
                    3 Avis d'artisans bouchers/charcutiers qualifiés
                  </td>
                  <td className="py-4 px-4 text-[#558D4D] font-bold">Symétrie parfaite</td>
                </tr>

                <tr>
                  <td className="py-4 px-4 font-bold text-[#19522A]">6. FAQ</td>
                  <td className="py-4 px-4 text-[#4A4A4A] bg-[#FDF3E2]/30">
                    4 questions pratiques sur le guide et le service
                  </td>
                  <td className="py-4 px-4 font-semibold text-[#19522A] bg-[#558D4D]/5">
                    4 questions précises sur le guide boucher, les marges et l'app
                  </td>
                  <td className="py-4 px-4 text-[#558D4D] font-bold">Même volume de réassurance</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </main>
    </div>
  );
};

export default AuditEquipe;
