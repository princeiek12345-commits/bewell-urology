class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    
    // Using template literals for the component structure
    this.shadowRoot.innerHTML = `
      <style>
        /* Scoped styles for the navbar */
        :host {
          display: block;
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .nav-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

       .logo {
        display: flex;
        align-items: center;
        justify-content: center;
      
    }

      .logo img {
        height: 70px;       /* Adjust height as needed */
        width: auto;        /* Keeps image aspect ratio */
        display: block;
    }

        .logo span {
            color: #2dd4bf; /* Teal 400 */
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.2s ease;
          position: relative;
        }

        .nav-link:hover {
          color: white;
        }
        
        .nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -4px;
            left: 0;
            background-color: #2dd4bf;
            transition: width 0.3s;
        }
        
        .nav-link:hover::after {
            width: 100%;
        }

        /* Dropdown Styles */
        .dropdown {
            position: relative;
        }
        
        .dropdown-content {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #0f172a;
            min-width: 200px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            border-radius: 0.5rem;
            padding: 0.5rem 0;
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        .dropdown:hover .dropdown-content {
            display: block;
        }
        
        .dropdown-link {
            display: block;
            padding: 0.75rem 1rem;
            color: #cbd5e1;
            text-decoration: none;
            font-size: 0.9rem;
            transition: background 0.2s;
        }
        
        .dropdown-link:hover {
            background-color: #1e293b;
            color: white;
        }

        .btn-appointment {
          background-color: #0d9488; /* Teal 600 */
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .btn-appointment:hover {
          background-color: #0f766e; /* Teal 700 */
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.3);
        }

        /* Mobile Menu Toggle */
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: white;
            cursor: pointer;
        }

        /* Scrolled State Class (applied via JS) */
        .scrolled {
            background-color: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: #0f172a;
            flex-direction: column;
            padding: 2rem;
            text-align: center;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }
          
          .nav-links.active {
              display: flex;
          }

          .mobile-menu-btn {
              display: block;
          }
          
          .dropdown-content {
              position: static;
              box-shadow: none;
              background-color: #1e293b;
              display: none;
          }
          
          .dropdown.active .dropdown-content {
              display: block;
          }
        }
      </style>

      <nav id="navbar">
        <div class="nav-container">
          <a href="/" class="logo">
          <img src="images/logo2.png">
          </a>


          <button class="mobile-menu-btn" id="mobile-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>

          <ul class="nav-links" id="nav-links">
            <li><a href="index.html" class="nav-link">Home</a></li>
            <li><a href="about.html" class="nav-link">About</a></li>
            <li><a href="service.html" class="nav-link">Services</a></li>
            <li><a href="contact.html" class="nav-link">Contact</a></li>
            <li><a href="#contact" class="btn-appointment">Book Appointment</a></li>
          </ul>
        </div>
      </nav>
    `;
    
    // Element References
    const navbar = this.shadowRoot.getElementById('navbar');
    const mobileToggle = this.shadowRoot.getElementById('mobile-toggle');
    const navLinks = this.shadowRoot.getElementById('nav-links');
    const servicesDropdown = this.shadowRoot.getElementById('services-dropdown');

    // Scroll Event Listener for Background Change
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Mobile Menu Toggle
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    const links = this.shadowRoot.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Mobile Dropdown Toggle
    if(window.innerWidth < 768) {
        servicesDropdown.addEventListener('click', (e) => {
            // Only toggle if clicking the link itself or parent li
            if(e.target.closest('.dropdown')) {
                servicesDropdown.classList.toggle('active');
                e.preventDefault(); // Prevent jump to section on mobile tap
            }
        });
    }
  }
}

customElements.define('custom-navbar', CustomNavbar);