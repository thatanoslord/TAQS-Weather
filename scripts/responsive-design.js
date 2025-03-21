document.addEventListener('DOMContentLoaded', function () {
    const breakpoints = {
        mobile: 480,
        tablet: 768,
        desktop: 1024,
        widescreen: 1200
    };

    let currentDevice = '';

    function detectScreenSize() {
        const width = window.innerWidth;
        let newDevice = '';

        if (width < breakpoints.mobile) {
            newDevice = 'mobile-small';
        } else if (width < breakpoints.tablet) {
            newDevice = 'mobile';
        } else if (width < breakpoints.desktop) {
            newDevice = 'tablet';
        } else if (width < breakpoints.widescreen) {
            newDevice = 'desktop';
        } else {
            newDevice = 'widescreen';
        }

        if (newDevice !== currentDevice) {
            currentDevice = newDevice;
            applyResponsiveLayout(currentDevice);
        }
    }

    function applyResponsiveLayout(device) {
        document.body.classList.remove('device-mobile-small', 'device-mobile', 'device-tablet', 'device-desktop', 'device-widescreen');
        document.body.classList.add(`device-${device}`);

        const container = document.querySelector('.container');
        const sidebar = document.querySelector('.sidebar');
        const rightSidebar = document.querySelector('.right-sidebar');
        const forecastLine = document.querySelector('.forecast-line');
        const activities = document.querySelector('.activities');

        switch (device) {
            case 'mobile-small':
            case 'mobile':
                reorganizeForMobile();
                break;
            case 'tablet':
                reorganizeForTablet();
                break;
            case 'desktop':
            case 'widescreen':
                restoreDesktopLayout();
                break;
        }
    }

    function reorganizeForMobile() {
        const container = document.querySelector('.container');
        container.style.maxWidth = '100%';
        document.querySelector('.forecast').style.overflowX = 'auto';
        adjustMainIconStyle();
        adjustTextSizes('mobile');
    }

    function reorganizeForTablet() {
        const container = document.querySelector('.container');
        container.style.maxWidth = '100%';
        adjustMainIconStyle();
        adjustTextSizes('tablet');
    }

    function restoreDesktopLayout() {
        document.querySelector('.container').style.maxWidth = '1200px';
        adjustMainIconStyle();
        adjustTextSizes('desktop');
    }

    function adjustMainIconStyle() {
        const mainIcon = document.querySelector('.main-icon');
        mainIcon.style.position = 'static';
        mainIcon.style.margin = '20px auto';
    }

    function adjustTextSizes(device) {
        const weatherStatus = document.querySelector('.weather-status');
        const temperature = document.querySelector('.temperature');
        if (device === 'mobile') {
            weatherStatus.style.fontSize = '32px';
            temperature.style.fontSize = '48px';
        } else if (device === 'tablet') {
            weatherStatus.style.fontSize = '38px';
            temperature.style.fontSize = '54px';
        } else {
            weatherStatus.style.fontSize = '42px';
            temperature.style.fontSize = '60px';
        }
    }

    window.addEventListener('resize', detectScreenSize);
    detectScreenSize();  // Initial detection
});
