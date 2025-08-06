
// Header scrolling effect
if (typeof $ !== 'undefined') {
    $(window).on('scroll', function(){
        if($(window).scrollTop() > 100){
            $('header').addClass('nav-show');
        } else {
            $('header').removeClass('nav-show');
        }
    });
} else {
    // Fallback for when jQuery is not available
    window.addEventListener('scroll', function(){
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('nav-show');
        } else {
            header.classList.remove('nav-show');
        }
    });
}

// Mobile navigation toggle
const navSlide = () => {
    const menuIcon = document.querySelector(".menu-icon");
    const navbar = document.querySelector(".navlist");
    const navLinks = document.querySelectorAll(".navlist li");

    if (menuIcon) {
        menuIcon.onclick = () => {
            navbar.classList.toggle("active");
            
            // Animate nav links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = "";
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Hamburger animation
            menuIcon.classList.toggle("toggle");
        }
    }
}

// About section tab functionality
const aboutTabs = () => {
    const tabButtons = document.querySelectorAll('.about-btn button');
    const tabContents = document.querySelectorAll('.content-btn .content');
    
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.style.display = 'none');
            
            // Add active class to clicked button and show corresponding content
            button.classList.add('active');
            tabContents[index].style.display = 'block';
        });
    });
}

// Portfolio filter functionality
const portfolioFilter = () => {
    if (typeof mixitup !== 'undefined') {
        var mixer = mixitup('.portfolio-gallery', {
            selectors: {
                target: '.portfolio-box'
            },
            animation: {
                duration: 300
            }
        });
    }
}

// Skills counter animation
const skillsCounter = () => {
    const counters = document.querySelectorAll('.counter span');
    const circles = document.querySelectorAll('.outer-circle svg circle');
    
    const animateCounters = () => {
        counters.forEach((counter, index) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const circle = circles[index];
            
            if (circle) {
                const circumference = 2 * Math.PI * 75; // radius = 75
                const offset = circumference - (target / 100) * circumference;
                circle.style.strokeDashoffset = offset;
            }
            
            let current = 0;
            const increment = target / 100;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    };
    
    // Trigger animation when skills section is in view
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(skillsSection);
    }
}

// Smooth scrolling for navigation links
const smoothScroll = () => {
    const navLinks = document.querySelectorAll('.navlist a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navbar = document.querySelector('.navlist');
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                }
                
                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// Progress indicator
const progressIndicator = () => {
    const progress = document.getElementById('progress');
    const progressValue = document.getElementById('progress-value');
    
    if (progress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            if (scrollTop > 100) {
                progress.classList.add('active');
            } else {
                progress.classList.remove('active');
            }
        });
        
        progress.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Form submission
const handleFormSubmission = () => {
    const form = document.querySelector('.contact-info form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const firstName = form.querySelector('input[placeholder="First Name"]').value;
            const lastName = form.querySelector('input[placeholder="Last Name"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const subject = form.querySelector('input[placeholder="Subject"]').value;
            const message = form.querySelector('textarea').value;
            
            // Basic validation
            if (!firstName || !lastName || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the data to a server
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    }
}

// Text animation for hero section
const textAnimation = () => {
    const textAnimate = document.querySelector('.text-animate h2');
    const texts = ['Data Analyst', 'Web Developer', 'Problem Solver', 'Tech Enthusiast'];
    let textIndex = 0;
    
    if (textAnimate) {
        setInterval(() => {
            textAnimate.style.opacity = '0';
            setTimeout(() => {
                textAnimate.textContent = texts[textIndex];
                textAnimate.style.opacity = '1';
                textIndex = (textIndex + 1) % texts.length;
            }, 500);
        }, 3000);
    }
}

// Scroll reveal animations
const scrollRevealAnimation = () => {
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 2000,
            reset: true
        });
        
        sr.reveal('.hero-info h3', { delay: 200 });
        sr.reveal('.hero-info h1', { delay: 300 });
        sr.reveal('.hero-info .text-animate', { delay: 400 });
        sr.reveal('.hero-info p', { delay: 500 });
        sr.reveal('.hero-info .btn-box', { delay: 600 });
        sr.reveal('.hero-info .social-media', { delay: 700 });
        
        sr.reveal('.img-hero', { delay: 500, origin: 'right' });
        
        sr.reveal('.about-img', { delay: 300, origin: 'left' });
        sr.reveal('.about-content', { delay: 400, origin: 'right' });
        
        sr.reveal('.certificate-box', { delay: 300, interval: 200 });
        
        sr.reveal('.servicesItem', { delay: 200, interval: 200 });
        sr.reveal('.portfolio-box', { delay: 200, interval: 200 });
        
        sr.reveal('.contact-info', { delay: 300, origin: 'left' });
        sr.reveal('.skills', { delay: 400, origin: 'right' });
    }
}

// Navigation link fade animation keyframes
const navLinkFadeKeyframes = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0px);
        }
    }
`;

// Add keyframes to document
const addKeyframes = () => {
    const style = document.createElement('style');
    style.textContent = navLinkFadeKeyframes;
    document.head.appendChild(style);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addKeyframes();
    navSlide();
    aboutTabs();
    smoothScroll();
    progressIndicator();
    handleFormSubmission();
    textAnimation();
    skillsCounter();
    scrollRevealAnimation();
    
    // Initialize portfolio filter after a short delay to ensure mixitup library is loaded
    setTimeout(portfolioFilter, 100);
});

// Initialize when window loads
window.onload = () => {
    // Additional initialization if needed
    console.log('Portfolio website loaded successfully!');
}
