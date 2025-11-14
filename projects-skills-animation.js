// Project and Skills Animations
document.addEventListener('DOMContentLoaded', () => {
    // Project Cards Animation
    function initProjectAnimations() {
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach((project, index) => {
            // Add initial state
            project.style.opacity = '0';
            project.style.transform = 'translateY(50px)';
            project.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Add staggered animation delay
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 200 * index);

            // Add hover effect
            project.addEventListener('mouseenter', (e) => {
                const card = e.currentTarget;
                const cardRect = card.getBoundingClientRect();
                const title = card.querySelector('.project-title');
                const description = card.querySelector('.project-description');
                const techStack = card.querySelector('.project-tech');
                
                // 3D tilt effect
                card.addEventListener('mousemove', (e) => {
                    const x = e.clientX - cardRect.left;
                    const y = e.clientY - cardRect.top;
                    
                    const centerX = cardRect.width / 2;
                    const centerY = cardRect.height / 2;
                    
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                    
                    // Parallax effect for inner elements
                    title.style.transform = `translateZ(50px)`;
                    description.style.transform = `translateZ(30px)`;
                    techStack.style.transform = `translateZ(40px)`;
                });
            });

            project.addEventListener('mouseleave', (e) => {
                const card = e.currentTarget;
                const title = card.querySelector('.project-title');
                const description = card.querySelector('.project-description');
                const techStack = card.querySelector('.project-tech');
                
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                title.style.transform = 'translateZ(0)';
                description.style.transform = 'translateZ(0)';
                techStack.style.transform = 'translateZ(0)';
            });
        });
    }

    // Skills Animation
    function initSkillsAnimation() {
        const skills = document.querySelectorAll('.skills-list span');
        const colors = ['#2563eb', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'];
        
        skills.forEach((skill, index) => {
            // Initial state
            skill.style.opacity = '0';
            skill.style.transform = 'scale(0.8)';
            skill.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Staggered entrance animation
            setTimeout(() => {
                skill.style.opacity = '1';
                skill.style.transform = 'scale(1)';
            }, 100 * index);

            // Hover effects
            skill.addEventListener('mouseenter', () => {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                skill.style.backgroundColor = randomColor;
                skill.style.color = 'white';
                skill.style.transform = 'scale(1.1) translateY(-5px)';
                skill.style.boxShadow = `0 10px 20px ${randomColor}40`;
            });

            skill.addEventListener('mouseleave', () => {
                skill.style.backgroundColor = '';
                skill.style.color = '';
                skill.style.transform = 'scale(1) translateY(0)';
                skill.style.boxShadow = '';
            });
        });

        // Add floating animation to skills section
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            const particles = [];
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '1';
            
            skillsSection.style.position = 'relative';
            skillsSection.prepend(canvas);

            function resizeCanvas() {
                canvas.width = skillsSection.offsetWidth;
                canvas.height = skillsSection.offsetHeight;
            }

            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 3 + 1;
                    this.speedX = Math.random() * 2 - 1;
                    this.speedY = Math.random() * 2 - 1;
                    this.color = colors[Math.floor(Math.random() * colors.length)];
                }

                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;

                    if (this.x > canvas.width) this.x = 0;
                    if (this.x < 0) this.x = canvas.width;
                    if (this.y > canvas.height) this.y = 0;
                    if (this.y < 0) this.y = canvas.height;
                }

                draw() {
                    ctx.fillStyle = this.color + '40';
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            function createParticles() {
                for (let i = 0; i < 50; i++) {
                    particles.push(new Particle());
                }
            }

            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
                
                requestAnimationFrame(animateParticles);
            }

            // Initialize particles
            resizeCanvas();
            createParticles();
            animateParticles();

            // Handle window resize
            window.addEventListener('resize', resizeCanvas);
        }
    }

    // Education underline animation
    function initEducationUnderline() {
        const eduHeading = document.querySelector('.education h2');
        if (!eduHeading) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    eduHeading.classList.add('underline-active');
                }
            });
        }, { threshold: 0.5 });

        observer.observe(eduHeading);
    }

    // Experience underline animation
    function initExperienceUnderline() {
        const expHeading = document.querySelector('.experience h2');
        if (!expHeading) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    expHeading.classList.add('underline-active');
                }
            });
        }, { threshold: 0.5 });

        observer.observe(expHeading);
    }

    // Initialize animations
    function initCertificationsUnderline() {
        const certHeading = document.querySelector('.certifications h2');
        if (!certHeading) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    certHeading.classList.add('underline-active');
                }
            });
        }, { threshold: 0.5 });

        observer.observe(certHeading);
    }

    // initialize
    initProjectAnimations();
    initSkillsAnimation();
    initEducationUnderline();
    initExperienceUnderline();
    initCertificationsUnderline();
});