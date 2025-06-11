// Обновите ваш script.js следующим кодом:

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const menuOverlay = document.createElement('div');
  menuOverlay.className = 'menu-overlay';
  document.body.appendChild(menuOverlay);
  
  document.querySelectorAll('.nav-links li').forEach((item, index) => {
    item.style.setProperty('--i', index);
  });

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  menuOverlay.addEventListener('click', closeMenu);
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  function closeMenu() {
    navLinks.classList.remove('active');
    burger.classList.remove('toggle');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
  
  // Sticky Header
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });
  
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      alert('Thank you for your message! We will contact you soon.');
      this.reset();
    });
  }
  
  // Initialize Swiper Carousels
  // Testimonials Carousel (always visible)
  const testimonialsCarousel = new Swiper('.testimonials-carousel', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.testimonials-carousel .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.testimonials-carousel .swiper-button-next',
      prevEl: '.testimonials-carousel .swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      }
    }
  });
  
  // Services Carousel (mobile only)
  if (window.innerWidth <= 768) {
    const servicesCarousel = new Swiper('.services-carousel', {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.services-carousel .swiper-pagination',
        clickable: true,
      },
    });
  }
  
  // Projects Carousel (mobile only)
  if (window.innerWidth <= 768) {
    const projectsCarousel = new Swiper('.projects-carousel', {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.projects-carousel .swiper-pagination',
        clickable: true,
      },
    });
  }
  
  // Handle window resize for carousels
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
      if (!document.querySelector('.services-carousel').swiper) {
        new Swiper('.services-carousel', {
          slidesPerView: 1,
          spaceBetween: 20,
          pagination: {
            el: '.services-carousel .swiper-pagination',
            clickable: true,
          },
        });
      }
      
      if (!document.querySelector('.projects-carousel').swiper) {
        new Swiper('.projects-carousel', {
          slidesPerView: 1,
          spaceBetween: 20,
          pagination: {
            el: '.projects-carousel .swiper-pagination',
            clickable: true,
          },
        });
      }
    }
  });
  
  // Animation on Scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .project-card, .testimonial-card, .info-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animated elements
  document.querySelectorAll('.service-card, .project-card, .testimonial-card, .info-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
});