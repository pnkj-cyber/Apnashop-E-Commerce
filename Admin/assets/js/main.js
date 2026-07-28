/* Core Layout & Interaction Manager */

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the login page
    const isLoginPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/Admin/' || window.location.pathname === '/Admin';
    if (isLoginPage) {
        initLoginScreen();
        return;
    }
    
    // Inject structural sidebar and header
    injectAppLayout();
    
    // Register common UI event handlers
    initCommonEventHandlers();
});

// Helper to calculate depth offset
const getRootOffset = () => {
    const path = window.location.pathname;
    const folders = [
        '/products/', '/categories/', '/brands/', '/inventory/',
        '/orders/', '/customers/', '/payments/', '/shipping/',
        '/coupons/', '/offers/', '/banners/', '/reviews/',
        '/reports/', '/marketing/', '/support/', '/settings/', '/roles/'
    ];
    for (const f of folders) {
        if (path.includes(f)) {
            return '../';
        }
    }
    return './';
};

// Inject common Sidebar and Header
const injectAppLayout = () => {
    const root = getRootOffset();
    const currentPath = window.location.pathname;
    
    // Sidebar HTML Definition
    const sidebarHtml = `
    <aside class="sidebar" id="sidebar-panel">
        <div class="sidebar-header">
            <a href="${root}dashboard.html" class="brand-wrapper">
                <div class="brand-logo-icon">S</div>
                <span class="brand-name">ApnaShop</span>
            </a>
            <button class="sidebar-toggle-btn" id="sidebar-toggle-trigger" aria-label="Toggle Sidebar">
                <i class="ri-arrow-left-s-line"></i>
            </button>
        </div>
        <div class="sidebar-nav-container">
            <!-- Main Menu Section -->
            <div class="nav-section">
                <span class="nav-section-title">Main Menu</span>
                
                <a href="${root}dashboard.html" class="nav-item-link ${currentPath.endsWith('dashboard.html') ? 'active' : ''}">
                    <span class="nav-item-left">
                        <i class="ri-dashboard-line nav-item-icon"></i>
                        <span class="nav-item-label">Overview</span>
                    </span>
                </a>
                
                <!-- Orders Collapsible -->
                <div class="nav-item-group ${currentPath.includes('/orders/') ? 'open' : ''}">
                    <div class="nav-item-link">
                        <span class="nav-item-left">
                            <i class="ri-shopping-bag-3-line nav-item-icon"></i>
                            <span class="nav-item-label">Orders</span>
                        </span>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <span class="badge-red-indicator">10</span>
                            <i class="ri-arrow-right-s-line nav-item-arrow"></i>
                        </div>
                    </div>
                    <div class="sub-nav-container">
                        <a href="${root}orders/orders.html" class="sub-nav-item-link ${currentPath.endsWith('orders/orders.html') ? 'active' : ''}">All Orders</a>
                        <a href="${root}orders/pending-orders.html" class="sub-nav-item-link ${currentPath.endsWith('pending-orders.html') ? 'active' : ''}">Pending</a>
                        <a href="${root}orders/processing-orders.html" class="sub-nav-item-link ${currentPath.endsWith('processing-orders.html') ? 'active' : ''}">Processing</a>
                        <a href="${root}orders/shipped-orders.html" class="sub-nav-item-link ${currentPath.endsWith('shipped-orders.html') ? 'active' : ''}">Shipped</a>
                        <a href="${root}orders/delivered-orders.html" class="sub-nav-item-link ${currentPath.endsWith('delivered-orders.html') ? 'active' : ''}">Delivered</a>
                        <a href="${root}orders/cancelled-orders.html" class="sub-nav-item-link ${currentPath.endsWith('cancelled-orders.html') ? 'active' : ''}">Cancelled</a>
                        <a href="${root}orders/return-orders.html" class="sub-nav-item-link ${currentPath.endsWith('return-orders.html') ? 'active' : ''}">Returns</a>
                    </div>
                </div>
                
                <!-- Products Collapsible -->
                <div class="nav-item-group ${currentPath.includes('/products/') || currentPath.includes('/categories/') || currentPath.includes('/brands/') || currentPath.includes('/inventory/') ? 'open' : ''}">
                    <div class="nav-item-link">
                        <span class="nav-item-left">
                            <i class="ri-archive-line nav-item-icon"></i>
                            <span class="nav-item-label">Products</span>
                        </span>
                        <i class="ri-arrow-right-s-line nav-item-arrow"></i>
                    </div>
                    <div class="sub-nav-container">
                        <a href="${root}products/products.html" class="sub-nav-item-link ${currentPath.endsWith('products/products.html') ? 'active' : ''}">All Products</a>
                        <a href="${root}products/add-product.html" class="sub-nav-item-link ${currentPath.endsWith('add-product.html') ? 'active' : ''}">Add Product</a>
                        <a href="${root}categories/categories.html" class="sub-nav-item-link ${currentPath.includes('/categories/') ? 'active' : ''}">Categories</a>
                        <a href="${root}brands/brands.html" class="sub-nav-item-link ${currentPath.includes('/brands/') ? 'active' : ''}">Brands</a>
                        <a href="${root}inventory/inventory.html" class="sub-nav-item-link ${currentPath.includes('/inventory/') ? 'active' : ''}">Inventory</a>
                    </div>
                </div>
                
                <!-- Customers Collapsible -->
                <div class="nav-item-group ${currentPath.includes('/customers/') ? 'open' : ''}">
                    <div class="nav-item-link">
                        <span class="nav-item-left">
                            <i class="ri-user-line nav-item-icon"></i>
                            <span class="nav-item-label">Customer</span>
                        </span>
                        <i class="ri-arrow-right-s-line nav-item-arrow"></i>
                    </div>
                    <div class="sub-nav-container">
                        <a href="${root}customers/customers.html" class="sub-nav-item-link ${currentPath.endsWith('customers/customers.html') ? 'active' : ''}">All Customers</a>
                        <a href="${root}customers/blocked-users.html" class="sub-nav-item-link ${currentPath.endsWith('blocked-users.html') ? 'active' : ''}">Blocked Users</a>
                    </div>
                </div>
                
                <!-- Reports/Analytics Collapsible -->
                <div class="nav-item-group ${currentPath.includes('/reports/') ? 'open' : ''}">
                    <div class="nav-item-link">
                        <span class="nav-item-left">
                            <i class="ri-bar-chart-2-line nav-item-icon"></i>
                            <span class="nav-item-label">Analytics</span>
                        </span>
                        <i class="ri-arrow-right-s-line nav-item-arrow"></i>
                    </div>
                    <div class="sub-nav-container">
                        <a href="${root}reports/sales-report.html" class="sub-nav-item-link ${currentPath.endsWith('sales-report.html') ? 'active' : ''}">Sales Report</a>
                        <a href="${root}reports/order-report.html" class="sub-nav-item-link ${currentPath.endsWith('order-report.html') ? 'active' : ''}">Order Report</a>
                        <a href="${root}reports/customer-report.html" class="sub-nav-item-link ${currentPath.endsWith('customer-report.html') ? 'active' : ''}">Customer Report</a>
                        <a href="${root}reports/inventory-report.html" class="sub-nav-item-link ${currentPath.endsWith('inventory-report.html') ? 'active' : ''}">Inventory Report</a>
                        <a href="${root}reports/revenue-report.html" class="sub-nav-item-link ${currentPath.endsWith('revenue-report.html') ? 'active' : ''}">Revenue Report</a>
                        <a href="${root}reports/tax-report.html" class="sub-nav-item-link ${currentPath.endsWith('tax-report.html') ? 'active' : ''}">Tax Report</a>
                    </div>
                </div>

                <!-- Marketing Collapsible -->
                <div class="nav-item-group ${currentPath.includes('/marketing/') || currentPath.includes('/coupons/') || currentPath.includes('/offers/') || currentPath.includes('/banners/') ? 'open' : ''}">
                    <div class="nav-item-link">
                        <span class="nav-item-left">
                            <i class="ri-advertisement-line nav-item-icon"></i>
                            <span class="nav-item-label">Marketing</span>
                        </span>
                        <i class="ri-arrow-right-s-line nav-item-arrow"></i>
                    </div>
                    <div class="sub-nav-container">
                        <a href="${root}marketing/featured-products.html" class="sub-nav-item-link ${currentPath.endsWith('featured-products.html') ? 'active' : ''}">Featured Products</a>
                        <a href="${root}coupons/coupons.html" class="sub-nav-item-link ${currentPath.includes('/coupons/') ? 'active' : ''}">Coupons</a>
                        <a href="${root}offers/offers.html" class="sub-nav-item-link ${currentPath.includes('/offers/') ? 'active' : ''}">Offers</a>
                        <a href="${root}banners/banners.html" class="sub-nav-item-link ${currentPath.includes('/banners/') ? 'active' : ''}">Banners</a>
                        <a href="${root}marketing/newsletter.html" class="sub-nav-item-link ${currentPath.endsWith('newsletter.html') ? 'active' : ''}">Newsletter</a>
                        <a href="${root}marketing/email-campaign.html" class="sub-nav-item-link ${currentPath.endsWith('email-campaign.html') ? 'active' : ''}">Email Campaigns</a>
                        <a href="${root}marketing/notifications.html" class="sub-nav-item-link ${currentPath.endsWith('notifications.html') ? 'active' : ''}">Push Notifications</a>
                    </div>
                </div>
                
                <a href="${root}coupons/coupons.html" class="nav-item-link ${currentPath.includes('/coupons/') ? 'active' : ''}">
                    <span class="nav-item-left">
                        <i class="ri-price-tag-3-line nav-item-icon"></i>
                        <span class="nav-item-label">Discount</span>
                    </span>
                </a>
            </div>

            <!-- Sales Channel Section -->
            <div class="nav-section">
                <span class="nav-section-title">Sales Channel</span>
                <a href="#" class="nav-item-link">
                    <span class="nav-item-left">
                        <i class="ri-store-2-line nav-item-icon"></i>
                        <span class="nav-item-label">Online store</span>
                    </span>
                </a>
                <a href="#" class="nav-item-link">
                    <span class="nav-item-left">
                        <i class="ri-computer-line nav-item-icon"></i>
                        <span class="nav-item-label">Point of sale</span>
                    </span>
                </a>
            </div>

            <!-- Apps Section -->
            <div class="nav-section">
                <span class="nav-section-title">Apps</span>
                <a href="#" class="nav-item-link">
                    <span class="nav-item-left">
                        <span class="brand-logo-icon" style="width: 18px; height: 18px; font-size: 0.6rem; background: #ff5722; color: white;">S</span>
                        <span class="nav-item-label">Shopee</span>
                    </span>
                </a>
                <a href="#" class="nav-item-link">
                    <span class="nav-item-left">
                        <span class="brand-logo-icon" style="width: 18px; height: 18px; font-size: 0.6rem; background: black; color: white;">T</span>
                        <span class="nav-item-label">Tiktok</span>
                    </span>
                </a>
                <a href="#" class="nav-item-link">
                    <span class="nav-item-left">
                        <span class="brand-logo-icon" style="width: 18px; height: 18px; font-size: 0.6rem; background: #4caf50; color: white;">T</span>
                        <span class="nav-item-label">Tokopedia</span>
                    </span>
                </a>
                <a href="${root}settings/website-settings.html" class="nav-item-link" style="color: var(--accent-blue);">
                    <span class="nav-item-left">
                        <i class="ri-add-line nav-item-icon"></i>
                        <span class="nav-item-label">Add apps</span>
                    </span>
                </a>
            </div>
        </div>
    </aside>
    `;
    
    // Header HTML Definition
    const headerHtml = `
    <header class="top-header">
        <div style="display: flex; align-items: center; gap: 14px;">
            <button class="mobile-menu-burger-trigger" id="mobile-menu-toggle" aria-label="Open Menu">
                <i class="ri-menu-line"></i>
            </button>
            <div class="header-welcome-message">
                <h1 id="header-greeting-message">Good Morning, Jonathan!</h1>
                <p>Here's what's happening with your store today</p>
            </div>
        </div>
        
        <div class="header-right-actions">
            <!-- Date Picker Button -->
            <button class="header-datepicker" id="datepicker-trigger-btn">
                <i class="ri-calendar-2-line"></i>
                <span id="header-date-label">14 Aug 2023</span>
            </button>
            
            <!-- Notifications Notification Dropdown Trigger -->
            <button class="action-icon-badge-btn" id="notifications-toggle-btn" aria-label="Notifications">
                <i class="ri-notification-3-line"></i>
                <span class="notification-count-badge">7</span>
            </button>
            
            <!-- Profile Selector Dropdown Trigger -->
            <div class="profile-dropdown-container">
                <button class="profile-trigger-btn" id="profile-dropdown-trigger" aria-label="User profile">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" class="user-avatar-image" alt="Admin user avatar">
                    <i class="ri-arrow-down-s-line" style="color: var(--text-muted); font-size: 0.85rem;"></i>
                </button>
                <div class="profile-dropdown-menu" id="profile-dropdown-menu-list">
                    <div class="dropdown-header-user">
                        <h4>Jonathan Doe</h4>
                        <p>Store Administrator</p>
                    </div>
                    <a href="${root}settings/profile.html" class="dropdown-menu-item">
                        <i class="ri-user-settings-line"></i> Profile Settings
                    </a>
                    <a href="${root}settings/website-settings.html" class="dropdown-menu-item">
                        <i class="ri-settings-4-line"></i> Store Config
                    </a>
                    <a href="${root}settings/change-password.html" class="dropdown-menu-item">
                        <i class="ri-lock-password-line"></i> Change Password
                    </a>
                    <a href="${root}index.html" class="dropdown-menu-item divider">
                        <i class="ri-logout-box-r-line" style="color: var(--danger);"></i> Log Out
                    </a>
                </div>
            </div>
        </div>
    </header>
    `;
    
    // Prepend sidebar and header to the container shell
    const appShell = document.getElementById('app-container');
    if (appShell) {
        appShell.insertAdjacentHTML('afterbegin', sidebarHtml + headerHtml);
        
        // Dynamically add a background overlay for mobile drawer toggle
        const overlay = document.createElement('div');
        overlay.id = 'sidebar-overlay-mobile';
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(4px);
            z-index: 95;
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(overlay);
    }
};

// Setup Event Handlers for Sidebar, Header buttons, Checkboxes, etc.
const initCommonEventHandlers = () => {
    const sidebar = document.getElementById('sidebar-panel');
    const sidebarToggle = document.getElementById('sidebar-toggle-trigger');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const overlay = document.getElementById('sidebar-overlay-mobile');
    
    // 1. Sidebar desktop toggle collapse/expand
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            
            // Save state in local storage
            const isCollapsed = sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', isCollapsed ? 'true' : 'false');
        });
        
        // Restore collapse state
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState === 'true') {
            sidebar.classList.add('collapsed');
        }
    }
    
    // 2. Sidebar mobile toggle drawer
    const openMobileMenu = () => {
        if (sidebar && overlay) {
            sidebar.classList.add('mobile-open');
            overlay.style.display = 'block';
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);
        }
    };
    
    const closeMobileMenu = () => {
        if (sidebar && overlay) {
            sidebar.classList.remove('mobile-open');
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }
    };
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', openMobileMenu);
    }
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }
    
    // 3. Sub-navigation menu click accordion toggler
    const accordionLinks = document.querySelectorAll('.nav-item-group > .nav-item-link');
    accordionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent link redirect if clicked on parent row containing arrow/sub-items
            e.preventDefault();
            const parent = link.parentElement;
            
            // Toggle open class
            parent.classList.toggle('open');
        });
    });
    
    // 4. Header Profile Dropdown list
    const profileTrigger = document.getElementById('profile-dropdown-trigger');
    const profileMenu = document.getElementById('profile-dropdown-menu-list');
    
    if (profileTrigger && profileMenu) {
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            profileMenu.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            if (profileMenu.classList.contains('show')) {
                profileMenu.classList.remove('show');
            }
        });
    }
    
    // 5. Header Notifications popup drawer toggle (mock)
    const notificationsBtn = document.getElementById('notifications-toggle-btn');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', () => {
            alert('Notifications system active! You have 7 unread updates from ApnaShop.');
        });
    }
    
    // 6. Header Date Picker trigger (mock)
    const dateBtn = document.getElementById('datepicker-trigger-btn');
    if (dateBtn) {
        dateBtn.addEventListener('click', () => {
            const today = new Date().toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric'
            });
            alert(`Selected date: ${today}`);
        });
    }
    
    // 7. Interactive check-all table actions
    const checkAll = document.getElementById('select-all-rows');
    if (checkAll) {
        checkAll.addEventListener('change', () => {
            const rowCheckboxes = document.querySelectorAll('.table-row-checkbox');
            rowCheckboxes.forEach(chk => {
                chk.checked = checkAll.checked;
                const tr = chk.closest('tr');
                if (tr) {
                    if (chk.checked) {
                        tr.classList.add('row-selected');
                    } else {
                        tr.classList.remove('row-selected');
                    }
                }
            });
        });
    }
    
    // 8. Individual rows checklist highlights
    const rowCheckboxes = document.querySelectorAll('.table-row-checkbox');
    rowCheckboxes.forEach(chk => {
        chk.addEventListener('change', () => {
            const tr = chk.closest('tr');
            if (tr) {
                if (chk.checked) {
                    tr.classList.add('row-selected');
                } else {
                    tr.classList.remove('row-selected');
                }
            }
            
            // Sync check all state
            if (checkAll && !chk.checked) {
                checkAll.checked = false;
            }
        });
    });
};

// Login page scripts
const initLoginScreen = () => {
    // Inject particle style mock logic if login elements exist
    const loginForm = document.getElementById('admin-login-form-element');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('.btn-login');
            if (btn) {
                btn.innerHTML = '<i class="ri-loader-4-line" style="animation: spin 1s infinite linear;"></i> Logging in...';
                btn.disabled = true;
            }
            // Navigate after small delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }
};
