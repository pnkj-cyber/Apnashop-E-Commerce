document.addEventListener("DOMContentLoaded", () => {
    // 1. Discount Coupon Dictionary
    const COUPONS = {
        "APNA10": { type: "percent", value: 10, maxDiscount: 100 },
        "DIWALI50": { type: "percent", value: 50, maxDiscount: 500 }
    };

    let appliedDiscount = 0;
    let appliedCouponCode = "";

    // Export variables and checkout utilities
    window.appliedDiscount = appliedDiscount;
    window.appliedCouponCode = appliedCouponCode;

    // Apply Coupon Code
    function applyCoupon(code, subtotal) {
        const uppercaseCode = code.toUpperCase().trim();
        if (COUPONS[uppercaseCode]) {
            const coupon = COUPONS[uppercaseCode];
            let discount = 0;
            if (coupon.type === "percent") {
                discount = (subtotal * coupon.value) / 100;
                if (coupon.maxDiscount) {
                    discount = Math.min(discount, coupon.maxDiscount);
                }
            }
            appliedDiscount = Math.round(discount);
            appliedCouponCode = uppercaseCode;
            window.appliedDiscount = appliedDiscount;
            window.appliedCouponCode = appliedCouponCode;
            return { success: true, discount: appliedDiscount, message: `Coupon ${uppercaseCode} applied successfully!` };
        }
        return { success: false, discount: 0, message: "Invalid Coupon Code!" };
    }
    
    window.applyCoupon = applyCoupon;

    // Place Order calling backend API
    function placeOrder(shippingInfo, cartItems, subtotal, discount, total) {
        if (!cartItems || cartItems.length === 0) return Promise.reject(new Error("Cart is empty"));
        
        const token = localStorage.getItem("token");
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return fetch('http://localhost:8000/api/orders/place/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                cartItems: cartItems,
                shippingInfo: shippingInfo,
                subtotal: subtotal,
                discount: discount,
                total: total
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Clear cart
                localStorage.setItem("cartItems", "[]");
                if (window.updateCartBadge) window.updateCartBadge();
                return data.orderId;
            } else {
                throw new Error(data.error || "Order failed on backend");
            }
        });
    }

    window.placeOrder = placeOrder;

    // Cart Page Coupon Application UI
    const promoBtn = document.getElementById("applyCouponBtn");
    const promoInput = document.getElementById("couponInput");
    if (promoBtn && promoInput) {
        promoBtn.addEventListener("click", () => {
            const code = promoInput.value;
            const subtotalText = document.getElementById("summarySubtotal").innerText.replace(/[^0-9]/g, "");
            const subtotal = parseInt(subtotalText) || 0;
            
            if (subtotal === 0) {
                alert("Cart subtotal is 0!");
                return;
            }

            const result = applyCoupon(code, subtotal);
            alert(result.message);

            if (result.success) {
                document.getElementById("summaryDiscountRow").style.display = "flex";
                document.getElementById("summaryDiscount").innerText = `-₹${result.discount.toLocaleString()}`;
                
                const total = subtotal - result.discount;
                document.getElementById("summaryTotal").innerText = `₹${total.toLocaleString()}`;
            }
        });
    }

    // Checkout Page Form UI Submissions
    const checkoutForm = document.getElementById("checkoutPageForm");
    if (checkoutForm) {
        // Pre-fill profile info if logged in
        const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedUser) {
            const nameField = document.getElementById("checkoutName");
            const emailField = document.getElementById("checkoutEmail");
            const phoneField = document.getElementById("checkoutPhone");
            const addressField = document.getElementById("checkoutAddress");

            if (nameField) nameField.value = loggedUser.name;
            if (emailField) emailField.value = loggedUser.email;
            if (phoneField) phoneField.value = loggedUser.phone;
            if (addressField) addressField.value = loggedUser.address || "";
        }

        // Geolocation detection logic for Checkout Page
        const detectCheckoutLocationBtn = document.getElementById("detectCheckoutLocationBtn");
        const checkoutAddressField = document.getElementById("checkoutAddress");
        if (detectCheckoutLocationBtn && checkoutAddressField) {
            detectCheckoutLocationBtn.addEventListener("click", () => {
                if (!navigator.geolocation) {
                    alert("Geolocation is not supported by your browser.");
                    return;
                }

                detectCheckoutLocationBtn.disabled = true;
                const originalHtml = detectCheckoutLocationBtn.innerHTML;
                detectCheckoutLocationBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Detecting...`;

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        detectCheckoutLocationBtn.disabled = false;
                        detectCheckoutLocationBtn.innerHTML = originalHtml;
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;

                        if (window.reverseGeocodeGlobal) {
                            window.reverseGeocodeGlobal(lat, lon, true);
                        } else {
                            checkoutAddressField.value = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
                        }
                    },
                    (err) => {
                        console.error("Geolocation error:", err);
                        detectCheckoutLocationBtn.disabled = false;
                        detectCheckoutLocationBtn.innerHTML = originalHtml;
                        alert("Location detection failed. Please type address manually or enable location permission in browser.");
                    },
                    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
                );
            });
        }

        // Handle Payment Card Selection
        const paymentCards = document.querySelectorAll(".payment-method-card");
        let selectedPayment = "Cash on Delivery";
        
        paymentCards.forEach(card => {
            card.addEventListener("click", () => {
                paymentCards.forEach(c => c.classList.remove("selected"));
                card.classList.add("selected");
                selectedPayment = card.dataset.method;
            });
        });

        checkoutForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
            if (cartItems.length === 0) {
                alert("Your cart is empty!");
                window.location.href = "products.html";
                return;
            }

            const name = document.getElementById("checkoutName").value;
            const email = document.getElementById("checkoutEmail").value;
            const phone = document.getElementById("checkoutPhone").value;
            const address = document.getElementById("checkoutAddress").value;

            // Calculate checkout calculations
            let subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Check applied discount from window/memory
            let discount = window.appliedDiscount || 0;
            let total = subtotal - discount;

            const shippingInfo = {
                name: name,
                email: email,
                phone: phone,
                address: address,
                paymentMethod: selectedPayment
            };

            try {
                const orderId = await placeOrder(shippingInfo, cartItems, subtotal, discount, total);

                if (orderId) {
                    // Save to localOrders for permanent storage
                    let localOrders = JSON.parse(localStorage.getItem("localOrders") || "[]");
                    const dateStr = new Date().toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
                    const newOrder = {
                        orderId: orderId,
                        date: dateStr,
                        status: "Processing",
                        progressClass: "progress-processing",
                        paymentMethod: selectedPayment,
                        shippingAddress: `${name}, ${address}, Phone: ${phone}`,
                        subtotal: subtotal,
                        discount: discount,
                        total: total,
                        items: cartItems.map(item => ({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            image: item.image
                        }))
                    };
                    localOrders.unshift(newOrder); // Add to beginning of array
                    localStorage.setItem("localOrders", JSON.stringify(localOrders));

                    // Show Checkout Success screen overlay
                    const checkoutFormView = document.getElementById("checkoutFormView");
                    const checkoutSuccessView = document.getElementById("checkoutSuccessView");
                    const orderIdText = document.getElementById("orderIdText");

                    if (checkoutFormView && checkoutSuccessView) {
                        checkoutFormView.style.display = "none";
                        checkoutSuccessView.style.display = "block";
                        if (orderIdText) orderIdText.innerText = orderId;
                    } else {
                        alert(`Order placed successfully! Tracking ID: ${orderId}`);
                        window.location.href = "orders.html";
                    }
                }
            } catch (err) {
                console.error("Order placement failed:", err);
                alert("Failed to place order: " + err.message);
            }
        });
    }

    const successCloseBtn = document.getElementById("successCloseBtn");
    if (successCloseBtn) {
        successCloseBtn.addEventListener("click", () => {
            window.location.href = "orders.html"; // Go to order history to see status
        });
    }
});
