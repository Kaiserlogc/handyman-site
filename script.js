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

// Service Modals Data
const servicesData = {
  flooring: {
    title: "Flooring Services",
    icon: "fa-layer-group",
    description: "We provide premium flooring installation services with flawless craftsmanship and attention to detail. Our experts will help you choose the perfect flooring solution for your space.",
    features: [
      "Hardwood flooring installation",
      "Luxury vinyl plank (LVP) flooring",
      "Ceramic and porcelain tile installation",
      "Laminate flooring solutions",
      "Subfloor preparation and repair"
    ],
    bookLink: "book-now.html?service=flooring"
  },
  water: {
    title: "Water Damage Restoration",
    icon: "fa-water",
    description: "Fast, professional water restoration services to protect your home and restore it to its original condition after leaks or flooding.",
    features: [
      "24/7 emergency water extraction",
      "Structural drying and dehumidification",
      "Mold remediation and prevention",
      "Content cleaning and restoration"
    ],
    bookLink: "book-now.html?service=water_restoration"
  },
  deck: {
    title: "Deck & Fence Services",
    icon: "fa-tree",
    description: "Custom deck and fence design and installation services using quality materials to enhance your outdoor living space.",
    features: [
      "Pressure-treated wood decks",
      "Composite decking systems",
      "Custom wood and vinyl fencing",
      "Deck repairs and refinishing"
    ],
    bookLink: "book-now.html?service=deck"
  },
  tile: {
    title: "Tile Work Services",
    icon: "fa-border-style",
    description: "Expert tile installation and repair for floors, walls, and backsplashes with precision craftsmanship and premium materials.",
    features: [
      "Ceramic and porcelain tile installation",
      "Natural stone tile work",
      "Shower and tub surround tiling",
      "Grout repair and sealing"
    ],
    bookLink: "book-now.html?service=tile"
  },
  remodeling: {
    title: "Home Remodeling",
    icon: "fa-home",
    description: "Complete kitchen, bathroom, basement and whole-home transformations to modernize your living spaces with quality craftsmanship.",
    features: [
      "Kitchen remodeling and upgrades",
      "Bathroom renovations",
      "Basement finishing",
      "Whole-home renovations"
    ],
    bookLink: "book-now.html?service=remodeling"
  },
  painting: {
    title: "Drywall & Painting",
    icon: "fa-paint-roller",
    description: "Professional drywall installation, repair and premium painting services to refresh your home's interior and exterior.",
    features: [
      "Drywall installation and finishing",
      "Plaster repair",
      "Interior and exterior painting",
      "Cabinet refinishing"
    ],
    bookLink: "book-now.html?service=painting"
  },
  plumbing: {
    title: "Plumbing Services",
    icon: "fa-faucet",
    description: "Comprehensive plumbing solutions including repairs, installations and maintenance for residential properties.",
    features: [
      "Pipe repair and replacement",
      "Fixture installation",
      "Water heater services",
      "Drain cleaning"
    ],
    bookLink: "book-now.html?service=plumbing"
  },
  electrical: {
    title: "Electrical Services",
    icon: "fa-bolt",
    description: "Licensed electricians providing safe and code-compliant electrical installations, repairs and upgrades for your home.",
    features: [
      "Electrical panel upgrades",
      "Lighting installation",
      "Outlet and switch repairs",
      "Home rewiring"
    ],
    bookLink: "book-now.html?service=electrical"
  }
};

// Открытие модального окна
document.querySelectorAll('.learn-more').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const serviceType = this.dataset.service;
    const serviceData = servicesData[serviceType];
    
    // Заполняем модальное окно
    document.getElementById('modalServiceTitle').textContent = serviceData.title;
    document.getElementById('modalServiceIcon').className = `fas ${serviceData.icon}`;
    document.getElementById('modalServiceDescription').textContent = serviceData.description;
    
    const featuresContainer = document.getElementById('modalServiceFeatures');
    featuresContainer.innerHTML = '<ul></ul>';
    const featuresList = featuresContainer.querySelector('ul');
    
    serviceData.features.forEach(feature => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fas fa-check"></i> ${feature}`;
      featuresList.appendChild(li);
    });
    
    document.getElementById('modalBookLink').href = serviceData.bookLink;
    
    // Показываем модальное окно
    document.getElementById('serviceModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

// Закрытие модального окна
document.querySelectorAll('.close-modal, .close-modal-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.getElementById('serviceModal').style.display = 'none';
    document.body.style.overflow = 'auto';
  });
});

// Закрытие при клике вне окна
window.addEventListener('click', function(e) {
  if (e.target === document.getElementById('serviceModal')) {
    document.getElementById('serviceModal').style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});