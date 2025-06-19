// Dead Poets Society Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Scroll animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-category, .project-card, .stat, .contact-item, .timeline-item, .academic-category, .quote-banner');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in-up');
            }
        });
    }

    // Navbar background on scroll
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(60, 36, 20, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(60, 36, 20, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Typing animation for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing animation for hero title
    const heroTitle = document.querySelector('.title-line');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }

    // Parallax effect for book stack
    function parallaxBooks() {
        const books = document.querySelectorAll('.book');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        books.forEach((book, index) => {
            const speed = (index + 1) * 0.1;
            book.style.transform += ` translateY(${rate * speed}px)`;
        });
    }

    // Skill items hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        item.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Project cards 3D tilt effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Academic timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`;
    });

    // Academic categories stagger animation
    const academicCategories = document.querySelectorAll('.academic-category');
    academicCategories.forEach((category, index) => {
        category.style.animationDelay = `${index * 0.2}s`;
    });

    // Academic list items hover effect
    const academicListItems = document.querySelectorAll('.academic-list li');
    academicListItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.animation = 'subtle-glow 0.3s ease-in-out';
        });
        
        item.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Quote rotation
    const quotes = [
        '"No matter what anybody tells you, words and ideas can change the world."',
        '"Carpe diem. Seize the day, boys. Make your lives extraordinary."',
        '"We don\'t read and write poetry because it\'s cute. We read and write poetry because we are members of the human race."',
        '"Sucking the marrow out of life doesn\'t mean choking on the bone."'
    ];

    let currentQuoteIndex = 0;
    const heroQuote = document.querySelector('.hero-quote');

    function rotateQuote() {
        if (heroQuote) {
            heroQuote.style.opacity = '0';
            setTimeout(() => {
                currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
                heroQuote.textContent = quotes[currentQuoteIndex];
                heroQuote.style.opacity = '1';
            }, 500);
        }
    }

    // Rotate quotes every 8 seconds
    setInterval(rotateQuote, 8000);

    // Contact form animation (if added later)
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Social links bounce effect
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.animation = 'bounce 0.6s ease';
        });
        
        link.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Custom cursor effect for interactive elements
    const interactiveElements = document.querySelectorAll('button, .btn, .nav-link, .project-card, .social-link, .timeline-card, .academic-category');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            document.body.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', function() {
            document.body.style.cursor = 'default';
        });
    });

    // Stats counter animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat h3');
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current) + '+';
                    setTimeout(updateCounter, 20);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            // Start animation when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(stat.closest('.stat'));
        });
    }

    // Initialize stats animation
    animateStats();

    // Event listeners
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        animateOnScroll();
        updateNavbarBackground();
        // Uncomment for parallax effect (can be performance intensive)
        // parallaxBooks();
    });

    window.addEventListener('resize', () => {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Initial calls
    updateActiveNavLink();
    animateOnScroll();
    updateNavbarBackground();

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger initial animations
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-text > *');
            heroElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('fade-in-up');
                }, index * 200);
            });
        }, 500);
    });
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
    
    @keyframes subtle-glow {
        0% { text-shadow: none; }
        50% { text-shadow: 0 0 8px rgba(218, 165, 32, 0.6); }
        100% { text-shadow: none; }
    }
    
    .loaded {
        overflow-x: hidden;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    .nav-link.active {
        color: var(--accent-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;

document.head.appendChild(style); 