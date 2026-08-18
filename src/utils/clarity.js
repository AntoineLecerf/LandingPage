/**
 * Microsoft Clarity Analytics & Tracker Utility
 * 
 * To connect Microsoft Clarity:
 * 1. Add your Clarity Project ID in .env: VITE_CLARITY_ID=your_id_here
 * 2. Or initialize directly with initClarity('your_id_here')
 */

let isClarityInitialized = false;

/**
 * Initialize Microsoft Clarity script asynchronously
 * @param {string} [customId] - Optional Clarity project ID. Defaults to import.meta.env.VITE_CLARITY_ID
 */
export function initClarity(customId) {
  const clarityId = customId || (typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_CLARITY_ID : null);

  if (!clarityId) {
    console.info(
      '%c[Microsoft Clarity]%c Aucun ID de projet configuré. Ajoutez VITE_CLARITY_ID dans votre fichier .env pour activer le tracking en direct.',
      'color: #f39313; font-weight: bold;',
      'color: inherit;'
    );
    return;
  }

  if (isClarityInitialized || (typeof window !== 'undefined' && window.clarity)) {
    return;
  }

  try {
    (function(c, l, a, r, i, t, y) {
      c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", clarityId);

    isClarityInitialized = true;
    console.info(`%c[Microsoft Clarity]%c Initialisé avec succès (ID: ${clarityId})`, 'color: #558D4D; font-weight: bold;', 'color: inherit;');
  } catch (error) {
    console.error('[Microsoft Clarity] Erreur lors de l\'initialisation:', error);
  }
}

/**
 * Track a custom event in Microsoft Clarity
 * @param {string} eventName - Name of the event (e.g. 'cta_click', 'lead_form_submitted')
 */
export function trackEvent(eventName) {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    try {
      window.clarity('event', eventName);
    } catch (e) {
      console.warn('[Clarity] trackEvent error:', e);
    }
  }
}

/**
 * Set a custom tag or dimension in Microsoft Clarity
 * @param {string} key - Tag name (e.g. 'persona', 'source')
 * @param {string} value - Tag value (e.g. 'foodtruck', 'boucher')
 */
export function setClarityTag(key, value) {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    try {
      window.clarity('set', key, value);
    } catch (e) {
      console.warn('[Clarity] setTag error:', e);
    }
  }
}

/**
 * Track a virtual page view (useful for SPA route changes)
 * @param {string} pagePath - URL path (e.g. '/food-trucks')
 */
export function trackPageView(pagePath) {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    try {
      window.clarity('set', 'page', pagePath);
      // Trigger a virtual page event for easy funnel filtering
      window.clarity('event', `pageview_${pagePath.replace(/[^a-zA-Z0-9]/g, '_')}`);
    } catch (e) {
      console.warn('[Clarity] trackPageView error:', e);
    }
  }
}

/**
 * Identify a registered user in Clarity session
 * @param {string} customId - Unique identifier or hashed user ID
 * @param {string} [friendlyName] - Display name in Clarity dashboard
 */
export function identifyUser(customId, friendlyName) {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    try {
      window.clarity('identify', customId, undefined, undefined, friendlyName);
    } catch (e) {
      console.warn('[Clarity] identifyUser error:', e);
    }
  }
}
