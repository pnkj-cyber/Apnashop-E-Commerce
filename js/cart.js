// Helper to extract product info from DOM card elements (used for catalog click listeners)
function extractProductInfo(card) {
    if (!card) return null;
    
    let id = card.dataset.id;
    
    const imgEl = card.querySelector("img");
    const image = imgEl ? imgEl.src : "";
    
    const nameEl = card.querySelector("h3") || card.querySelector("h4");
    const name = nameEl ? nameEl.textContent.trim() : "Product";
    
    if (!id) {
        id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }
    
    const priceEl = card.querySelector(".price") || card.querySelector(".price-small") || card.querySelector(".product-detail-price");
    let price = 0;
    if (priceEl) {
        const clone = priceEl.cloneNode(true);
        const span = clone.querySelector("span");
        if (span) span.remove(); // Remove discount badge
        const priceText = clone.textContent.replace(/[^0-9]/g, ""); // Keep only digits
        price = parseInt(priceText) || 0;
    }
    
    return { id, name, price, image };
}

// Update Cart Badge
function updateCartBadge() {
    const cartCountEl = document.getElementById("cart-count");
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("cartCount", totalCount);
    if (cartCountEl) {
        cartCountEl.innerText = totalCount;
        cartCountEl.style.transform = "scale(1.2)";
        setTimeout(() => cartCountEl.style.transform = "scale(1)", 200);
    }
}

// Update Wishlist Badge
function updateWishlistBadge() {
    const wishlistCountEl = document.getElementById("wishlist-count");
    const wishlistCountDropdownEl = document.getElementById("wishlist-count-dropdown");
    const wishlistItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
    localStorage.setItem("wishlistCount", wishlistItems.length);
    [wishlistCountEl, wishlistCountDropdownEl].forEach(el => {
        if (el) {
            el.innerText = wishlistItems.length;
            el.style.transform = "scale(1.2)";
            setTimeout(() => el.style.transform = "scale(1)", 200);
        }
    });
}

// Sync Heart Buttons (visual status on cards)
function syncHeartButtonsOnLoad() {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
    const wishlistedIds = wishlistItems.map(item => item.id);
    
    document.querySelectorAll(".product-card, .shop-item, .live-card, .ad-card, .mini-card").forEach(card => {
        const product = extractProductInfo(card);
        if (product && wishlistedIds.includes(product.id)) {
            const btn = card.querySelector(".wishlist-btn");
            if (btn) {
                btn.classList.add("active");
                btn.innerHTML = "❤️ Wishlisted";
                btn.style.background = "#fee2e2";
                btn.style.color = "#ef4444";
            }
        }
    });
}

function syncHeartButton(productId, active) {
    document.querySelectorAll(".product-card, .shop-item, .live-card, .ad-card, .mini-card").forEach(card => {
        const product = extractProductInfo(card);
        if (product && product.id === productId) {
            const btn = card.querySelector(".wishlist-btn");
            if (btn) {
                if (active) {
                    btn.classList.add("active");
                    btn.innerHTML = "❤️ Wishlisted";
                    btn.style.background = "#fee2e2";
                    btn.style.color = "#ef4444";
                } else {
                    btn.classList.remove("active");
                    btn.innerHTML = "❤ Wishlist";
                    btn.style.background = "";
                    btn.style.color = "";
                }
            }
        }
    });
}

// Add Item to Cart
function addToCart(product, quantityToAdd = 1) {
    if (!product) return;
    let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += quantityToAdd;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantityToAdd
        });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartBadge();
    renderCartDrawer();
}

// Toggle Wishlist Item
function toggleItemInWishlist(product) {
    if (!product) return false;
    let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
    const index = wishlistItems.findIndex(item => item.id === product.id);
    let added = false;
    if (index === -1) {
        wishlistItems.push(product);
        added = true;
    } else {
        wishlistItems.splice(index, 1);
    }
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    updateWishlistBadge();
    renderWishlistDrawer();
    return added;
}

// Render Cart Drawer
function renderCartDrawer() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const cartDrawerBody = document.getElementById("cartDrawerBody");
    const cartSubtotal = document.getElementById("cartSubtotal");
    
    if (!cartDrawerBody) return;
    
    if (cartItems.length === 0) {
        cartDrawerBody.innerHTML = `
            <div class="drawer-empty-state">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        if (cartSubtotal) cartSubtotal.innerText = "₹0";
        return;
    }
    
    let html = '<div class="drawer-items-list">';
    let subtotal = 0;
    
    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        html += `
            <div class="drawer-item-row" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="drawer-item-img">
                <div class="drawer-item-details">
                    <h4>${item.name}</h4>
                    <div class="drawer-item-price">₹${item.price.toLocaleString()}</div>
                </div>
                <div class="drawer-item-actions">
                    <div class="drawer-qty-selector">
                        <button class="drawer-qty-btn qty-minus-btn" data-index="${index}">-</button>
                        <span class="drawer-qty-val">${item.quantity}</span>
                        <button class="drawer-qty-btn qty-plus-btn" data-index="${index}">+</button>
                    </div>
                    <button class="drawer-remove-btn cart-remove-btn" data-index="${index}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    cartDrawerBody.innerHTML = html;
    if (cartSubtotal) cartSubtotal.innerText = `₹${subtotal.toLocaleString()}`;
}

// Render Wishlist Drawer
function renderWishlistDrawer() {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
    const wishlistDrawerBody = document.getElementById("wishlistDrawerBody");
    
    if (!wishlistDrawerBody) return;
    
    if (wishlistItems.length === 0) {
        wishlistDrawerBody.innerHTML = `
            <div class="drawer-empty-state">
                <i class="fas fa-heart"></i>
                <p>Your wishlist is empty</p>
            </div>
        `;
        return;
    }
    
    let html = '<div class="drawer-items-list">';
    
    wishlistItems.forEach((item, index) => {
        html += `
            <div class="drawer-item-row" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="drawer-item-img">
                <div class="drawer-item-details">
                    <h4>${item.name}</h4>
                    <div class="drawer-item-price">₹${item.price.toLocaleString()}</div>
                </div>
                <div class="drawer-item-actions">
                    <button class="drawer-add-to-cart-btn wishlist-add-to-cart" data-index="${index}">
                        🛒 Add to Cart
                    </button>
                    <button class="drawer-remove-btn wishlist-remove-btn" data-index="${index}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    wishlistDrawerBody.innerHTML = html;
}

// Helper to create click emoji feedback
function createFloatingFeedback(e, text = "+1") {
    const feedback = document.createElement("span");
    feedback.className = "floating-feedback";
    feedback.innerText = text;
    feedback.style.left = `${e.clientX + window.scrollX}px`;
    feedback.style.top = `${e.clientY + window.scrollY - 15}px`;
    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.remove();
    }, 800);
}

// Expose functions on the window object for global availability
window.extractProductInfo = extractProductInfo;
window.updateCartBadge = updateCartBadge;
window.updateWishlistBadge = updateWishlistBadge;
window.syncHeartButtonsOnLoad = syncHeartButtonsOnLoad;
window.syncHeartButton = syncHeartButton;
window.addToCart = addToCart;
window.toggleItemInWishlist = toggleItemInWishlist;
window.renderCartDrawer = renderCartDrawer;
window.renderWishlistDrawer = renderWishlistDrawer;
window.createFloatingFeedback = createFloatingFeedback;

// Setup Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
    updateWishlistBadge();
    syncHeartButtonsOnLoad();

    // Cross-tab sync
    window.addEventListener("storage", (e) => {
        if (e.key === "cartItems") {
            updateCartBadge();
            renderCartDrawer();
        } else if (e.key === "wishlistItems") {
            updateWishlistBadge();
            renderWishlistDrawer();
            syncHeartButtonsOnLoad();
        }
    });

    // Cart Add Clicks
    document.body.addEventListener("click", (e) => {
        if (e.target.matches(".cart-btn") || e.target.matches(".shop-item button") || e.target.matches(".buy-btn") || e.target.matches(".btn") || e.target.matches(".detail-add-btn")) {
            if (e.target.classList.contains("wishlist-btn") || e.target.closest(".drawer-close-btn") || e.target.closest(".side-drawer") || e.target.classList.contains("detail-buy-btn")) return;
            
            const card = e.target.closest(".product-card") || e.target.closest(".shop-item") || e.target.closest(".live-card") || e.target.closest(".ad-card") || e.target.closest(".mini-card") || e.target.closest(".product-detail-container");
            if (card) {
                const product = extractProductInfo(card);
                
                // Get detail quantity if available
                let qty = 1;
                const qtyValEl = document.getElementById("detailQtyVal");
                if (qtyValEl) qty = parseInt(qtyValEl.innerText) || 1;

                addToCart(product, qty);
                createFloatingFeedback(e, "+1 🛒");
            }
        }
    });

    // Wishlist Button Clicks
    document.body.addEventListener("click", (e) => {
        if (e.target.matches(".wishlist-btn")) {
            const btn = e.target;
            const card = e.target.closest(".product-card") || e.target.closest(".shop-item") || e.target.closest(".live-card") || e.target.closest(".ad-card") || e.target.closest(".mini-card") || e.target.closest(".product-detail-container");
            if (card) {
                const product = extractProductInfo(card);
                const isAdded = toggleItemInWishlist(product);
                
                if (isAdded) {
                    btn.classList.add("active");
                    btn.innerHTML = "❤️ Wishlisted";
                    btn.style.background = "#fee2e2";
                    btn.style.color = "#ef4444";
                    createFloatingFeedback(e, "❤️");
                } else {
                    btn.classList.remove("active");
                    btn.innerHTML = "❤ Wishlist";
                    btn.style.background = "";
                    btn.style.color = "";
                    createFloatingFeedback(e, "💔");
                }
            }
        }
    });

    // Drawer overlays
    const cartDrawerOverlay = document.getElementById("cartDrawerOverlay");
    const wishlistDrawerOverlay = document.getElementById("wishlistDrawerOverlay");
    
    const cartLink = document.querySelector(".cart-link");
    const wishlistLink = document.querySelector(".wishlist-link");
    
    const closeCartDrawerBtn = document.getElementById("closeCartDrawerBtn");
    const closeWishlistDrawerBtn = document.getElementById("closeWishlistDrawerBtn");
    const closeWishlistFooterBtn = document.getElementById("closeWishlistFooterBtn");
    const clearCartBtn = document.getElementById("clearCartBtn");
    const checkoutBtn = document.getElementById("checkoutBtn");
    
    if (cartLink && cartDrawerOverlay) {
        cartLink.addEventListener("click", (e) => {
            e.preventDefault();
            cartDrawerOverlay.classList.add("active");
            renderCartDrawer();
        });
    }
    
    if (closeCartDrawerBtn) {
        closeCartDrawerBtn.addEventListener("click", () => {
            cartDrawerOverlay.classList.remove("active");
        });
    }
    
    if (cartDrawerOverlay) {
        cartDrawerOverlay.addEventListener("click", (e) => {
            if (e.target === cartDrawerOverlay) {
                cartDrawerOverlay.classList.remove("active");
            }
        });
    }
    
    if (wishlistLink && wishlistDrawerOverlay) {
        wishlistLink.addEventListener("click", (e) => {
            e.preventDefault();
            wishlistDrawerOverlay.classList.add("active");
            renderWishlistDrawer();
        });
    }
    
    if (closeWishlistDrawerBtn) {
        closeWishlistDrawerBtn.addEventListener("click", () => {
            wishlistDrawerOverlay.classList.remove("active");
        });
    }
    
    if (closeWishlistFooterBtn) {
        closeWishlistFooterBtn.addEventListener("click", () => {
            wishlistDrawerOverlay.classList.remove("active");
        });
    }
    
    if (wishlistDrawerOverlay) {
        wishlistDrawerOverlay.addEventListener("click", (e) => {
            if (e.target === wishlistDrawerOverlay) {
                wishlistDrawerOverlay.classList.remove("active");
            }
        });
    }
    
    if (clearCartBtn) {
        clearCartBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to clear your cart?")) {
                localStorage.setItem("cartItems", "[]");
                updateCartBadge();
                renderCartDrawer();
            }
        });
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
            if (cartItems.length === 0) {
                alert("Your cart is empty!");
                return;
            }
            // Close drawer and go to checkout.html
            cartDrawerOverlay.classList.remove("active");
            window.location.href = "checkout.html";
        });
    }

    // Drawer item click handling
    const cartDrawerBody = document.getElementById("cartDrawerBody");
    if (cartDrawerBody) {
        cartDrawerBody.addEventListener("click", (e) => {
            let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
            
            // Qty Minus
            if (e.target.matches(".qty-minus-btn")) {
                const index = parseInt(e.target.dataset.index);
                if (cartItems[index]) {
                    cartItems[index].quantity--;
                    if (cartItems[index].quantity <= 0) {
                        cartItems.splice(index, 1);
                    }
                    localStorage.setItem("cartItems", JSON.stringify(cartItems));
                    updateCartBadge();
                    renderCartDrawer();
                }
            } 
            
            // Qty Plus
            if (e.target.matches(".qty-plus-btn")) {
                const index = parseInt(e.target.dataset.index);
                if (cartItems[index]) {
                    cartItems[index].quantity++;
                    localStorage.setItem("cartItems", JSON.stringify(cartItems));
                    updateCartBadge();
                    renderCartDrawer();
                }
            }
            
            // Remove
            if (e.target.closest(".cart-remove-btn")) {
                const btn = e.target.closest(".cart-remove-btn");
                const index = parseInt(btn.dataset.index);
                cartItems.splice(index, 1);
                localStorage.setItem("cartItems", JSON.stringify(cartItems));
                updateCartBadge();
                renderCartDrawer();
            }
        });
    }

    const wishlistDrawerBody = document.getElementById("wishlistDrawerBody");
    if (wishlistDrawerBody) {
        wishlistDrawerBody.addEventListener("click", (e) => {
            let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
            
            // Remove
            if (e.target.closest(".wishlist-remove-btn")) {
                const btn = e.target.closest(".wishlist-remove-btn");
                const index = parseInt(btn.dataset.index);
                const removedItem = wishlistItems[index];
                wishlistItems.splice(index, 1);
                localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
                updateWishlistBadge();
                renderWishlistDrawer();
                
                if (removedItem) {
                    syncHeartButton(removedItem.id, false);
                }
            }
            
            // Add to Cart from Wishlist
            if (e.target.matches(".wishlist-add-to-cart")) {
                const index = parseInt(e.target.dataset.index);
                const item = wishlistItems[index];
                if (item) {
                    addToCart(item);
                    wishlistItems.splice(index, 1);
                    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
                    updateWishlistBadge();
                    renderWishlistDrawer();
                    syncHeartButton(item.id, false);
                }
            }
        });
    }
});
