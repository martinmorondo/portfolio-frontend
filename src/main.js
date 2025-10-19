document.addEventListener('DOMContentLoaded', () => {

    // --- THEME TOGGLER ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');

    // Function to apply the saved theme on page load
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        }
    };

    // Event listener for the theme toggle button
    themeToggleButton.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDarkMode = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        lightIcon.classList.toggle('hidden', isDarkMode);
        darkIcon.classList.toggle('hidden', !isDarkMode);
    });

    // --- SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- TYPEWRITER EFFECT ---
    const typewriterElement = document.getElementById('typewriter');
    const roles = ["Web Developer", "Frontend Specialist", "UI/UX Enthusiast"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        let displayText = '';

        if (isDeleting) {
            displayText = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        typewriterElement.textContent = displayText;

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; 
        }
        
        setTimeout(type, typeSpeed);
    }

    // --- DYNAMIC PROJECT LOADING ---
    const projects = [
        {
            title: "E-commerce Platform",
            description: "A fully responsive e-commerce website with product filtering, a shopping cart, and a checkout process.",
            image: "https://picsum.photos/seed/project1/400/300",
            tags: ["HTML", "Tailwind CSS", "JavaScript"],
            liveUrl: "#",
            codeUrl: "#"
        },
        {
            title: "Task Management App",
            description: "A Kanban-style task management application to organize and track your daily tasks and projects.",
            image: "https://picsum.photos/seed/project2/400/300",
            tags: ["JavaScript", "Local Storage", "Tailwind CSS"],
            liveUrl: "#",
            codeUrl: "#"
        },
        {
            title: "Portfolio Website Template",
            description: "Ongoing development of a modern, minimalist, and adaptable portfolio to showcase projects and skills.",
            image: "https://picsum.photos/seed/project3/400/300",
            tags: ["HTML", "CSS", "JavaScript"],
            liveUrl: "#",
            codeUrl: "#"
        }
    ];

    const projectsGrid = document.getElementById('projects-grid');
    
    function loadProjects() {
        projectsGrid.innerHTML = ''; 
        projects.forEach(project => {
            const projectCard = `
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                        <p class="text-gray-600 dark:text-gray-400 mb-4">${project.description}</p>
                        <div class="mb-4">
                            ${project.tags.map(tag => `<span class="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2">${tag}</span>`).join('')}
                        </div>
                        <div class="flex justify-between">
                            <a href="${project.liveUrl}" target="_blank" class="text-indigo-500 dark:text-indigo-400 hover:underline">Live Demo</a>
                            <a href="${project.codeUrl}" target="_blank" class="text-indigo-500 dark:text-indigo-400 hover:underline">View Code</a>
                        </div>
                    </div>
                </div>
            `;
            projectsGrid.innerHTML += projectCard;
        });
    }

    // --- FADE-IN ON SCROLL ANIMATION ---
    const scrollTargets = document.querySelectorAll('.scroll-target');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    scrollTargets.forEach(target => {
        target.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');
        observer.observe(target);
    });

    // --- CONTACT FORM VALIDATION ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;
        const inputs = ['name', 'email', 'message'];

        // Clear previous errors
        inputs.forEach(id => {
            document.querySelector(`[data-error-for="${id}"]`).classList.add('hidden');
            document.getElementById(id).classList.remove('border-red-500');
        });

        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            isValid = false;
            showError('name', 'Name is required.');
        }

        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            isValid = false;
            showError('email', 'Email is required.');
        } else if (!emailRegex.test(email.value)) {
            isValid = false;
            showError('email', 'Please enter a valid email address.');
        }

        const message = document.getElementById('message');
        if (message.value.trim() === '') {
            isValid = false;
            showError('message', 'Message is required.');
        }

        if (isValid) {
            console.log('Form submitted:', { name: name.value, email: email.value, message: message.value });
            document.getElementById('form-success').classList.remove('hidden');
            contactForm.reset();
            setTimeout(() => {
                document.getElementById('form-success').classList.add('hidden');
            }, 5000);
        }
    });

    function showError(fieldId, message) {
        const errorElement = document.querySelector(`[data-error-for="${fieldId}"]`);
        const inputElement = document.getElementById(fieldId);
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        inputElement.classList.add('border-red-500', 'dark:border-red-500');
    }

    // --- FOOTER CURRENT YEAR ---
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // --- INITIALIZE FUNCTIONS ON PAGE LOAD ---
    applyTheme();
    type();
    loadProjects();
});