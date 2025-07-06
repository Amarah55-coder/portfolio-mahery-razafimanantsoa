    document.getElementById('current-year').textContent = new Date().getFullYear();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
        }

        if (targetElement) {
          const headerOffset = document.querySelector('nav').offsetHeight;
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.add('open');
    });

    closeMenuButton.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });

    const sections = document.querySelectorAll('.section');

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); 
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];

    window.addEventListener('scroll', () => {
      let current = '';
      const headerOffset = document.querySelector('nav').offsetHeight;

      sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
          const sectionTop = section.offsetTop - headerOffset - 20; 
          const sectionHeight = section.clientHeight;
          if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = id;
          }
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
          link.classList.add('active');
        }
      });
    });
