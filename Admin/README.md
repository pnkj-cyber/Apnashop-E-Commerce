# ApnaShop - ApnaShop Admin Portal

ApnaShop is a premium, high-fidelity administrator management suite designed for ApnaShop. It features a modern, clean light-mode interface with elegant curved card styling, smooth transitions, responsive grids, and customized interactive graphics.

## Project Structure

The project has been organized with a modular file layout to ensure code cleanliness and ease of deployment:

```
admin/
├── index.html                     # Sleek admin login screen
├── dashboard.html                 # Main dashboard view
│
├── assets/                        # Shared resources
│   ├── css/
│   │   ├── style.css              # Global styling variables & typography
│   │   ├── dashboard.css          # Metric cards & carousel styling
│   │   ├── tables.css             # Data table grids & select checkboxes
│   │   ├── forms.css              # Form inputs, toggles & drag-drop uploads
│   │   └── responsive.css         # Breakpoint adjustments & mobile navigation
│   ├── js/
│   │   ├── main.js                # Shell rendering and event loops
│   │   ├── dashboard.js           # Counts, Tooltips & Congratulations Carousel
│   │   ├── products.js            # Product form additions & rows manager
│   │   ├── orders.js              # Order filter groupings
│   │   ├── customers.js           # Customers lists
│   │   └── charts.js              # Reusable reporting charts builder
│   ├── images/
│   ├── icons/
│   └── uploads/
│
├── products/                      # Product management pages
├── categories/                    # Category management pages
├── brands/                        # Brand management pages
├── inventory/                     # Inventory management pages
├── orders/                        # Order management pages
├── customers/                     # Customer databases
├── payments/                      # Transaction logs & refund controls
├── shipping/                      # Courier tracking & zone controls
├── coupons/                       # Sales coupons management
├── offers/                        # Flash sales & combo deals
├── banners/                       # Website promo banners
├── reviews/                       # Product reviews & ratings
├── reports/                       # Sales & tax charts reports
├── marketing/                     # Newsletter & push notifications
├── support/                       # Support tickets & FAQs
├── settings/                      # Admin profiles & website configs
└── roles/                         # Admin roles & permission levels
```

## Architectural Design Highlights

1. **Dynamic Shell Injections (`assets/js/main.js`)**
   To prevent duplicating identical sidebar menus and header navigations across 70+ static HTML pages, the application utilizes a dynamic layout manager. On DOM load, `main.js` automatically compiles the HTML template representing the collapsible sidebar and top welcome bar, resolves relative paths dynamically depending on the current directory level, and inserts it. It also resolves menu highlighting and active state selections.

2. **Premium Interface Elements**
   - ** outfit Font Family**: Imported from Google Fonts to give the text sizing a clean tech appeal.
   - **Remix Icon Vector Kit**: Sharp vector icons loaded dynamically via CDN.
   - **Sales Report Chart**: Generated using Chart.js with custom spring curve pathing, gradient background accents, and an interactive popover tooltip bubble which renders exact values (Transactions & Products sold) on hover.
   - **Congratulations Carousel**: A beautiful, fluid slider exhibiting top performing products inside the congratulations promo card.

3. **Responsive Mobile Drawer**
   When viewed on tablet or mobile viewports, the sidebar automatically transitions off-screen. A hamburger trigger is injected into the top welcoming bar, allowing administrators to slide open a navigation panel overlay.
