document.addEventListener("DOMContentLoaded", () => {
    // 1. Real-Time Date & Time Clock Widget
    function updateNavbarClock() {
        const dateEl = document.getElementById("widgetDate");
        const dayEl = document.getElementById("widgetDay");
        const monthEl = document.getElementById("widgetMonth");
        const yearEl = document.getElementById("widgetYear");
        const timeEl = document.getElementById("widgetTime");
        const ampmEl = document.getElementById("widgetAmpm");
        const secEl = document.getElementById("widgetSec");

        if (!dateEl || !timeEl) return;

        const now = new Date();

        // Format Date (MM/DD)
        const dateVal = String(now.getDate()).padStart(2, '0');
        const monthVal = String(now.getMonth() + 1).padStart(2, '0');
        dateEl.textContent = `${monthVal}/${dateVal}`;

        // Weekday Name
        const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        dayEl.textContent = days[now.getDay()];

        // Month Abbreviation
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        monthEl.textContent = months[now.getMonth()];

        // Full Year
        yearEl.textContent = now.getFullYear();

        // 12-Hour Format Time (HH:MM)
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Hour '0' becomes '12'
        const hoursStr = String(hours).padStart(2, '0');

        timeEl.innerHTML = `${hoursStr}<span class="time-colon">:</span>${minutes}`;
        if (ampmEl) ampmEl.textContent = ampm;
        if (secEl) secEl.textContent = `:${String(now.getSeconds()).padStart(2, '0')}`;
    }

    // Initialize clock and update every second
    updateNavbarClock();
    setInterval(updateNavbarClock, 1000);

    const API_BASE_URL = (window.API_BASE_URL || "http://localhost:8000").replace(/\/$/, "");

    function readLoggedInUser() {
        try {
            return JSON.parse(localStorage.getItem("loggedInUser") || "null");
        } catch (err) {
            console.warn("Clearing invalid saved login data:", err);
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("token");
            return null;
        }
    }

    function saveAuthSession(data) {
        if (data.token) {
            localStorage.setItem("token", data.token);
        }
        if (data.user) {
            localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        }
    }

    function getApiErrorMessage(data, fallbackMessage) {
        if (data && data.errors) {
            return Object.entries(data.errors).map(([field, message]) => `${field}: ${message}`).join("\n");
        }
        return (data && data.error) || fallbackMessage;
    }

    function setFormLoading(form, isLoading, loadingText) {
        const button = form.querySelector('button[type="submit"]');
        if (!button) return;

        if (isLoading) {
            button.dataset.originalText = button.textContent;
            button.disabled = true;
            button.textContent = loadingText;
            return;
        }

        button.disabled = false;
        button.textContent = button.dataset.originalText || button.textContent;
        delete button.dataset.originalText;
    }

    function apiPost(path, payload, includeToken = false) {
        const headers = {
            "Content-Type": "application/json"
        };
        const token = localStorage.getItem("token");
        if (includeToken && token) {
            headers.Authorization = `Bearer ${token}`;
        }

        return fetch(`${API_BASE_URL}${path}`, {
            method: "POST",
            headers,
            credentials: "include",
            body: JSON.stringify(payload)
        }).then(async (res) => {
            const text = await res.text();
            let data = {};
            try {
                data = text ? JSON.parse(text) : {};
            } catch (err) {
                throw new Error("Authentication server returned an invalid response.");
            }

            if (!res.ok) {
                throw new Error(getApiErrorMessage(data, `Request failed with status ${res.status}`));
            }

            return data;
        });
    }

    function notifyAuthChanged() {
        syncLoginState();
        try {
            window.dispatchEvent(new StorageEvent("storage", { key: "loggedInUser" }));
        } catch (err) {
            window.dispatchEvent(new Event("storage"));
        }
    }

    // 2. Mobile Menu Toggle
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // 3. Scroll Entry Animations (Intersection Observer)
    const revealSelector = [
        ".live-card",
        ".coupon-box",
        ".ad-card",
        ".product-card",
        ".offer-card",
        ".section-box",
        ".section-box1",
        ".mini-card",
        ".shop-item"
    ].join(", ");

    const revealCards = document.querySelectorAll(revealSelector);
    revealCards.forEach((card, index) => {
        card.classList.add("reveal");
        card.style.setProperty("--reveal-delay", `${(index % 6) * 70}ms`);
    });

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -35px 0px",
        threshold: 0.12
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target); // Trigger only once
                }
            });
        }, observerOptions);

        revealCards.forEach(card => {
            observer.observe(card);
        });
    } else {
        revealCards.forEach(card => {
            card.classList.add("active");
        });
    }

    // 4. Global Search Redirect + live product-page filtering
    const searchInputs = document.querySelectorAll(".navbar .search-box input");
    const searchButtons = document.querySelectorAll(".navbar .search-box button");
    const hasProductGrid = Boolean(document.getElementById("categoryProductGrid"));
    let liveSearchTimer = null;

    function executeSearch(query) {
        if (!query.trim()) return;
        window.location.href = `products.html?search=${encodeURIComponent(query.trim())}`;
    }

    searchInputs.forEach(input => {
        input.addEventListener("input", () => {
            if (!hasProductGrid || typeof window.setLiveProductSearch !== "function") return;

            clearTimeout(liveSearchTimer);
            liveSearchTimer = setTimeout(() => {
                window.setLiveProductSearch(input.value, input);
            }, 120);
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                if (hasProductGrid && !input.value.trim() && typeof window.setLiveProductSearch === "function") {
                    window.setLiveProductSearch("", input);
                    return;
                }
                executeSearch(input.value);
            }
        });
    });

    searchButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const input = searchInputs[index];
            if (input) executeSearch(input.value);
        });
    });

    // 5. Check Active Login User & Update Navbar UI
    function syncLoginState() {
        const loggedInUserObj = readLoggedInUser();
        const loginBtnElements = document.querySelectorAll(".login-btn");

        if (loggedInUserObj) {
            document.body.classList.add("logged-in");
        } else {
            document.body.classList.remove("logged-in");
        }

        loginBtnElements.forEach(btn => {
            if (loggedInUserObj) {
                // Change Login text to profile link or dropdown toggle text
                const span = btn.querySelector("span");
                if (span) {
                    const displayName = loggedInUserObj.name || loggedInUserObj.email || "Account";
                    span.innerText = displayName.split(" ")[0];
                }
                const icon = btn.querySelector("i");
                if (icon) {
                    icon.className = "fas fa-user-circle";
                    icon.style.color = "var(--orange-primary)";
                }
                if (!btn.classList.contains("dropdown-toggle")) {
                    btn.href = "profile.html";
                }
                btn.classList.add("logged-in");
            } else {
                const span = btn.querySelector("span");
                if (span) span.innerText = "Login";
                const icon = btn.querySelector("i");
                if (icon) {
                    icon.className = "fas fa-user";
                    icon.style.color = "";
                }
                if (!btn.classList.contains("dropdown-toggle")) {
                    btn.href = "#";
                }
                btn.classList.remove("logged-in");
            }
        });

        // Sync wishlist count badge inside dropdown if update function is ready
        if (window.updateWishlistBadge) {
            window.updateWishlistBadge();
        }
    }

    syncLoginState();
    window.syncLoginState = syncLoginState;
    window.addEventListener("storage", (e) => {
        if (e.key === "loggedInUser") {
            syncLoginState();
        }
    });

    // 6. Global Auth Modal & Dropdown Toggle Logic
    const authModal = document.getElementById("authModal");
    const authCard = document.getElementById("authCard");
    const closeAuthBtn = document.getElementById("closeAuthBtn");
    const toSignInBtn = document.getElementById("toSignInBtn");
    const toSignUpBtn = document.getElementById("toSignUpBtn");
    const loginBtns = document.querySelectorAll(".login-btn");

    if (authModal && authCard) {
        loginBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                if (btn.classList.contains("dropdown-toggle")) {
                    e.preventDefault();
                    e.stopPropagation();
                    const wrapper = btn.closest(".nav-dropdown-wrapper");
                    if (wrapper) {
                        wrapper.classList.toggle("active");
                    }
                    return;
                }
                const loggedInUserObj = readLoggedInUser();
                if (loggedInUserObj) {
                    return;
                }
                e.preventDefault();
                authModal.classList.add("active");
                authCard.classList.add("right-panel-active"); // Open register by default
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
            const activeWrappers = document.querySelectorAll(".nav-dropdown-wrapper.active");
            activeWrappers.forEach(wrapper => {
                if (!wrapper.contains(e.target)) {
                    wrapper.classList.remove("active");
                }
            });
        });

        // Dropdown actions
        const dropdownLoginBtn = document.getElementById("dropdownLoginBtn");
        if (dropdownLoginBtn) {
            dropdownLoginBtn.addEventListener("click", (e) => {
                e.preventDefault();
                authModal.classList.add("active");
                authCard.classList.add("right-panel-active");
            });
        }

        const dropdownSignOutBtn = document.getElementById("dropdownSignOutBtn");
        if (dropdownSignOutBtn) {
            dropdownSignOutBtn.addEventListener("click", (e) => {
                e.preventDefault();
                if (confirm("Are you sure you want to sign out?")) {
                    localStorage.removeItem("loggedInUser");
                    localStorage.removeItem("token");
                    notifyAuthChanged();
                    alert("Signed out successfully.");
                    window.location.href = "index.html";
                }
            });
        }

        const closeAuth = () => {
            authModal.classList.remove("active");
        };

        if (closeAuthBtn) {
            closeAuthBtn.addEventListener("click", closeAuth);
        }

        authModal.addEventListener("click", (e) => {
            if (e.target === authModal) {
                closeAuth();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && authModal.classList.contains("active")) {
                closeAuth();
            }
        });

        if (toSignInBtn) {
            toSignInBtn.addEventListener("click", (e) => {
                e.preventDefault();
                authCard.classList.remove("right-panel-active");
            });
        }

        if (toSignUpBtn) {
            toSignUpBtn.addEventListener("click", (e) => {
                e.preventDefault();
                authCard.classList.add("right-panel-active");
            });
        }
    }

    // 7. Registration logic calling backend API
    const signUpForm = document.getElementById("signUpForm");
    if (signUpForm) {
        signUpForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("regName").value.trim();
            const email = document.getElementById("regEmail").value.trim();
            const phone = document.getElementById("regPhone").value.trim();
            const password = document.getElementById("regPassword").value;
            const selectedUserType = document.querySelector('input[name="regUserType"]:checked');
            const userType = selectedUserType ? selectedUserType.value : "buyer";

            setFormLoading(signUpForm, true, "SIGNING UP...");
            try {
                const data = await apiPost("/api/auth/register/", { name, email, phone, password, userType });
                if (data.success) {
                    saveAuthSession(data);
                    
                    alert("Registration successful!");
                    signUpForm.reset();
                    if (authModal) authModal.classList.remove("active");
                    notifyAuthChanged();
                    
                    // If on login or register standalone pages, redirect to home
                    if (window.location.pathname.includes("login") || window.location.pathname.includes("register")) {
                        window.location.href = "index.html";
                    }
                } else {
                    const errorMsg = getApiErrorMessage(data, "Registration failed");
                    alert("Registration failed:\n" + errorMsg);
                }
            } catch (err) {
                console.error("Error during registration:", err);
                alert(err.message || "Connection to authentication server failed. Please ensure the backend is running.");
            } finally {
                setFormLoading(signUpForm, false);
            }
        });
    }

    // 8. Login logic calling backend API
    const signInForm = document.getElementById("signInForm");
    if (signInForm) {
        signInForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const loginUser = document.getElementById("loginUser").value.trim();
            const loginPass = document.getElementById("loginPassword").value;
            const selectedUserType = document.querySelector('input[name="loginUserType"]:checked');
            const payload = {
                loginUser: loginUser,
                password: loginPass
            };

            if (selectedUserType) {
                payload.userType = selectedUserType.value;
            }

            setFormLoading(signInForm, true, "SIGNING IN...");
            try {
                const data = await apiPost("/api/auth/login/", payload);
                if (data.success) {
                    saveAuthSession(data);
                    
                    alert(`Welcome back, ${data.user.name || "Account"}!`);
                    signInForm.reset();
                    if (authModal) authModal.classList.remove("active");
                    notifyAuthChanged();
                    
                    if (window.location.pathname.includes("login") || window.location.pathname.includes("register")) {
                        window.location.href = "index.html";
                    }
                } else {
                    alert(getApiErrorMessage(data, "Invalid credentials!"));
                }
            } catch (err) {
                console.error("Error during login:", err);
                alert(err.message || "Connection to authentication server failed. Please ensure the backend is running.");
            } finally {
                setFormLoading(signInForm, false);
            }
        });
    }

    // 9. Subscribe form submission
    document.querySelectorAll(".footer-subscribe-form").forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Subscribed successfully to our newsletter!");
            form.reset();
        });
    });

    // 10. Real-Time Auto Geolocation and Reverse Geocoding
    const navLocationAddress = document.getElementById("navLocationAddress");
    const navLocationBtn = document.getElementById("navLocation");
    let globalWatchId = null;
    let globalLastLat = null;
    let globalLastLon = null;

    // Load any cached address on page load
    function loadCachedLocation() {
        const loggedUser = readLoggedInUser();
        const cachedAddress = loggedUser?.address || localStorage.getItem("current_location_address");
        if (cachedAddress && navLocationAddress) {
            navLocationAddress.innerText = cachedAddress;
        }
    }

    function updateAllLocationElements(addressText) {
        // 1. Update navbar widget
        if (navLocationAddress) {
            navLocationAddress.innerText = addressText;
        }

        // 2. Save globally to localStorage
        localStorage.setItem("current_location_address", addressText);

        // 3. Update loggedInUser in localStorage if present
        const loggedUser = readLoggedInUser();
        if (loggedUser) {
            if (loggedUser.address !== addressText) {
                loggedUser.address = addressText;
                localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
            }
        }

        // 4. Update Profile Page inputs if present
        const profileAddressInput = document.getElementById("profileAddress");
        if (profileAddressInput) {
            profileAddressInput.value = addressText;
        }
        const compactAddress = document.getElementById("compactAddress");
        if (compactAddress) {
            compactAddress.innerText = addressText;
            compactAddress.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
            compactAddress.style.color = "#10b981";
            setTimeout(() => {
                compactAddress.style.backgroundColor = "transparent";
                compactAddress.style.color = "var(--navy-blue)";
            }, 1500);
        }

        // 5. Update Checkout Page inputs if present
        const checkoutAddressField = document.getElementById("checkoutAddress");
        if (checkoutAddressField) {
            checkoutAddressField.value = addressText;
        }
    }

    function syncLocationToBackend(addressText) {
        const token = localStorage.getItem("token");
        const loggedUser = readLoggedInUser();
        if (token && loggedUser) {
            const name = loggedUser.name || "";
            const email = loggedUser.email || "";
            const phone = loggedUser.phone || "";
            const user_type = loggedUser.userType || "buyer";

            apiPost("/api/auth/profile/", { name, email, phone, address: addressText, user_type }, true)
            .then(data => {
                if (data.success && data.user) {
                    saveAuthSession(data);
                    if (window.syncLoginState) {
                        window.syncLoginState();
                    }
                }
            })
            .catch(err => {
                console.error("Global auto-save location API error:", err);
            });
        }
    }

    function reverseGeocodeGlobal(lat, lon, isManual = false) {
        if (!isManual && globalLastLat !== null && globalLastLon !== null) {
            // If moved less than ~10 meters, don't query Nominatim again to avoid spam
            const distanceThreshold = 0.0001;
            if (Math.abs(globalLastLat - lat) < distanceThreshold && Math.abs(globalLastLon - lon) < distanceThreshold) {
                const liveBadge = document.getElementById("liveLocationBadge");
                if (liveBadge) {
                    liveBadge.innerHTML = `<span class="pulse-dot" style="background-color:#10b981"></span> Live Active`;
                    liveBadge.style.color = "#10b981";
                }
                return;
            }
        }

        globalLastLat = lat;
        globalLastLon = lon;

        if (navLocationAddress) {
            navLocationAddress.innerText = "Resolving Address...";
        }

        const coordSpan = document.getElementById("compactCoordinates");
        if (coordSpan) {
            coordSpan.innerText = `Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)}`;
        }

        const liveBadge = document.getElementById("liveLocationBadge");
        if (liveBadge) {
            liveBadge.innerHTML = `<span class="pulse-dot" style="background-color:var(--navy-accent)"></span> Updating...`;
        }

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`)
            .then(res => res.json())
            .then(data => {
                let addressText = "";
                if (data && data.display_name) {
                    addressText = data.display_name;
                } else {
                    addressText = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
                }

                updateAllLocationElements(addressText);
                syncLocationToBackend(addressText);

                if (liveBadge) {
                    liveBadge.innerHTML = `<span class="pulse-dot" style="background-color:#10b981"></span> Live Active`;
                    liveBadge.style.color = "#10b981";
                }
            })
            .catch(err => {
                console.error("Global OSM reverse geocode error:", err);
                const fallbackAddress = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
                updateAllLocationElements(fallbackAddress);
                syncLocationToBackend(fallbackAddress);

                if (liveBadge) {
                    liveBadge.innerHTML = `<span class="pulse-dot" style="background-color:var(--orange-primary)"></span> Live Active (No Geocode)`;
                    liveBadge.style.color = "var(--orange-primary)";
                }
            });
    }

    function startGlobalLocationTracking() {
        if (globalWatchId !== null) return;
        if (!navigator.geolocation) {
            const liveBadge = document.getElementById("liveLocationBadge");
            if (liveBadge) {
                liveBadge.innerHTML = `<i class="fas fa-exclamation-circle"></i> Unsupported`;
                liveBadge.style.color = "#ef4444";
            }
            return;
        }

        const liveBadge = document.getElementById("liveLocationBadge");
        if (liveBadge) {
            liveBadge.innerHTML = `<span class="pulse-dot" style="background-color:var(--orange-primary)"></span> Detecting...`;
        }

        globalWatchId = navigator.geolocation.watchPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                reverseGeocodeGlobal(lat, lon, false);
            },
            (error) => {
                console.error("Global geolocation watch error:", error);
                const liveBadge = document.getElementById("liveLocationBadge");
                if (liveBadge) {
                    liveBadge.innerHTML = `<i class="fas fa-exclamation-circle"></i> No Permission`;
                    liveBadge.style.color = "#ef4444";
                }
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
    }

    function triggerManualLocationRefresh() {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        const originalText = navLocationAddress ? navLocationAddress.innerText : "";
        if (navLocationAddress) {
            navLocationAddress.innerText = "Locating...";
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                reverseGeocodeGlobal(lat, lon, true);
            },
            (error) => {
                console.error("Manual geolocation error:", error);
                if (navLocationAddress) {
                    navLocationAddress.innerText = originalText;
                }
                alert("Location detection failed. Please check browser location permissions.");
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    }

    // Initialize location tracking
    loadCachedLocation();
    startGlobalLocationTracking();

    if (navLocationBtn) {
        navLocationBtn.addEventListener("click", (e) => {
            e.preventDefault();
            triggerManualLocationRefresh();
        });
    }

    // Expose functions globally
    window.startGlobalLocationTracking = startGlobalLocationTracking;
    window.triggerManualLocationRefresh = triggerManualLocationRefresh;
    window.reverseGeocodeGlobal = reverseGeocodeGlobal;
});
