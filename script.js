document.addEventListener('DOMContentLoaded', function() {

  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  const menuOverlay = document.createElement('div');
  menuOverlay.className = 'menu-overlay';
  document.body.appendChild(menuOverlay);
  
  if (burger) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      burger.classList.toggle('toggle');
      menuOverlay.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }

  menuOverlay.addEventListener('click', closeMenu);
  
  function closeMenu() {
    if (navLinks) navLinks.classList.remove('active');
    if (burger) burger.classList.remove('toggle');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
  
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
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
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') return;
      
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const isSamePage = targetId.startsWith('#') && 
                        window.location.pathname === '/index.html' || 
                        window.location.pathname === '/';
      
      if (isSamePage) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          closeMenu();
        }
      } else {
        window.location.href = this.href;
      }
    });
  });
  
  if (document.querySelector('.testimonials-carousel')) {
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
  }
  
  if (window.innerWidth <= 768 && document.querySelector('.services-carousel')) {
    const servicesCarousel = new Swiper('.services-carousel', {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.services-carousel .swiper-pagination',
        clickable: true,
      },
    });
  }
  
  if (window.innerWidth <= 768 && document.querySelector('.projects-carousel')) {
    const projectsCarousel = new Swiper('.projects-carousel', {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.projects-carousel .swiper-pagination',
        clickable: true,
      },
    });
  }
  
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
      if (document.querySelector('.services-carousel') && !document.querySelector('.services-carousel').swiper) {
        new Swiper('.services-carousel', {
          slidesPerView: 1,
          spaceBetween: 20,
          pagination: {
            el: '.services-carousel .swiper-pagination',
            clickable: true,
          },
        });
      }
      
      if (document.querySelector('.projects-carousel') && !document.querySelector('.projects-carousel').swiper) {
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
  
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .project-card, .testimonial-card, .info-card, .service-highlight');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  document.querySelectorAll('.service-card, .project-card, .testimonial-card, .info-card, .service-highlight').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
});