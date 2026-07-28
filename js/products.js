const categoryIcons = {
    "Mobiles": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="mobiles-grad-body" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4f46e5" /><stop offset="100%" stop-color="#06b6d4" /></linearGradient><linearGradient id="mobiles-grad-side" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3730a3" /><stop offset="100%" stop-color="#0891b2" /></linearGradient><linearGradient id="mobiles-grad-screen" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1e1b4b" /><stop offset="100%" stop-color="#0f172a" /></linearGradient></defs><ellipse cx="32" cy="56" rx="20" ry="5" fill="rgba(0,0,0,0.15)" /><rect x="19" y="10" width="26" height="42" rx="5" fill="url(#mobiles-grad-side)" transform="translate(-3, -3)" /><rect x="19" y="10" width="26" height="42" rx="5" fill="url(#mobiles-grad-body)" /><rect x="21" y="13" width="22" height="36" rx="3" fill="url(#mobiles-grad-screen)" /><rect x="29" y="14" width="6" height="2" rx="1" fill="#475569" /><path d="M21 13 L35 13 L21 38 Z" fill="rgba(255, 255, 255, 0.12)" /><circle cx="26" cy="20" r="1.5" fill="#f59e0b" /><circle cx="32" cy="20" r="1.5" fill="#10b981" /><circle cx="38" cy="20" r="1.5" fill="#3b82f6" /><rect x="25" y="25" width="14" height="10" rx="1" fill="rgba(255,255,255,0.08)" /><rect x="30" y="47" width="4" height="0.8" rx="0.4" fill="#64748b" /></svg>`,
    "Laptops": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="laptops-grad-screen" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3b82f6" /><stop offset="100%" stop-color="#1d4ed8" /></linearGradient><linearGradient id="laptops-grad-body" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#94a3b8" /><stop offset="100%" stop-color="#475569" /></linearGradient><linearGradient id="laptops-grad-base" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#cbd5e1" /><stop offset="100%" stop-color="#64748b" /></linearGradient></defs><ellipse cx="32" cy="54" rx="26" ry="6" fill="rgba(0,0,0,0.15)" /><path d="M12 40 L16 16 C16 15 17 14 18 14 L46 14 C47 14 48 15 48 16 L52 40 Z" fill="url(#laptops-grad-body)" /><path d="M15 38 L18 17 C18 16.5 18.5 16 19 16 L45 16 C45.5 16 46 16.5 46 17 L49 38 Z" fill="url(#laptops-grad-screen)" /><path d="M15 38 L30 16 L20 16 Z" fill="rgba(255,255,255,0.15)" /><path d="M8 40 C8 40 9 43 12 47 C14 49 18 50 18 50 L46 50 C46 50 50 49 52 47 C55 43 56 40 56 40 Z" fill="url(#laptops-grad-base)" /><path d="M8 40 L56 40 L56 42 L8 42 Z" fill="#334155" /><rect x="27" y="45" width="10" height="4" rx="0.5" fill="#475569" /><path d="M14 42 H50 M13 44 H51" stroke="#475569" stroke-width="1.5" /></svg>`,
    "Electronics": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="elec-grad-band" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#ef4444" /><stop offset="50%" stop-color="#f87171" /><stop offset="100%" stop-color="#ef4444" /></linearGradient><linearGradient id="elec-grad-cup" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e293b" /><stop offset="100%" stop-color="#0f172a" /></linearGradient><radialGradient id="elec-grad-cushion" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#475569" /><stop offset="100%" stop-color="#1e293b" /></radialGradient></defs><ellipse cx="32" cy="56" rx="22" ry="5" fill="rgba(0,0,0,0.15)" /><path d="M14 36 C14 20 22 12 32 12 C42 12 50 20 50 36" stroke="url(#elec-grad-band)" stroke-width="6" stroke-linecap="round" /><path d="M14 36 C14 20 22 12 32 12 C42 12 50 20 50 36" stroke="#b91c1c" stroke-width="2" stroke-linecap="round" transform="translate(0, 1)" /><rect x="11" y="30" width="6" height="10" rx="2" fill="#94a3b8" /><rect x="47" y="30" width="6" height="10" rx="2" fill="#94a3b8" /><rect x="6" y="34" width="10" height="16" rx="5" fill="url(#elec-grad-cushion)" /><rect x="4" y="36" width="6" height="12" rx="3" fill="url(#elec-grad-cup)" /><rect x="48" y="34" width="10" height="16" rx="5" fill="url(#elec-grad-cushion)" /><rect x="54" y="36" width="6" height="12" rx="3" fill="url(#elec-grad-cup)" /><circle cx="7" cy="42" r="2" fill="#f59e0b" /><circle cx="57" cy="42" r="2" fill="#f59e0b" /></svg>`,
    "Fashion": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="fash-grad-shirt" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ec4899" /><stop offset="100%" stop-color="#8b5cf6" /></linearGradient><linearGradient id="fash-grad-collar" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#f472b6" /><stop offset="100%" stop-color="#7c3aed" /></linearGradient></defs><ellipse cx="32" cy="56" rx="22" ry="5" fill="rgba(0,0,0,0.15)" /><path d="M16 22 L24 16 L28 20 L32 16 L36 20 L40 16 L48 22 L46 48 C46 50 44 52 42 52 L22 52 C20 52 18 50 18 48 Z" fill="url(#fash-grad-shirt)" /><path d="M16 22 L8 30 L12 34 L18 28 Z" fill="#db2777" /><path d="M48 22 L56 30 L52 34 L46 28 Z" fill="#6d28d9" /><path d="M24 16 L32 25 L40 16 L36 16 L32 20 L28 16 Z" fill="url(#fash-grad-collar)" /><line x1="32" y1="25" x2="32" y2="48" stroke="#ffffff" stroke-width="2" stroke-linecap="round" /><circle cx="32" cy="30" r="1.5" fill="#f59e0b" /><circle cx="32" cy="38" r="1.5" fill="#f59e0b" /><circle cx="32" cy="46" r="1.5" fill="#f59e0b" /></svg>`,
    "Footwear": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="foot-grad-sole" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#f59e0b" /><stop offset="100%" stop-color="#ef4444" /></linearGradient><linearGradient id="foot-grad-body" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e2e8f0" /><stop offset="100%" stop-color="#94a3b8" /></linearGradient></defs><ellipse cx="32" cy="54" rx="26" ry="6" fill="rgba(0,0,0,0.2)" /><path d="M12 44 L16 32 C18 26 24 20 34 20 L48 24 L52 34 C54 38 52 44 48 44 Z" fill="url(#foot-grad-body)" /><path d="M34 20 C36 16 42 16 46 22 L48 24 Z" fill="#cbd5e1" /><path d="M22 36 C28 32 36 32 44 38" stroke="#10b981" stroke-width="3" stroke-linecap="round" /><path d="M34 24 L38 28 M38 22 L42 26 M42 20 L46 24" stroke="#475569" stroke-width="2" stroke-linecap="round" /><path d="M16 32 C14 32 12 36 12 40 Z" fill="#475569" /><path d="M10 44 C10 44 14 47 24 47 C34 47 46 47 50 45 C54 43 54 44 54 44 L50 48 C44 50 32 50 22 50 C12 50 10 46 10 46 Z" fill="url(#foot-grad-sole)" /></svg>`,
    "Watches": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="watch-grad-strap" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e293b" /><stop offset="100%" stop-color="#0f172a" /></linearGradient><linearGradient id="watch-grad-bezel" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fbbf24" /><stop offset="50%" stop-color="#fffbeb" /><stop offset="100%" stop-color="#d97706" /></linearGradient><radialGradient id="watch-grad-face" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#0369a1" /><stop offset="100%" stop-color="#0c4a6e" /></radialGradient></defs><ellipse cx="32" cy="56" rx="18" ry="5" fill="rgba(0,0,0,0.15)" /><rect x="24" y="8" width="16" height="48" rx="4" fill="url(#watch-grad-strap)" /><circle cx="32" cy="32" r="20" fill="rgba(0,0,0,0.2)" transform="translate(1, 2)" /><circle cx="32" cy="32" r="20" fill="url(#watch-grad-bezel)" /><circle cx="32" cy="32" r="16" fill="url(#watch-grad-face)" /><path d="M18 24 A 16 16 0 0 1 44 24 Z" fill="rgba(255,255,255,0.12)" /><line x1="32" y1="32" x2="32" y2="22" stroke="#ffffff" stroke-width="2" stroke-linecap="round" /><line x1="32" y1="32" x2="40" y2="32" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" /><circle cx="32" cy="32" r="1.5" fill="#ffffff" /><rect x="52" y="30" width="2" height="4" rx="0.5" fill="#fbbf24" /></svg>`,
    "Beauty": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="beauty-grad-case" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#111827" /><stop offset="50%" stop-color="#4b5563" /><stop offset="100%" stop-color="#111827" /></linearGradient><linearGradient id="beauty-grad-gold" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#d97706" /><stop offset="50%" stop-color="#fef3c7" /><stop offset="100%" stop-color="#b45309" /></linearGradient><linearGradient id="beauty-grad-red" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#dc2626" /><stop offset="50%" stop-color="#fca5a5" /><stop offset="100%" stop-color="#991b1b" /></linearGradient></defs><ellipse cx="32" cy="56" rx="14" ry="4" fill="rgba(0,0,0,0.18)" /><rect x="22" y="32" width="20" height="22" rx="2" fill="url(#beauty-grad-case)" /><rect x="22" y="28" width="20" height="4" fill="url(#beauty-grad-gold)" /><rect x="24" y="20" width="16" height="8" fill="url(#beauty-grad-gold)" /><path d="M26 20 L38 20 L38 12 L26 6 Z" fill="url(#beauty-grad-red)" /><path d="M29 18 L32 18 L32 7 L29 9 Z" fill="rgba(255, 255, 255, 0.4)" /></svg>`,
    "Bags": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="bags-grad-main" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0ea5e9" /><stop offset="100%" stop-color="#2563eb" /></linearGradient><linearGradient id="bags-grad-pocket" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#38bdf8" /><stop offset="100%" stop-color="#1d4ed8" /></linearGradient></defs><ellipse cx="32" cy="56" rx="20" ry="5" fill="rgba(0,0,0,0.15)" /><path d="M26 16 C26 10 38 10 38 16" stroke="#1e40af" stroke-width="4" fill="none" /><rect x="18" y="16" width="28" height="36" rx="8" fill="url(#bags-grad-main)" /><rect x="21" y="32" width="22" height="17" rx="4" fill="url(#bags-grad-pocket)" /><line x1="22" y1="32" x2="42" y2="32" stroke="#0f172a" stroke-width="2" stroke-dasharray="2 1" /><line x1="20" y1="22" x2="44" y2="22" stroke="#0f172a" stroke-width="2" stroke-dasharray="2 1" /><rect x="30" y="40" width="4" height="3" rx="0.5" fill="#f59e0b" /></svg>`,
    "Home & Kitchen": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="home-grad-roof" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ef4444" /><stop offset="100%" stop-color="#b91c1c" /></linearGradient><linearGradient id="home-grad-wall1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f1f5f9" /><stop offset="100%" stop-color="#cbd5e1" /></linearGradient><linearGradient id="home-grad-wall2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#94a3b8" /><stop offset="100%" stop-color="#64748b" /></linearGradient></defs><ellipse cx="32" cy="56" rx="24" ry="6" fill="rgba(0,0,0,0.15)" /><path d="M12 34 L32 44 L32 54 L12 44 Z" fill="url(#home-grad-wall1)" /><path d="M32 44 L52 34 L52 44 L32 54 Z" fill="url(#home-grad-wall2)" /><path d="M8 32 L32 16 L34 18 L10 34 Z" fill="url(#home-grad-roof)" /><path d="M32 16 L56 32 L54 34 L32 18 Z" fill="#991b1b" /><path d="M18 42 L24 45 L24 50 L18 47 Z" fill="#78350f" /><path d="M38 40 L44 37 L44 42 L38 45 Z" fill="#38bdf8" /><path d="M44 20 L48 22 L48 28 L44 26 Z" fill="#475569" /></svg>`,
    "Furniture": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="furn-grad-sofa" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f59e0b" /><stop offset="100%" stop-color="#d97706" /></linearGradient><linearGradient id="furn-grad-side" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#b45309" /><stop offset="100%" stop-color="#78350f" /></linearGradient></defs><ellipse cx="32" cy="56" rx="20" ry="5" fill="rgba(0,0,0,0.18)" /><line x1="20" y1="46" x2="20" y2="53" stroke="#475569" stroke-width="3" stroke-linecap="round" /><line x1="44" y1="46" x2="44" y2="53" stroke="#475569" stroke-width="3" stroke-linecap="round" /><line x1="28" y1="46" x2="28" y2="51" stroke="#334155" stroke-width="2" /><line x1="36" y1="46" x2="36" y2="51" stroke="#334155" stroke-width="2" /><rect x="18" y="16" width="28" height="22" rx="4" fill="url(#furn-grad-sofa)" /><rect x="18" y="16" width="28" height="6" rx="2" fill="#fbbf24" /><rect x="14" y="34" width="36" height="12" rx="4" fill="url(#furn-grad-sofa)" /><rect x="14" y="34" width="36" height="4" rx="1" fill="#fbbf24" /><rect x="12" y="28" width="6" height="16" rx="3" fill="url(#furn-grad-side)" /><rect x="46" y="28" width="6" height="16" rx="3" fill="url(#furn-grad-side)" /></svg>`,
    "Appliances": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="app-grad-body" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e2e8f0" /><stop offset="100%" stop-color="#94a3b8" /></linearGradient><linearGradient id="app-grad-panel" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#475569" /><stop offset="100%" stop-color="#1e293b" /></linearGradient><radialGradient id="app-grad-door" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#38bdf8" /><stop offset="70%" stop-color="#0284c7" /><stop offset="100%" stop-color="#1e293b" /></radialGradient></defs><ellipse cx="32" cy="56" rx="20" ry="5" fill="rgba(0,0,0,0.15)" /><rect x="17" y="10" width="28" height="42" rx="4" fill="#64748b" transform="translate(-2, 2)" /><rect x="17" y="10" width="28" height="42" rx="4" fill="url(#app-grad-body)" /><rect x="19" y="12" width="24" height="8" rx="2" fill="url(#app-grad-panel)" /><circle cx="24" cy="16" r="2" fill="#cbd5e1" /><rect x="29" y="15" width="4" height="2" fill="#10b981" /><rect x="35" y="15" width="4" height="2" fill="#3b82f6" /><circle cx="31" cy="34" r="11" fill="#475569" /><circle cx="31" cy="34" r="8" fill="url(#app-grad-door)" /><path d="M25 31 C25 27 33 27 35 31 Z" fill="rgba(255, 255, 255, 0.25)" /><rect x="19" y="22" width="8" height="3" rx="0.5" stroke="#475569" stroke-width="1" /></svg>`,
    "Books": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="books-grad-red" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ef4444" /><stop offset="100%" stop-color="#991b1b" /></linearGradient><linearGradient id="books-grad-blue" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3b82f6" /><stop offset="100%" stop-color="#1d4ed8" /></linearGradient><linearGradient id="books-grad-green" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#10b981" /><stop offset="100%" stop-color="#047857" /></linearGradient></defs><ellipse cx="32" cy="56" rx="22" ry="5" fill="rgba(0,0,0,0.15)" /><path d="M14 44 L44 44 L50 48 L20 48 Z" fill="url(#books-grad-blue)" /><path d="M44 44 L50 48 L50 52 L44 48 Z" fill="#1e3a8a" /><rect x="14" y="44" width="30" height="4" fill="#60a5fa" /><rect x="14" y="48" width="36" height="4" rx="1" fill="#1d4ed8" /><path d="M18 36 L48 36 L52 40 L22 40 Z" fill="url(#books-grad-red)" /><path d="M48 36 L52 40 L52 44 L48 40 Z" fill="#7f1d1d" /><rect x="18" y="36" width="30" height="4" fill="#f87171" /><rect x="18" y="40" width="34" height="4" rx="1" fill="#b91c1c" /><path d="M16 28 L42 28 L48 32 L22 32 Z" fill="url(#books-grad-green)" /><path d="M42 28 L48 32 L48 36 L42 32 Z" fill="#064e3b" /><rect x="16" y="28" width="26" height="4" fill="#34d399" /><rect x="16" y="32" width="32" height="4" rx="1" fill="#059669" /></svg>`,
    "Gaming": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="game-grad-body" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4b5563" /><stop offset="100%" stop-color="#1f2937" /></linearGradient><radialGradient id="game-grad-joystick" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#9ca3af" /><stop offset="100%" stop-color="#374151" /></radialGradient></defs><ellipse cx="32" cy="54" rx="22" ry="6" fill="rgba(0,0,0,0.18)" /><path d="M12 24 C12 20 22 18 32 18 C42 18 52 20 52 24 C52 28 54 44 48 48 C44 50 38 40 32 40 C26 40 20 50 16 48 C10 44 12 28 12 24 Z" fill="url(#game-grad-body)" /><path d="M12 24 C12 22 18 20 22 22" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-linecap="round" /><path d="M20 26 H24 V22 H26 V26 H30 V28 H26 V32 H24 V28 H20 Z" fill="#9ca3af" /><circle cx="44" cy="22" r="2" fill="#ef4444" /><circle cx="48" cy="26" r="2" fill="#3b82f6" /><circle cx="44" cy="30" r="2" fill="#10b981" /><circle cx="40" cy="26" r="2" fill="#eab308" /><circle cx="27" cy="33" r="4" fill="url(#game-grad-joystick)" /><circle cx="37" cy="33" r="4" fill="url(#game-grad-joystick)" /><circle cx="27" cy="33" r="2" fill="#111827" /><circle cx="37" cy="33" r="2" fill="#111827" /><circle cx="32" cy="28" r="2" fill="#fbbf24" /></svg>`,
    "Sports": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="sports-grad-ball" cx="30%" cy="30%" r="70%"><stop offset="0%" stop-color="#ffffff" /><stop offset="60%" stop-color="#e2e8f0" /><stop offset="100%" stop-color="#475569" /></radialGradient></defs><ellipse cx="32" cy="56" rx="18" ry="5" fill="rgba(0,0,0,0.2)" /><circle cx="32" cy="32" r="22" fill="url(#sports-grad-ball)" stroke="#334155" stroke-width="1" /><path d="M32 24 L38 28 L36 35 L28 35 L26 28 Z" fill="#1e293b" /><line x1="32" y1="24" x2="32" y2="10" stroke="#334155" stroke-width="1.5" /><line x1="38" y1="28" x2="49" y2="23" stroke="#334155" stroke-width="1.5" /><line x1="36" y1="35" x2="44" y2="46" stroke="#334155" stroke-width="1.5" /><line x1="28" y1="35" x2="20" y2="46" stroke="#334155" stroke-width="1.5" /><line x1="26" y1="28" x2="15" y2="23" stroke="#334155" stroke-width="1.5" /><path d="M32 10 L35 14 L29 14 Z" fill="#1e293b" /><path d="M49 23 L45 27 L49 31 Z" fill="#1e293b" /><path d="M44 46 L40 42 L45 39 Z" fill="#1e293b" /><path d="M20 46 L24 42 L19 39 Z" fill="#1e293b" /><path d="M15 23 L19 27 L15 31 Z" fill="#1e293b" /></svg>`,
    "Automotive": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="auto-grad-car" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#dc2626" /><stop offset="100%" stop-color="#7f1d1d" /></linearGradient><linearGradient id="auto-grad-glass" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#38bdf8" /><stop offset="100%" stop-color="#0369a1" /></linearGradient></defs><ellipse cx="32" cy="54" rx="24" ry="6" fill="rgba(0,0,0,0.2)" /><circle cx="20" cy="46" r="7" fill="#111827" /><circle cx="20" cy="46" r="3" fill="#94a3b8" /><circle cx="44" cy="46" r="7" fill="#111827" /><circle cx="44" cy="46" r="3" fill="#94a3b8" /><path d="M6 40 C6 40 8 32 16 32 C18 32 20 24 26 22 L42 22 C48 24 50 32 54 34 C58 36 58 42 54 44 C50 46 14 46 6 40 Z" fill="url(#auto-grad-car)" /><path d="M27 24 H40 L45 32 H24 Z" fill="url(#auto-grad-glass)" /><path d="M19 34 H22 L24 32 H19 Z" fill="url(#auto-grad-glass)" /><path d="M12 46 A 8 8 0 0 1 28 46" stroke="#475569" stroke-width="2" /><path d="M36 46 A 8 8 0 0 1 52 46" stroke="#475569" stroke-width="2" /><ellipse cx="55" cy="38" rx="2" ry="3" fill="#f59e0b" /><path d="M8 36 L12 32" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" /></svg>`,
    "Baby": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="baby-grad-bottle" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="rgba(255,255,255,0.7)" /><stop offset="50%" stop-color="rgba(255,255,255,0.9)" /><stop offset="100%" stop-color="rgba(203,213,225,0.6)" /></linearGradient><linearGradient id="baby-grad-pink" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#ec4899" /><stop offset="100%" stop-color="#be185d" /></linearGradient><linearGradient id="baby-grad-milk" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#fffbeb" /><stop offset="100%" stop-color="#fef3c7" /></linearGradient></defs><ellipse cx="32" cy="56" rx="14" ry="4" fill="rgba(0,0,0,0.12)" /><rect x="22" y="24" width="20" height="28" rx="4" fill="url(#baby-grad-bottle)" stroke="#94a3b8" stroke-width="1" /><rect x="23" y="32" width="18" height="19" rx="2" fill="url(#baby-grad-milk)" /><line x1="25" y1="36" x2="29" y2="36" stroke="#f59e0b" stroke-width="1.5" /><line x1="25" y1="41" x2="28" y2="41" stroke="#f59e0b" stroke-width="1.5" /><line x1="25" y1="46" x2="29" y2="46" stroke="#f59e0b" stroke-width="1.5" /><rect x="20" y="20" width="24" height="5" rx="1" fill="url(#baby-grad-pink)" /><path d="M28 20 C28 12 36 12 36 20 Z" fill="#fb923c" /></svg>`,
    "Pets": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="pets-grad-bowl" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#10b981" /><stop offset="100%" stop-color="#047857" /></linearGradient><linearGradient id="pets-grad-bone" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f1f5f9" /><stop offset="100%" stop-color="#cbd5e1" /></linearGradient></defs><ellipse cx="32" cy="56" rx="22" ry="5" fill="rgba(0,0,0,0.18)" /><path d="M16 42 C16 36 22 34 32 34 C42 34 48 36 48 42 L52 50 C52 52 46 54 32 54 C18 54 12 52 12 50 Z" fill="url(#pets-grad-bowl)" /><ellipse cx="32" cy="42" rx="16" ry="6" fill="#78350f" /><rect x="26" y="45" width="12" height="4" rx="1.5" fill="url(#pets-grad-bone)" /><circle cx="25" cy="45" r="2.2" fill="url(#pets-grad-bone)" /><circle cx="25" cy="49" r="2.2" fill="url(#pets-grad-bone)" /><circle cx="39" cy="45" r="2.2" fill="url(#pets-grad-bone)" /><circle cx="39" cy="49" r="2.2" fill="url(#pets-grad-bone)" /></svg>`,
    "Grocery": `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="groc-grad-basket" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f97316" /><stop offset="100%" stop-color="#c2410c" /></linearGradient></defs><ellipse cx="32" cy="56" rx="20" ry="5" fill="rgba(0,0,0,0.15)" /><path d="M22 24 L26 12 L30 24 Z" fill="#ea580c" /><path d="M25 10 C23 8 28 8 26 12 Z" fill="#22c55e" /><circle cx="38" cy="24" r="6" fill="#dc2626" /><path d="M38 18 C37 16 39 16 38 18 Z" stroke="#78350f" stroke-width="1.5" /><path d="M39 17 C41 16 41 19 39 17 Z" fill="#22c55e" /><path d="M20 30 C20 18 44 18 44 30" stroke="#94a3b8" stroke-width="3" fill="none" /><path d="M14 30 H50 L46 48 C46 50 42 52 32 52 C22 52 18 50 18 48 Z" fill="url(#groc-grad-basket)" /><rect x="12" y="28" width="40" height="4" rx="2" fill="#ea580c" /><line x1="20" y1="36" x2="44" y2="36" stroke="rgba(255,255,255,0.25)" stroke-width="2" /><line x1="22" y1="44" x2="42" y2="44" stroke="rgba(255,255,255,0.25)" stroke-width="2" /><line x1="24" y1="32" x2="24" y2="50" stroke="rgba(255,255,255,0.25)" stroke-width="2" /><line x1="32" y1="32" x2="32" y2="50" stroke="rgba(255,255,255,0.25)" stroke-width="2" /><line x1="40" y1="32" x2="40" y2="50" stroke="rgba(255,255,255,0.25)" stroke-width="2" /></svg>`
};

const categoryConfig = {
    "Mobiles": {
        icon: `<span class="category-icon-wrapper" data-category="Mobiles">${categoryIcons["Mobiles"]}</span>`,
        tagline: "Stay connected with the latest smartphones and mobile tech.",
        brands: ["Apple", "Samsung", "OnePlus", "Google", "Xiaomi", "Realme", "Motorola", "Oppo"],
        products: ["Phone 15", "Galaxy S24", "12 Pro", "Pixel 8", "Redmi Note 13", "Narzo 60", "Edge 40", "Reno 11"],
        specs: ["128GB Storage, 8GB RAM", "256GB Storage, 12GB RAM", "512GB Storage, 16GB RAM", "5G Enabled, Super Retina Display", "108MP Camera, 5000mAh Battery"],
        images: [
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 9999,
        maxPrice: 149999
    },
    "Laptops": {
        icon: `<span class="category-icon-wrapper" data-category="Laptops">${categoryIcons["Laptops"]}</span>`,
        tagline: "Boost your productivity with our range of high-performance laptops.",
        brands: ["Dell", "HP", "Lenovo", "Apple", "Asus", "Acer", "MSI", "Samsung"],
        products: ["Inspiron 15", "Pavilion x360", "ThinkPad E14", "MacBook Air M3", "ROG Zephyrus", "Swift Go", "Modern 14", "Galaxy Book4"],
        specs: ["Intel i5, 8GB RAM, 512GB SSD", "Intel i7, 16GB RAM, 1TB SSD", "AMD Ryzen 5, 16GB RAM", "Apple M3, 8-Core CPU", "Intel Ultra 5, 16GB, OLED Screen"],
        images: [
            "https://images.unsplash.com/photo-1496181130204-755241524eab?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1522374305904-7422596827c8?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 29999,
        maxPrice: 249999
    },
    "Electronics": {
        icon: `<span class="category-icon-wrapper" data-category="Electronics">${categoryIcons["Electronics"]}</span>`,
        tagline: "Premium sound systems, smart speakers, cameras and accessories.",
        brands: ["Sony", "Bose", "JBL", "Sennheiser", "boAt", "Noise", "Anker", "GoPro"],
        products: ["Noise Cancelling Headphones", "Portable Bluetooth Speaker", "True Wireless Earbuds", "Soundbar Home Theatre", "4K Action Camera", "Smart AI Assistant", "Dual Port Charger", "Magnetic Power Bank"],
        specs: ["Active Noise Cancellation", "IPX7 Waterproof, 20H Battery", "Hi-Res Audio, Sweat Resistant", "Bluetooth 5.3, Ultra Bass", "Ultra HD, 60fps Recording"],
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 999,
        maxPrice: 39999
    },
    "Fashion": {
        icon: `<span class="category-icon-wrapper" data-category="Fashion">${categoryIcons["Fashion"]}</span>`,
        tagline: "Stay stylish with our trendsetting wardrobe essentials.",
        brands: ["Zara", "H&M", "Levi's", "Roadster", "Allen Solly", "US Polo Assn", "Tommy Hilfiger", "Jack & Jones"],
        products: ["Slim Fit Denim Jeans", "Polo Neck Cotton T-Shirt", "Casual Checked Shirt", "Lightweight Hooded Jacket", "Premium Woolen Sweater", "Classic Tailored Blazer", "Elastic Waist Track Pants", "Smart Fit Cotton Chinos"],
        specs: ["100% Breathable Cotton", "Stretchable Comfortable Fit", "Premium Quality Stitching", "Machine Washable", "Slim Modern Silhouette"],
        images: [
            "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 499,
        maxPrice: 9999
    },
    "Footwear": {
        icon: `<span class="category-icon-wrapper" data-category="Footwear">${categoryIcons["Footwear"]}</span>`,
        tagline: "Step into absolute comfort with shoes for all activities.",
        brands: ["Nike", "Adidas", "Puma", "Reebok", "Skechers", "Bata", "Red Tape", "Woodland"],
        products: ["Running Sports Shoes", "Classic White Sneakers", "Formal Leather Oxfords", "Cushioned Walking Shoes", "Waterproof Trekking Boots", "Casual Slide Slippers", "Unisex Flip Flops", "Breathable Sports Sandals"],
        specs: ["High Bounce EVA Sole", "Genuine Leather Finish", "Orthopedic Memory Foam Inner", "Durable All-Terrain Grip", "Lightweight Mesh Fabric"],
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1603808033192-082d6f74b30d?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 599,
        maxPrice: 15999
    },
    "Watches": {
        icon: `<span class="category-icon-wrapper" data-category="Watches">${categoryIcons["Watches"]}</span>`,
        tagline: "Track your time elegantly with classic analog & smart watches.",
        brands: ["Titan", "Casio", "Fossil", "Seiko", "Fastrack", "Noise", "Apple", "Fossil Q"],
        products: ["Vintage Digital Watch", "Premium Chronograph Metal Watch", "Minimalist Quartz Watch", "Fitness Smartwatch Series S", "Genuine Leather Strap Watch", "Rugged Waterproof Watch", "Smart Fitness Tracker Band", "Luminous Sports Watch"],
        specs: ["Japanese Quartz Movement", "Amoled Always-On Display", "Water Resistant up to 50m", "Stainless Steel Mesh Strap", "Heart Rate & SpO2 Tracker"],
        images: [
            "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 1199,
        maxPrice: 49999
    },
    "Beauty": {
        icon: `<span class="category-icon-wrapper" data-category="Beauty">${categoryIcons["Beauty"]}</span>`,
        tagline: "Care for yourself with premium skin, hair and makeup products.",
        brands: ["L'Oreal", "Nivea", "Lakme", "Mamaearth", "Neutrogena", "Maybelline", "Clinique", "Biotique"],
        products: ["Hydrating Face Wash", "Vitamin C Face Serum", "Deep Nourish Moisturizer", "Sunscreen SPF 50 Pa+++", "Matte Waterproof Lipstick", "Anti-Dandruff Herbal Shampoo", "Organic Tea Tree Hair Oil", "Gentle Exfoliating Scrub"],
        specs: ["Dermatologically Tested", "Paraben-Free, Organic Extracts", "Suitable for All Skin Types", "Long Lasting 12H Matte Finish", "With Natural Active Ingredients"],
        images: [
            "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 149,
        maxPrice: 4999
    },
    "Bags": {
        icon: `<span class="category-icon-wrapper" data-category="Bags">${categoryIcons["Bags"]}</span>`,
        tagline: "Backpacks, handbags and luggage built for style and durability.",
        brands: ["Wildcraft", "Skybags", "American Tourister", "Samsonite", "Lavie", "Puma", "Safari", "Tommy Hilfiger"],
        products: ["Multi-Pocket Laptop Backpack", "Premium Leather Tote Handbag", "Compact Sling Crossbody Bag", "Durable Gym Duffle Bag", "Hard Shell Hardside Trolley", "Casual Canvas School Bag", "Slim Laptop Sleeve Case", "Anti-Theft Travel Backpack"],
        specs: ["Water Resistant Polyester", "Genuine Textured Leather", "TSA Approved Lock System", "Ergonomic Padded Stars", "Heavy Duty Metal Zippers"],
        images: [
            "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 399,
        maxPrice: 12999
    },
    "Home & Kitchen": {
        icon: `<span class="category-icon-wrapper" data-category="Home & Kitchen">${categoryIcons["Home & Kitchen"]}</span>`,
        tagline: "Decorate and fully equip your home and kitchen spaces.",
        brands: ["Prestige", "Hawkins", "Milton", "Pigeon", "Philips", "Cello", "Borosil", "Bajaj"],
        products: ["Non-Stick Cookware Set", "Hard Anodized Pressure Cooker", "Insulated Stainless Steel Bottle", "Compact Vegetable Chopper", "Electric Dry Iron", "Microwave Safe Glass Bowl Set", "BPA-Free Lunch Box Box", "Rapid Boil Electric Kettle"],
        specs: ["High Grade Food Safe Material", "Induction Friendly Base", "Dishwasher Safe Glass", "Energy Efficient Heating Element", "Ergonomic Stay-Cool Handles"],
        images: [
            "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 249,
        maxPrice: 8999
    },
    "Furniture": {
        icon: `<span class="category-icon-wrapper" data-category="Furniture">${categoryIcons["Furniture"]}</span>`,
        tagline: "Upgrade your living spaces with premium home furniture.",
        brands: ["Wakefit", "Nilkamal", "Godrej Interio", "Urban Ladder", "Pepperfry", "Green Soul"],
        products: ["Ergonomic High-Back Office Chair", "3-Seater Premium Fabric Sofa", "Solid Wood Study Desk", "Queen Size Engineering Wood Bed", "4-Seater Glass Dining Table", "2-Door Wardrobe Cabinet", "Comfortable Oversized Bean Bag", "Wall-Mount Floating TV Unit"],
        specs: ["Termite & Moisture Resistant", "High Density Foam Padding", "Premium Sheesham Wood Finish", "Adjustable Lumbar Support", "DIY Assembly Instruction Manual Included"],
        images: [
            "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 1499,
        maxPrice: 39999
    },
    "Appliances": {
        icon: `<span class="category-icon-wrapper" data-category="Appliances">${categoryIcons["Appliances"]}</span>`,
        tagline: "Equip your home with the smartest, energy-efficient appliances.",
        brands: ["Samsung", "LG", "Whirlpool", "IFB", "Philips", "Sony", "Haier", "Godrej"],
        products: ["Smart Ultra HD 4K LED TV", "Frost-Free Double Door Refrigerator", "Fully Automatic Washing Machine", "Convection Digital Microwave Oven", "HEPA Filter Air Purifier", "Instant Storage Water Heater", "Heavy-Duty Food Processor Mixer", "Cyclonic Vacuum Cleaner System"],
        specs: ["5-Star Energy Efficiency Rating", "Inverter Motor technology", "Smart App WiFi Connectivity", "Premium Matte Sleek Design", "Comprehensive 2-Year Manufacturer Warranty"],
        images: [
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1571175432267-efb901416e8b?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 4999,
        maxPrice: 119999
    },
    "Books": {
        icon: `<span class="category-icon-wrapper" data-category="Books">${categoryIcons["Books"]}</span>`,
        tagline: "Explore our massive collection of novels, guides and education.",
        brands: ["Penguin", "HarperCollins", "Bloomsbury", "Simon & Schuster", "Rupa Publications", "Oxford", "Scholastic", "Pearson"],
        products: ["The Silent Detective (Mystery)", "Beyond the Horizon (Sci-Fi)", "The Path to Success (Self-Help)", "Data Structures in C++ (Academic)", "A History of Modern Worlds (History)", "Delicious Everyday Recipes (Cookbook)", "Journey of a Visionary (Biography)", "The Magical Realm (Fantasy)"],
        specs: ["Premium Quality Paperpack", "Collector Hardcover Edition", "Translated Worldwide Best Seller", "Revised Latest 2026 Edition", "Illustrative Diagrams Included"],
        images: [
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 149,
        maxPrice: 2499
    },
    "Gaming": {
        icon: `<span class="category-icon-wrapper" data-category="Gaming">${categoryIcons["Gaming"]}</span>`,
        tagline: "High-spec consoles, mechanical keyboards, gaming mice and accessories.",
        brands: ["Sony PS5", "Microsoft Xbox", "Nintendo", "Razer", "Logitech G", "Asus ROG", "MSI", "Corsair"],
        products: ["Wireless Dual Vibration Controller", "RGB Backlit Mechanical Keyboard", "Ultra-Lightweight Optical Gaming Mouse", "Surround Sound Gaming Headset", "Next-Gen Console Stand Charger", "Immersive VR Headset Bundle", "Full Tower PC Cabinet Shell", "Premium Speed Gaming Mousepad"],
        specs: ["Zero Latency Wireless 2.4Ghz", "Hot-swappable Custom Mechanical Switches", "Up to 26000 DPI Sensor Accuracy", "3D Spatial Audio Driver Engine", "Full Custom RGB Synced lighting"],
        images: [
            "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 899,
        maxPrice: 69999
    },
    "Sports": {
        icon: `<span class="category-icon-wrapper" data-category="Sports">${categoryIcons["Sports"]}</span>`,
        tagline: "Athletic gears, fitness equipment, balls and racquets.",
        brands: ["Decathlon", "Yonex", "Cosco", "Nivia", "Wilson", "Spalding", "Speedo", "Everlast"],
        products: ["Professional Match Football", "Carbon Fiber Badminton Racquet", "Anti-Slip Workout Yoga Mat", "Hexagonal Iron Dumbbell Set", "Anti-Fog Swimming Goggles Set", "Classic Synthetic Tennis Ball Tube", "Weighted Speed Skipping Rope", "Official Full-Size Basketball"],
        specs: ["Hand-Stitched Premium PU Outer", "High Tension Braided Strings", "Dual Layer Anti-Tear Foam Mat", "Ergonomic Sweat Resistant Handles", "Leak-Proof Air Retention Bladder"],
        images: [
            "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1519766304817-4f37bda74a27?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1530541930197-df16a4a682c4?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 199,
        maxPrice: 19999
    },
    "Automotive": {
        icon: `<span class="category-icon-wrapper" data-category="Automotive">${categoryIcons["Automotive"]}</span>`,
        tagline: "Keep your vehicles running and looking pristine with auto care.",
        brands: ["Bosch", "Michelin", "Castrol", "Philips Auto", "Pioneer", "Turtle Wax", "3M", "Goodyear"],
        products: ["All-Weather Tubeless Car Tyre", "Fully Synthetic Engine Oil 4L", "Super Bright LED Headlight Bulbs", "Premium Liquid Carnauba Wax", "Ultra-Soft Microfiber Towels Pack", "Touchscreen Bluetooth Car Stereo", "Ergonomic Leather Bike Riding Gloves", "Heavy Duty Portable Car Air Inflator"],
        specs: ["High Grip Wet & Dry Roads Tread", "Advanced Wear Protection Engine Formula", "Plug & Play Direct Fit Connector", "High Gloss Mirror-Like Paint Finish", "Fast Action Inflation, Digital Auto Cut"],
        images: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 299,
        maxPrice: 24999
    },
    "Baby": {
        icon: `<span class="category-icon-wrapper" data-category="Baby">${categoryIcons["Baby"]}</span>`,
        tagline: "Gentle baby products, organic food, apparel and toys.",
        brands: ["Himalaya Baby", "Johnson's", "Pampers", "LuvLap", "Chicco", "Sebamed", "Mee Mee", "Fisher-Price"],
        products: ["Ultra Comfort Tape Diapers", "Gentle Nourishing Baby Massage Oil", "Fragrance-Free Baby Wipes Tube", "Compact Folding Stroller Pram", "Anti-Colic Feeding Bottle Set", "Soft Plush Animal Teddy Toy", "Tear-Free Soft Baby Bath Wash", "Organic Baby Fruit Cereal Box"],
        specs: ["Hypoallergenic, Pediatrician Approved", "12-Hour Dryness Core Absorption", "Pure Organic Cotton Texture", "3-Point Safety Belt Harness System", "Non-Toxic Child-Safe BPA Free Plastic"],
        images: [
            "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 199,
        maxPrice: 11999
    },
    "Pets": {
        icon: `<span class="category-icon-wrapper" data-category="Pets">${categoryIcons["Pets"]}</span>`,
        tagline: "Keep your pets happy and healthy with our pet supplies.",
        brands: ["Pedigree", "Whiskas", "Drools", "Royal Canin", "Trixie", "Himalaya Pets", "Kong", "Choostix"],
        products: ["Complete Dry Dog Food Pack", "Rich Gravy Wet Cat Food Box", "Indestructible Rubber Dog Chew Toy", "Retractable Locking Pet Leash", "Odor Control Cat Litter Sand Bag", "Dual-Sided Pet Grooming Slicker Brush", "Calcium Rawhide Chewing Sticks", "Premium Aquarium Fish Food Flakes"],
        specs: ["Balanced Nutritional Formula", "High Protein Real Meat Bites", "Promotes Healthy Teeth & Oral Hygiene", "Extends up to 5 meters", "Super Clumping Low Dust Mineral Clay"],
        images: [
            "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1535268647977-a403b69fc756?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 99,
        maxPrice: 6999
    },
    "Grocery": {
        icon: `<span class="category-icon-wrapper" data-category="Grocery">${categoryIcons["Grocery"]}</span>`,
        tagline: "Fresh staples, pulses, spices and beverages delivered fast.",
        brands: ["Tata", "Fortune", "Aashirvaad", "Amul", "Nescafe", "Britannia", "Catch Spices", "Kellogg's"],
        products: ["Premium Rozana Basmati Rice", "Chakki Fresh Wheat Atta", "Refined Mustard Cooking Oil 1L", "Pure Buffalo Ghee Premium 1L", "Classic Roasted Instant Coffee Gold", "Crisp Digestive Butter Biscuits Pack", "Whole Spices Kitchen Combo Kit", "High Fiber Crunchy Muesli Box"],
        specs: ["Long Grain aromatic Taste", "100% Whole Wheat, No Added Maida", "Rich in Omega-3 Fats", "Freshly Sourced and Hygienically Packed", "No Added Preservatives or Artificial Colors"],
        images: [
            "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=400&q=80"
        ],
        minPrice: 49,
        maxPrice: 1999
    }
};

const categoryNames = Object.keys(categoryConfig);

function safeDecode(value) {
    try {
        return decodeURIComponent(String(value || ""));
    } catch (e) {
        return String(value || "");
    }
}

function categoryToSlug(category) {
    return safeDecode(category)
        .toLowerCase()
        .replace(/&/g, " ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function resolveCategory(categoryValue) {
    const decoded = safeDecode(categoryValue).trim();
    if (!decoded) return null;

    return categoryNames.find(category => category === decoded)
        || categoryNames.find(category => category.toLowerCase() === decoded.toLowerCase())
        || categoryNames.find(category => categoryToSlug(category) === categoryToSlug(decoded))
        || null;
}

function getCategoryUrl(category) {
    const resolved = resolveCategory(category);
    return `products.html?category=${encodeURIComponent(resolved || category)}`;
}

function getProductId(category, index) {
    return `${categoryToSlug(category)}-${index}`;
}

function getLegacyProductId(category, index) {
    return `${category.toLowerCase()}-${index}`;
}

function getProductDetailUrl(productId) {
    return `product-detail.html?id=${encodeURIComponent(productId)}`;
}

function escapeAttribute(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function hydrateCategoryIcons() {
    document.querySelectorAll(".category-icon-wrapper[data-category]").forEach(iconEl => {
        const category = resolveCategory(iconEl.dataset.category);
        if (category && categoryIcons[category]) {
            iconEl.dataset.category = category;
            iconEl.innerHTML = categoryIcons[category];
        }
    });
}

function renderCategoryNavbars() {
    const navHtml = categoryNames.map(category => {
        const safeCategory = escapeAttribute(category);
        return `<li><a href="${getCategoryUrl(category)}" class="category-link" data-category="${safeCategory}"><span class="category-icon-wrapper" data-category="${safeCategory}"></span>${category}</a></li>`;
    }).join("");

    document.querySelectorAll("#categoryNavList").forEach(list => {
        list.innerHTML = navHtml;
    });

    document.querySelectorAll(".category-navbar a.category-link").forEach(link => {
        const iconEl = link.querySelector(".category-icon-wrapper");
        const href = link.getAttribute("href") || "";
        const hrefCategory = href.includes("?")
            ? new URLSearchParams(href.split("?")[1]).get("category")
            : "";
        const category = resolveCategory(link.dataset.category || iconEl?.dataset.category || hrefCategory || link.textContent);

        if (category) {
            link.dataset.category = category;
            link.href = getCategoryUrl(category);
            if (iconEl) iconEl.dataset.category = category;
        }
    });
}

function highlightActiveCategory(activeCategory) {
    const resolved = resolveCategory(activeCategory);
    document.querySelectorAll(".category-navbar a.category-link").forEach(link => {
        const linkCategory = resolveCategory(link.dataset.category);
        const isActive = Boolean(resolved && linkCategory === resolved);
        link.classList.toggle("active", isActive);
        link.style.color = "";
        link.style.borderBottom = "";
        link.style.paddingBottom = "";

        if (isActive && typeof link.scrollIntoView === "function") {
            link.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
    });
}

function setupCategoryLinkAnimations() {
    if (window.__categoryLinkAnimationsReady) return;
    window.__categoryLinkAnimationsReady = true;

    document.addEventListener("click", (e) => {
        const link = e.target.closest(".category-link");
        if (!link) return;

        const icon = link.querySelector(".category-icon-wrapper");
        if (!icon) return;

        icon.classList.remove("animate-click");
        void icon.offsetWidth;
        icon.classList.add("animate-click");
    });
}

function populateCategorySelects() {
    document.querySelectorAll("select[data-category-options], #prodCategory").forEach(select => {
        const currentValue = select.value;
        select.innerHTML = categoryNames
            .map(category => `<option value="${escapeAttribute(category)}">${category}</option>`)
            .join("");

        const resolved = resolveCategory(currentValue);
        if (resolved) {
            select.value = resolved;
        }
    });
}

function setupSharedCategoryUI() {
    renderCategoryNavbars();
    hydrateCategoryIcons();
    setupCategoryLinkAnimations();
    populateCategorySelects();

    const currentCategory = new URLSearchParams(window.location.search).get("category")
        || document.body?.dataset?.category;
    if (currentCategory) {
        highlightActiveCategory(currentCategory);
    }
}

let activeCategory = "Mobiles";
let originalProducts = [];
let filteredProducts = [];
let activeFilters = {
    search: "",
    brands: [],
    maxPrice: 150000,
    ratings: [],
    inStockOnly: false
};
let activeSort = "popular";
let productsReady = false;

function syncProductSearchInputs(query, sourceInput = null) {
    document.querySelectorAll(".navbar .search-box input, #sidebarSearchInput").forEach(input => {
        if (input !== sourceInput) {
            input.value = query;
        }
    });
}

function setLiveProductSearch(query, sourceInput = null) {
    activeFilters.search = query || "";
    syncProductSearchInputs(activeFilters.search, sourceInput);

    if (productsReady) {
        applyFiltersAndSort();
    }

    return Boolean(document.getElementById("categoryProductGrid"));
}

// Expose data globally
window.categoryIcons = categoryIcons;
window.categoryConfig = categoryConfig;
window.categoryNames = categoryNames;
window.categoryToSlug = categoryToSlug;
window.resolveCategory = resolveCategory;
window.getCategoryUrl = getCategoryUrl;
window.getProductDetailUrl = getProductDetailUrl;
window.setupSharedCategoryUI = setupSharedCategoryUI;
window.setLiveProductSearch = setLiveProductSearch;

// Deterministic product generator
function generateProducts(category) {
    const config = categoryConfig[category];
    if (!config) return [];
    
    const items = [];
    for (let i = 1; i <= 50; i++) {
        const brand = config.brands[i % config.brands.length];
        const baseName = config.products[i % config.products.length];
        const spec = config.specs[i % config.specs.length];
        const name = `${brand} ${baseName} (${spec})`;
        
        const ratio = (i - 1) / 49;
        const price = Math.round(config.minPrice + (config.maxPrice - config.minPrice) * ratio);
        const discount = 10 + (i * 3) % 25;
        const rating = (3.8 + (i * 0.17) % 1.2).toFixed(1);
        const image = config.images[i % config.images.length];
        
        items.push({
            id: `${category.toLowerCase()}-${i}`,
            category: category,
            name: name,
            brand: brand,
            price: price,
            discount: discount,
            rating: rating,
            image: image,
            inStock: i % 10 !== 0
        });
    }
    return items;
}

// Find a single product across all inventory by ID
function findProductById(productId) {
    if (!productId) return null;
    const parts = productId.split("-");
    if (parts.length < 2) return null;
    
    const categoryKey = Object.keys(categoryConfig).find(k => k.toLowerCase() === parts[0]);
    if (!categoryKey) return null;
    
    const products = generateProducts(categoryKey);
    return products.find(p => p.id === productId);
}

// Generate all products from all categories
function generateAllProducts() {
    let all = [];
    Object.keys(categoryConfig).forEach(cat => {
        all = all.concat(generateProducts(cat));
    });
    return all;
}

window.generateProducts = generateProducts;
window.findProductById = findProductById;
window.generateAllProducts = generateAllProducts;

// Setup Brand Checkboxes in Sidebar
function buildBrandCheckboxes(brands) {
    const container = document.getElementById("brandFiltersContainer");
    if (!container) return;
    
    let html = "";
    brands.forEach(brand => {
        html += `<label><input type="checkbox" class="brand-filter" value="${brand}"> ${brand}</label>`;
    });
    container.innerHTML = html;
}

// Render dynamic product grid HTML cards
function renderProductGrid() {
    const grid = document.getElementById("categoryProductGrid");
    const emptyState = document.getElementById("emptyState");
    if (!grid) return;

    if (filteredProducts.length === 0) {
        grid.innerHTML = "";
        if (emptyState) emptyState.classList.remove("hidden-state");
        return;
    }

    if (emptyState) emptyState.classList.add("hidden-state");

    let html = "";
    filteredProducts.forEach(product => {
        const ratingVal = parseFloat(product.rating);
        let starStr = "";
        for (let s = 1; s <= 5; s++) {
            if (s <= ratingVal) starStr += "⭐";
            else if (s - 0.5 <= ratingVal) starStr += "⭐"; // Simplified
        }
        
        const originalPrice = Math.round(product.price / (1 - product.discount/100));

        html += `
            <div class="product-card" data-id="${product.id}">
                <a href="product-detail.html?id=${product.id}" class="product-link" style="text-decoration:none; color:inherit;">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                </a>
                <p class="price">
                    ₹${product.price.toLocaleString()} 
                    <span style="font-size:12px; font-weight:normal; text-decoration:line-through; color:#94a3b8; background:none; box-shadow:none; padding:0; margin-left:5px;">₹${originalPrice.toLocaleString()}</span>
                    <span>-${product.discount}%</span>
                </p>
                <div class="rating">${starStr} <span style="font-size:12px; color:#64748b; font-weight:normal;">(${product.rating})</span></div>
                <div class="stock-status ${product.inStock ? 'stock' : 'out-of-stock'}" style="font-size:13px; font-weight:600; margin-bottom:12px; color:${product.inStock ? 'var(--green-success)' : 'var(--red-discount)'};">
                    ${product.inStock ? '● In Stock' : '✕ Out of Stock'}
                </div>
                <button class="wishlist-btn">❤ Wishlist</button>
                <button class="cart-btn" ${!product.inStock ? 'disabled' : ''}>🛒 Add to Cart</button>
                <button class="buy-btn" ${!product.inStock ? 'disabled' : ''} onclick="buyNowRedirect('${product.id}')">Buy Now</button>
            </div>
        `;
    });
    grid.innerHTML = html;
    
    // Sync active heart badges on newly loaded cards
    if (window.syncHeartButtonsOnLoad) window.syncHeartButtonsOnLoad();
}

window.buyNowRedirect = function(productId) {
    const product = findProductById(productId);
    if (product && window.addToCart) {
        window.addToCart(product, 1);
        window.location.href = "checkout.html";
    }
};

// Filter & Sort Logic
function applyFiltersAndSort() {
    let results = [...originalProducts];

    // Filter 1: Search term matching
    if (activeFilters.search.trim()) {
        const query = activeFilters.search.toLowerCase().trim();
        results = results.filter(p => {
            const searchableText = `${p.name || ""} ${p.brand || ""} ${p.category || ""}`.toLowerCase();
            return searchableText.includes(query);
        });
    }

    // Filter 2: Brand checklists
    if (activeFilters.brands.length > 0) {
        results = results.filter(p => activeFilters.brands.includes(p.brand));
    }

    // Filter 3: Price slider max
    results = results.filter(p => p.price <= activeFilters.maxPrice);

    // Filter 4: Ratings checks
    if (activeFilters.ratings.length > 0) {
        // Find minimum rated criteria checked (e.g. checked [4, 3] -> min rating is 3)
        const minRatingChecked = Math.min(...activeFilters.ratings);
        results = results.filter(p => parseFloat(p.rating) >= minRatingChecked);
    }

    // Filter 5: Stock availability checkbox
    if (activeFilters.inStockOnly) {
        results = results.filter(p => p.inStock);
    }

    // Sort operations
    if (activeSort === "priceLowHigh") {
        results.sort((a, b) => a.price - b.price);
    } else if (activeSort === "priceHighLow") {
        results.sort((a, b) => b.price - a.price);
    } else if (activeSort === "discount") {
        results.sort((a, b) => b.discount - a.discount);
    } else if (activeSort === "rating") {
        results.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else {
        // default 'popularity' - random mock popularity
        results.sort((a, b) => (parseInt(a.id.split("-")[1]) % 7) - (parseInt(b.id.split("-")[1]) % 7));
    }

    filteredProducts = results;
    
    // Update count labels
    const countText = document.getElementById("productCountText");
    if (countText) {
        countText.innerText = `Showing ${filteredProducts.length} of ${originalProducts.length} products`;
    }

    renderProductGrid();
}

// Setup Page Listeners
function setupEventListeners() {
    // Brand checklists change
    document.addEventListener("change", (e) => {
        if (e.target.classList.contains("brand-filter")) {
            const checkedBrands = [];
            document.querySelectorAll(".brand-filter:checked").forEach(cb => {
                checkedBrands.push(cb.value);
            });
            activeFilters.brands = checkedBrands;
            applyFiltersAndSort();
        }
    });

    // Sidebar search changes
    const sidebarSearch = document.getElementById("sidebarSearchInput");
    if (sidebarSearch) {
        sidebarSearch.addEventListener("input", () => {
            setLiveProductSearch(sidebarSearch.value, sidebarSearch);
        });
    }

    // Price Slider Input sliding
    const priceRangeInput = document.getElementById("priceRangeInput");
    const priceValLabel = document.getElementById("priceValLabel");
    if (priceRangeInput) {
        priceRangeInput.addEventListener("input", () => {
            const val = parseInt(priceRangeInput.value);
            activeFilters.maxPrice = val;
            if (priceValLabel) priceValLabel.innerText = `₹${val.toLocaleString()}`;
            applyFiltersAndSort();
        });
    }

    // Ratings checkers changes
    document.querySelectorAll(".rating-filter").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const checkedRatings = [];
            document.querySelectorAll(".rating-filter:checked").forEach(cb => {
                checkedRatings.push(parseInt(cb.value));
            });
            activeFilters.ratings = checkedRatings;
            applyFiltersAndSort();
        });
    });

    // In Stock Only change
    const stockFilter = document.getElementById("stockFilter");
    if (stockFilter) {
        stockFilter.addEventListener("change", () => {
            activeFilters.inStockOnly = stockFilter.checked;
            applyFiltersAndSort();
        });
    }

    // Sort select change
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
        sortSelect.addEventListener("change", () => {
            activeSort = sortSelect.value;
            applyFiltersAndSort();
        });
    }

    // Clear filters button
    const clearFiltersBtn = document.getElementById("clearFiltersBtn");
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener("click", () => {
            // Reset filters state
            activeFilters.search = "";
            activeFilters.brands = [];
            activeFilters.ratings = [];
            activeFilters.inStockOnly = false;
            
            const minVal = Math.min(...originalProducts.map(p => p.price));
            const maxVal = Math.max(...originalProducts.map(p => p.price));
            activeFilters.maxPrice = maxVal;

            // Reset inputs
            if (sidebarSearch) sidebarSearch.value = "";
            syncProductSearchInputs("");
            if (stockFilter) stockFilter.checked = false;
            if (priceRangeInput) {
                priceRangeInput.value = maxVal;
                if (priceValLabel) priceValLabel.innerText = `₹${maxVal.toLocaleString()}`;
            }
            document.querySelectorAll(".brand-filter:checked").forEach(cb => cb.checked = false);
            document.querySelectorAll(".rating-filter:checked").forEach(cb => cb.checked = false);

            // Pulse effect
            clearFiltersBtn.classList.add("is-clearing");
            setTimeout(() => {
                clearFiltersBtn.classList.remove("is-clearing");
                clearFiltersBtn.classList.add("filters-cleared");
                setTimeout(() => clearFiltersBtn.classList.remove("filters-cleared"), 1000);
            }, 500);

            applyFiltersAndSort();
        });
    }

    // Mobile Filters Sidebar Toggle
    const filterToggleBtn = document.getElementById("filterToggleBtn");
    const closeFiltersBtn = document.getElementById("closeFiltersBtn");
    const filterSidebar = document.getElementById("filterSidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (filterToggleBtn && filterSidebar && sidebarOverlay) {
        filterToggleBtn.addEventListener("click", () => {
            filterSidebar.classList.add("mobile-active");
            sidebarOverlay.classList.add("active");
            document.body.classList.add("filter-panel-open");
        });

        const hideSidebar = () => {
            filterSidebar.classList.remove("mobile-active");
            sidebarOverlay.classList.remove("active");
            document.body.classList.remove("filter-panel-open");
        };

        if (closeFiltersBtn) closeFiltersBtn.addEventListener("click", hideSidebar);
        sidebarOverlay.addEventListener("click", hideSidebar);
    }
}

// Initial Loading calling backend API
document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("categoryProductGrid")) return;

    // Bind dynamic category/search parameters
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get("category");
    const searchParam = urlParams.get("search");

    let fetchUrl = 'http://localhost:8000/api/products/';
    
    if (searchParam) {
        // GLOBAL SEARCH MODE
        activeFilters.search = searchParam;
        
        const titleEl = document.getElementById("heroTitle");
        if (titleEl) titleEl.innerHTML = `<i class="fas fa-search" style="margin-right:10px;"></i> Search Results`;
        const tagEl = document.getElementById("heroTagline");
        if (tagEl) tagEl.innerText = `Showing results for "${searchParam}"`;
        document.title = `ApNASHOp - Search: ${searchParam}`;

        syncProductSearchInputs(searchParam);
    } else {
        // CATEGORY VIEW MODE
        if (catParam && categoryConfig[catParam]) {
            activeCategory = catParam;
        } else {
            activeCategory = "Mobiles";
        }
        fetchUrl += `?category=${encodeURIComponent(activeCategory)}`;

        const config = categoryConfig[activeCategory];
        const titleEl = document.getElementById("heroTitle");
        if (titleEl) titleEl.innerHTML = `${config.icon} ${activeCategory}`;
        const tagEl = document.getElementById("heroTagline");
        if (tagEl) tagEl.innerText = config.tagline;
        document.title = `ApNASHOp - Shop ${activeCategory}`;
        
        // Highlight active navbar item
        document.querySelectorAll(".category-navbar a").forEach(link => {
            if (link.getAttribute("href").includes(`category=${activeCategory}`)) {
                link.style.color = "var(--orange-primary)";
                link.style.borderBottom = "2.5px solid var(--orange-primary)";
                link.style.paddingBottom = "4px";
            }
        });
    }

    // Perform Fetch from Backend API
    fetch(fetchUrl)
    .then(res => res.json())
    .then(data => {
        if (data.success && data.products) {
            originalProducts = data.products;
        } else {
            console.warn("Backend products fetch failed or empty, falling back to local simulation.");
            originalProducts = searchParam ? generateAllProducts() : generateProducts(activeCategory);
        }
        initializeUIAndFilters();
    })
    .catch(err => {
        console.error("Error fetching products from backend:", err);
        // Fallback for offline/standalone execution
        originalProducts = searchParam ? generateAllProducts() : generateProducts(activeCategory);
        initializeUIAndFilters();
    });

    function initializeUIAndFilters() {
        // Initialize brand list based on inventory
        const uniqueBrands = [...new Set(originalProducts.map(p => p.brand))];
        buildBrandCheckboxes(uniqueBrands);

        // Setup Slider parameters
        const minVal = originalProducts.length > 0 ? Math.min(...originalProducts.map(p => p.price)) : 0;
        const maxVal = originalProducts.length > 0 ? Math.max(...originalProducts.map(p => p.price)) : 150000;
        const priceRangeInput = document.getElementById("priceRangeInput");
        if (priceRangeInput) {
            priceRangeInput.min = minVal;
            priceRangeInput.max = maxVal;
            priceRangeInput.value = maxVal;
        }
        activeFilters.maxPrice = maxVal;

        const minLabel = document.getElementById("priceMinLabel");
        if (minLabel) minLabel.innerText = `₹${minVal.toLocaleString()}`;
        const maxLabel = document.getElementById("priceValLabel");
        if (maxLabel) maxLabel.innerText = `₹${maxVal.toLocaleString()}`;

        // Hook listeners and apply sorting
        productsReady = true;
        syncProductSearchInputs(activeFilters.search);
        setupEventListeners();
        applyFiltersAndSort();
    }
});
