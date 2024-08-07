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
        // Sim
