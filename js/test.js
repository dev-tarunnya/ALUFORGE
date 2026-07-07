 
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            blue: '#0000CD',
                            'blue-dark': '#0000A3',
                            'blue-light': '#3333E0',
                            maroon: '#8B2323',
                            'maroon-dark': '#6B1A1A',
                            'maroon-light': '#A52D2D',
                            gold: '#FEE469',
                            'gold-dark': '#E8CC3E',
                            'gold-light': '#FFF0A0',
                        },
                        surface: {
                            '50': '#FAFAFA',
                            '100': '#F5F5F5',
                            '200': '#EEEEEE',
                            '300': '#E0E0E0',
                            '400': '#BDBDBD',
                            '500': '#9E9E9E',
                            '600': '#757575',
                            '700': '#616161',
                            '800': '#424242',
                            '900': '#1A1A1A',
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        serif: ['Playfair Display', 'serif'],
                    }
                }
            }
        }

        // Initialize Lucide Icons
        lucide.createIcons();

        // ===== NAVBAR SCROLL EFFECT =====
        const navbar = document.getElementById('navbar');
        const logoText = document.getElementById('logo-text');
        const logoSub = document.getElementById('logo-sub');
        const navLinks = document.querySelectorAll('.nav-link');

        function updateNavbar() {
            if (window.scrollY > 80) {
                navbar.style.background = 'rgba(250,250,250,0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottom = '1px solid rgba(0,0,0,0.06)';
                navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                logoText.classList.remove('text-white');
                logoText.classList.add('text-surface-900');
                logoSub.classList.remove('text-white/60');
                logoSub.classList.add('text-surface-500');
                navLinks.forEach(link => {
                    link.classList.remove('text-white/80', 'hover:text-white', 'hover:bg-white/10');
                    link.classList.add('text-surface-600', 'hover:text-surface-900', 'hover:bg-surface-100');
                });
                document.getElementById('mobile-toggle').classList.remove('text-white', 'hover:bg-white/10');
                document.getElementById('mobile-toggle').classList.add('text-surface-900', 'hover:bg-surface-100');
            } else {
                navbar.style.background = 'transparent';
                navbar.style.backdropFilter = 'none';
                navbar.style.borderBottom = 'none';
                navbar.style.boxShadow = 'none';
                logoText.classList.add('text-white');
                logoText.classList.remove('text-surface-900');
                logoSub.classList.add('text-white/60');
                logoSub.classList.remove('text-surface-500');
                navLinks.forEach(link => {
                    link.classList.add('text-white/80', 'hover:text-white', 'hover:bg-white/10');
                    link.classList.remove('text-surface-600', 'hover:text-surface-900', 'hover:bg-surface-100');
                });
                document.getElementById('mobile-toggle').classList.add('text-white', 'hover:bg-white/10');
                document.getElementById('mobile-toggle').classList.remove('text-surface-900', 'hover:bg-surface-100');
            }
        }
        window.addEventListener('scroll', updateNavbar);
        updateNavbar();

        // ===== MOBILE MENU =====
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileToggle = document.getElementById('mobile-toggle');
        const mobileClose = document.getElementById('mobile-close');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        function openMenu() { mobileMenu.classList.add('open'); document.body.style.overflow = 'hidden'; }
        function closeMenu() { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }

        mobileToggle.addEventListener('click', openMenu);
        mobileClose.addEventListener('click', closeMenu);
        mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

        // ===== SCROLL ANIMATIONS =====
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        // ===== STAT COUNTER ANIMATION =====
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-counter[data-target]');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        const duration = 2000;
                        const start = performance.now();

                        function updateCounter(currentTime) {
                            const elapsed = currentTime - start;
                            const progress = Math.min(elapsed / duration, 1);
                            const eased = 1 - Math.pow(1 - progress, 3);
                            counter.textContent = Math.floor(eased * target) + '+';
                            if (progress < 1) requestAnimationFrame(updateCounter);
                        }
                        requestAnimationFrame(updateCounter);
                    });
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-counter[data-target]').forEach(el => {
            counterObserver.observe(el.closest('.grid') || el.parentElement);
        });

        // ===== PROJECT FILTER =====
        const filterBtns = document.querySelectorAll('.project-filter');
        const projectItems = document.querySelectorAll('.project-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => {
                    b.classList.remove('bg-surface-900', 'text-white');
                    b.classList.add('bg-white', 'text-surface-600', 'border', 'border-surface-200');
                });
                btn.classList.add('bg-surface-900', 'text-white');
                btn.classList.remove('bg-white', 'text-surface-600', 'border', 'border-surface-200');

                const filter = btn.getAttribute('data-filter');

                projectItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = '';
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            item.style.transition = 'all 0.4s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95)';
                        setTimeout(() => { item.style.display = 'none'; }, 300);
                    }
                });
            });
        });

        // ===== BACK TO TOP =====
        const backToTop = document.getElementById('back-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTop.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
                backToTop.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
            } else {
                backToTop.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
                backToTop.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
            }
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    