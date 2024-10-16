document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const main = document.querySelector('main')
    const mainNav = document.getElementById('main-nav');
    const stickyLogoContainer = document.querySelector('.sticky-logo-container');
    const stickyOffset = header.offsetHeight;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon').firstElementChild;
    const menuToggle = document.getElementById('sidebar-toggle');
    const sideBar = document.getElementById('side-bar');
    const closeMenu = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay');
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let isShrunk = false;

    window.addEventListener('scroll', function () {
        if (window.scrollY > stickyOffset && !isShrunk) {
            header.classList.add('shrink');
            isShrunk = true;
        } else if (window.scrollY <= stickyOffset && isShrunk) {
            header.classList.remove('shrink');
            isShrunk = false;
        }
    });


    // Sprawdź preferencje zapisane w localStorage
    let theme = localStorage.getItem('theme') || (userPrefersDark ? 'dark' : 'light');
    setTheme(theme);

    // Event listener do przełączania motywu
    themeToggle.addEventListener('click', function () {
        const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });

    function setTheme(theme) {
        document.body.classList.toggle('light-theme', theme === 'light');
        document.body.classList.toggle('dark-theme', theme === 'dark');
        themeIcon.classList.toggle('fa-sun', theme === 'light');
        themeIcon.classList.toggle('fa-moon', theme === 'dark');
        themeToggle.setAttribute('aria-label', theme === 'light' ? 'Zmień na ciemny motyw' : 'Zmień na jasny motyw');
        localStorage.setItem('theme', theme);
    }

    // Sidebar toggle
    menuToggle.addEventListener('click', function () {
        sideBar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    closeMenu.addEventListener('click', function () {
        sideBar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    overlay.addEventListener('click', function () {
        sideBar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});


