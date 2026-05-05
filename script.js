/**
 * Skoop App Initializer
 */

async function loadAppData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to load app data:', error);
        return null;
    }
}

async function init() {
    const data = await loadAppData();
    if (!data) return;

    // 1. Apply Styles from App Settings
    const settings = data.sections.app_settings;
    if (settings) {
        document.documentElement.style.setProperty('--primary-color', settings.primary_color.value);
        document.documentElement.style.setProperty('--background-color', settings.background_color.value);
        document.documentElement.style.setProperty('--text-color', settings.text_color.value);
    }

    // 2. Populate Storefront Content
    const storefront = data.sections.storefront;
    if (storefront) {
        document.querySelectorAll('[data-bind-text="storefront.company_name"]').forEach(el => {
            el.textContent = storefront.company_name.value;
        });

        const logo = document.querySelector('.logo');
        if (logo && storefront.logo.value) {
            logo.src = storefront.logo.value;
        }
    }

    // 3. Populate Hero Content
    const hero = data.sections.hero;
    if (hero) {
        const headline = document.querySelector('.headline');
        if (headline) headline.textContent = hero.headline.value;

        const message = document.querySelector('.message');
        if (message) message.textContent = hero.message.value;
    }

    // 4. Reveal the app
    setTimeout(() => {
        document.getElementById('app-container').classList.add('loaded');
    }, 100);
}

// Start the app
init();
