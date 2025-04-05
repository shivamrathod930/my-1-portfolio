document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });
    
    // Typing Effect
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    const textArray = ["Web Developer", "UI/UX Designer", "Freelancer", "Photographer"];
    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex>=textArray.length) textArrayIndex=0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    // Start the typing effect on load
    if(textArray.length) setTimeout(type, newTextDelay + 250);
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Project Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if(filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Download CV Button
    const downloadCvBtn = document.getElementById('download-cv');
    
    if(downloadCvBtn) {
        downloadCvBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Downloading CV...');
            // In a real scenario, you would link to your actual CV file
            // window.location.href = 'path/to/your/cv.pdf';
        });
    }
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Animate skills bars on scroll
    const skillBars = document.querySelectorAll('.progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const skillValue = bar.parentElement.previousElementSibling.lastElementChild.textContent;
            bar.style.width = skillValue;
        });
    }
    
    // Intersection Observer for skills animation
    const observerOptions = {
        threshold: 0.5
    };
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillsSection = document.getElementById('skills');
    if(skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Add animation class to elements when they come into view
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.hero-text, .about-content, .skills-content, .projects-grid, .contact-content').forEach(section => {
        animateOnScroll.observe(section);
    });
});