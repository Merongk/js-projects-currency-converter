document.addEventListener('DOMContentLoaded', () => {
    const announcementElement = document.getElementById('announcement');
    const currencyBannerElement = document.getElementById('currency-banner');

    // Market open/close announcement
    function showMarketAnnouncement(message) {
        announcementElement.textContent = message;
        announcementElement.style.display = 'block';
    }

    function scheduleMarketAnnouncements() {
        const now = new Date();
        const openTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
        const closeTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0);

        if (now < openTime) {
            setTimeout(() => showMarketAnnouncement('The market is now open!'), openTime - now);
        } else if (now < closeTime) {
            setTimeout(() => showMarketAnnouncement('The market is now closed!'), closeTime - now);
        }
    }

    scheduleMarketAnnouncements();

    // Currency watcher
    function getCurrencyRate(callback) {
        const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
        const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const rate = data.conversion_rates.EUR; // Example for EUR rate
                callback(rate);
            })
            .catch(error => {
                console.error('Error fetching currency rate:', error);
                callback(null);
            });
    }

    function updateCurrencyBanner(rate) {
        if (rate) {
            currencyBannerElement.textContent = `1 USD = ${rate.toFixed(2)} EUR`;
            currencyBannerElement.style.display = 'block';
        } else {
            currencyBannerElement.textContent = 'Error fetching currency rate';
            currencyBannerElement.style.display = 'block';
        }
    }

    function scheduleCurrencyUpdates() {
        getCurrencyRate(rate => updateCurrencyBanner(rate));
        setInterval(() => {
            getCurrencyRate(rate => updateCurrencyBanner(rate));
        }, 60000); // Update every 60 seconds
    }

    scheduleCurrencyUpdates();
});
