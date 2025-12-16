// Google Material Design Navigation

const getCurrentPath = () => {
  const path = window.location.pathname;
  if (path.endsWith('/') || path.endsWith('/index.html')) return '/';
  return path.split('/').pop().replace('.html', '');
};

const renderNavbar = () => {
  const currentPath = getCurrentPath();
  const isHome = currentPath === '/';

  const navItems = [
    { name: 'Home', path: 'index.html', id: '/', icon: 'home' },
    { name: 'About', path: 'about.html', id: 'about', icon: 'info' },
    { name: 'Faculty', path: 'faculty.html', id: 'faculty', icon: 'people' },
    { name: 'Courses', path: 'courses.html', id: 'courses', icon: 'school' },
    { name: 'Gallery', path: 'gallery.html', id: 'gallery', icon: 'photo_library' },
    { name: 'Events', path: 'events.html', id: 'events', icon: 'event' },
    { name: 'Contact', path: 'contact.html', id: 'contact', icon: 'contact_mail' },
  ];

  // Elevation on scroll
  let scrolled = false;
  window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 10;
    if (isScrolled !== scrolled) {
      scrolled = isScrolled;
      const nav = document.querySelector('nav');
      if (nav) {
        if (scrolled) {
          nav.style.boxShadow = 'var(--elevation-2)';
        } else {
          nav.style.boxShadow = 'none';
        }
      }
    }
  });

  const navHtml = `
    <nav style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: var(--surface); transition: box-shadow var(--transition-base);">
      <div class="container-google" style="display: flex; justify-content: space-between; align-items: center; height: 64px;">
        <!-- Logo -->
        <a href="index.html" style="display: flex; align-items: center; gap: 12px; text-decoration: none; transition: opacity var(--transition-fast);" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVyL8DZ3sTTN-USkS1sXJ444-SczI54-OMcw&s" alt="MCT Logo" style="height: 40px; width: auto;" />
          <div style="display: flex; flex-direction: column;">
            <span style="font-family: 'Google Sans', sans-serif; font-size: 18px; font-weight: 500; color: var(--on-surface); line-height: 1.2;">
              MCT<span style="color: var(--google-blue);">DIU</span>
            </span>
            <span style="font-size: 10px; color: var(--on-surface-variant); font-weight: 400; letter-spacing: 0.5px;">Multimedia & Creative Technology</span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <div style="display: none; gap: 4px;" class="desktop-nav">
          ${navItems.map(item => {
            const isActive = (item.id === '/' && isHome) || (item.id !== '/' && currentPath === item.id);
            const activeStyles = isActive 
              ? `background: rgba(26, 115, 232, 0.1); color: var(--google-blue); font-weight: 500;` 
              : `color: var(--on-surface-variant);`;
            return `
              <a href="${item.path}" style="display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: var(--radius-full); text-decoration: none; font-size: 14px; font-weight: 400; transition: all var(--transition-fast); ${activeStyles}" 
                onmouseover="if(!this.classList.contains('active')) { this.style.background='var(--surface-variant)'; }" 
                onmouseout="if(!this.classList.contains('active')) { this.style.background='transparent'; }"
                class="${isActive ? 'active' : ''}">
                <span class="material-icons-outlined" style="font-size: 18px;">${item.icon}</span>
                ${item.name}
              </a>
            `;
          }).join('')}
        </div>

        <!-- Mobile Menu Button -->
        <button id="mobile-menu-btn" style="display: none; align-items: center; justify-content: center; width: 40px; height: 40px; border: none; background: transparent; border-radius: var(--radius-full); cursor: pointer; color: var(--on-surface); transition: background var(--transition-fast);" 
          class="mobile-menu-btn"
          onmouseover="this.style.background='var(--surface-variant)'" 
          onmouseout="this.style.background='transparent'">
          <span class="material-icons-outlined" id="menu-icon">menu</span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div id="mobile-menu" style="display: none; background: var(--surface); border-top: 1px solid var(--surface-container-high); padding: var(--spacing-2); box-shadow: var(--elevation-3);">
        ${navItems.map(item => {
          const isActive = (item.id === '/' && isHome) || (item.id !== '/' && currentPath === item.id);
          const activeStyles = isActive ? `background: rgba(26, 115, 232, 0.1); color: var(--google-blue); font-weight: 500;` : `color: var(--on-surface);`;
          return `
            <a href="${item.path}" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: var(--radius-medium); text-decoration: none; font-size: 14px; margin-bottom: 4px; transition: background var(--transition-fast); ${activeStyles}"
              onmouseover="if(!this.classList.contains('active')) { this.style.background='var(--surface-variant)'; }"
              onmouseout="if(!this.classList.contains('active')) { this.style.background='transparent'; }"
              class="${isActive ? 'active' : ''}">
              <span class="material-icons-outlined" style="font-size: 20px;">${item.icon}</span>
              ${item.name}
            </a>
          `;
        }).join('')}
      </div>
    </nav>
    
    <!-- Spacer for fixed nav -->
    <div style="height: 64px;"></div>
  `;

  document.getElementById('navbar-container').innerHTML = navHtml;

  // Show desktop nav on larger screens
  const mediaQuery = window.matchMedia('(min-width: 768px)');
  const updateNav = (e) => {
    const desktopNav = document.querySelector('.desktop-nav');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (desktopNav && mobileBtn) {
      if (e.matches) {
        desktopNav.style.display = 'flex';
        mobileBtn.style.display = 'none';
      } else {
        desktopNav.style.display = 'none';
        mobileBtn.style.display = 'flex';
      }
    }
  };
  mediaQuery.addEventListener('change', updateNav);
  updateNav(mediaQuery);

  // Mobile menu toggle
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  let isOpen = false;

  if (btn && menu) {
    btn.addEventListener('click', () => {
      isOpen = !isOpen;
      if (isOpen) {
        menu.style.display = 'block';
        menuIcon.textContent = 'close';
      } else {
        menu.style.display = 'none';
        menuIcon.textContent = 'menu';
      }
    });
  }
};

const renderFooter = () => {
  const footerHtml = `
    <footer style="background: var(--surface-container); border-top: 1px solid var(--surface-container-high); padding: var(--spacing-8) 0 var(--spacing-4) 0;">
      <div class="container-google">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-6); margin-bottom: var(--spacing-6);">
          
          <!-- Brand -->
          <div>
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: var(--spacing-3);">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVyL8DZ3sTTN-USkS1sXJ444-SczI54-OMcw&s" alt="MCT Logo" style="height: 36px; width: auto;" />
              <span style="font-family: 'Google Sans', sans-serif; font-size: 20px; font-weight: 500; color: var(--on-surface);">
                MCT<span style="color: var(--google-blue);">DIU</span>
              </span>
            </div>
            <p class="body-small" style="color: var(--on-surface-variant); margin-bottom: var(--spacing-3); line-height: 1.6;">
              Department of Multimedia & Creative Technology<br/>
              Daffodil International University<br/>
              Empowering creative technologists
            </p>
            <div style="display: flex; gap: 12px;">
              <a href="#" style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--surface-variant); color: var(--on-surface-variant); text-decoration: none; transition: all var(--transition-fast);" onmouseover="this.style.background='var(--google-blue)'; this.style.color='white';" onmouseout="this.style.background='var(--surface-variant)'; this.style.color='var(--on-surface-variant)';">
                <span class="material-icons-outlined" style="font-size: 18px;">link</span>
              </a>
              <a href="#" style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--surface-variant); color: var(--on-surface-variant); text-decoration: none; transition: all var(--transition-fast);" onmouseover="this.style.background='var(--google-blue)'; this.style.color='white';" onmouseout="this.style.background='var(--surface-variant)'; this.style.color='var(--on-surface-variant)';">
                <span class="material-icons-outlined" style="font-size: 18px;">link</span>
              </a>
              <a href="#" style="display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--surface-variant); color: var(--on-surface-variant); text-decoration: none; transition: all var(--transition-fast);" onmouseover="this.style.background='var(--google-blue)'; this.style.color='white';" onmouseout="this.style.background='var(--surface-variant)'; this.style.color='var(--on-surface-variant)';">
                <span class="material-icons-outlined" style="font-size: 18px;">link</span>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="title-small" style="color: var(--on-surface); margin-bottom: var(--spacing-2);">Quick Links</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 12px;"><a href="about.html" class="body-small" style="color: var(--on-surface-variant); text-decoration: none; transition: color var(--transition-fast);" onmouseover="this.style.color='var(--google-blue)'" onmouseout="this.style.color='var(--on-surface-variant)'">About MCT</a></li>
              <li style="margin-bottom: 12px;"><a href="faculty.html" class="body-small" style="color: var(--on-surface-variant); text-decoration: none; transition: color var(--transition-fast);" onmouseover="this.style.color='var(--google-blue)'" onmouseout="this.style.color='var(--on-surface-variant)'">Faculty</a></li>
              <li style="margin-bottom: 12px;"><a href="courses.html" class="body-small" style="color: var(--on-surface-variant); text-decoration: none; transition: color var(--transition-fast);" onmouseover="this.style.color='var(--google-blue)'" onmouseout="this.style.color='var(--on-surface-variant)'">Programs</a></li>
              <li style="margin-bottom: 12px;"><a href="gallery.html" class="body-small" style="color: var(--on-surface-variant); text-decoration: none; transition: color var(--transition-fast);" onmouseover="this.style.color='var(--google-blue)'" onmouseout="this.style.color='var(--on-surface-variant)'">Student Works</a></li>
              <li style="margin-bottom: 12px;"><a href="events.html" class="body-small" style="color: var(--on-surface-variant); text-decoration: none; transition: color var(--transition-fast);" onmouseover="this.style.color='var(--google-blue)'" onmouseout="this.style.color='var(--on-surface-variant)'">Events</a></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="title-small" style="color: var(--on-surface); margin-bottom: var(--spacing-2);">Contact Us</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="display: flex; gap: 12px; margin-bottom: 16px; align-items: flex-start;">
                <span class="material-icons-outlined text-google-blue" style="font-size: 20px;">location_on</span>
                <span class="body-small" style="color: var(--on-surface-variant);">Daffodil Smart City<br/>Ashulia, Savar, Dhaka 1340</span>
              </li>
              <li style="display: flex; gap: 12px; margin-bottom: 16px; align-items: center;">
                <span class="material-icons-outlined text-google-blue" style="font-size: 20px;">email</span>
                <span class="body-small font-mono" style="color: var(--on-surface-variant);">mct@daffodilvarsity.edu.bd</span>
              </li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div>
            <h3 class="title-small" style="color: var(--on-surface); margin-bottom: var(--spacing-2);">Stay Updated</h3>
            <p class="body-small" style="color: var(--on-surface-variant); margin-bottom: var(--spacing-2);">Subscribe for news and updates</p>
            <form style="display: flex; flex-direction: column; gap: 12px;">
              <input type="email" placeholder="your@email.com" class="body-small" style="padding: 12px 16px; border: 1px solid var(--surface-container-high); border-radius: var(--radius-small); background: var(--surface); color: var(--on-surface); outline: none; transition: border-color var(--transition-fast);" onfocus="this.style.borderColor='var(--google-blue)'" onblur="this.style.borderColor='var(--surface-container-high)'" />
              <button type="submit" class="btn-google btn-google-primary" style="width: 100%; justify-content: center;">Subscribe</button>
            </form>
          </div>

        </div>
        
        <div class="divider" style="margin: var(--spacing-4) 0;"></div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--spacing-2);">
          <p class="body-small" style="color: var(--on-surface-variant);">
            © ${new Date().getFullYear()} MCT Department, Daffodil International University. All rights reserved.
          </p>
          <div style="display: flex; gap: var(--spacing-3);">
            <a href="#" class="body-small" style="color: var(--on-surface-variant); text-decoration: none; transition: color var(--transition-fast);" onmouseover="this.style.color='var(--google-blue)'" onmouseout="this.style.color='var(--on-surface-variant)'">Privacy</a>
            <a href="#" class="body-small" style="color: var(--on-surface-variant); text-decoration: none; transition: color var(--transition-fast);" onmouseover="this.style.color='var(--google-blue)'" onmouseout="this.style.color='var(--on-surface-variant)'">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  `;
  document.getElementById('footer-container').innerHTML = footerHtml;
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
});
