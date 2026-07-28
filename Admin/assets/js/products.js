/* Product Management Actions */

document.addEventListener('DOMContentLoaded', () => {
    initProductTableRows();
    initVariantsSetup();
    initFileUploads();
    initFormActions();
});

// Interactive delete buttons and product check toggling
const initProductTableRows = () => {
    // Fill mockup rows for products.html
    const tbody = document.getElementById('table-body-rows');
    if (!tbody || !window.location.pathname.endsWith('products.html')) return;
    
    const mockProducts = [
        { id: "PROD-9021", name: "Crop top pants", category: "Apparel", date: "12 Feb 2026", price: "$599.00", status: "active", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=100&auto=format&fit=crop" },
        { id: "PROD-9022", name: "T-shirt rainbow white", category: "Apparel", date: "10 Feb 2026", price: "$49.00", status: "active", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=100&auto=format&fit=crop" },
        { id: "PROD-9023", name: "Huzzle black cap", category: "Wearables", date: "09 Feb 2026", price: "$109.00", status: "active", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=100&auto=format&fit=crop" },
        { id: "PROD-9024", name: "Smart leather watch", category: "Wearables", date: "05 Feb 2026", price: "$299.00", status: "draft", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=100&auto=format&fit=crop" },
        { id: "PROD-9025", name: "Running lightweight shoes", category: "Shoes", date: "02 Feb 2026", price: "$189.00", status: "active", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100&auto=format&fit=crop" }
    ];
    
    tbody.innerHTML = mockProducts.map(p => `
        <tr>
            <td><input type="checkbox" class="table-row-checkbox"></td>
            <td><span style="font-weight:600;">${p.id}</span></td>
            <td>
                <div class="table-item-profile">
                    <img src="${p.img}" class="table-item-image" alt="${p.name}">
                    <div class="table-item-meta">
                        <span class="table-item-title">${p.name}</span>
                        <span class="table-item-subtitle">${p.category}</span>
                    </div>
                </div>
            </td>
            <td style="color: var(--text-muted);">${p.date}</td>
            <td><span style="font-weight:700;">${p.price}</span></td>
            <td>
                <span class="badge ${p.status === 'active' ? 'badge-success' : 'badge-warning'}">
                    ${p.status.toUpperCase()}
                </span>
            </td>
            <td>
                <div class="actions-cell-group">
                    <a href="product-details.html" class="action-row-btn" title="View"><i class="ri-eye-line"></i></a>
                    <a href="edit-product.html" class="action-row-btn" title="Edit"><i class="ri-edit-line"></i></a>
                    <button class="action-row-btn delete-action" title="Delete" onclick="deleteProductRow(this, '${p.name}')"><i class="ri-delete-bin-line"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Wire up delete-btn events
    const addBtn = document.getElementById('add-btn-action');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            window.location.href = 'add-product.html';
        });
    }
};

window.deleteProductRow = (btn, name) => {
    if (confirm(`Are you sure you want to delete "${name}" from ApnaShop products?`)) {
        const row = btn.closest('tr');
        if (row) {
            row.style.transform = 'scale(0.9)';
            row.style.opacity = '0';
            setTimeout(() => {
                row.remove();
                alert(`Product "${name}" deleted.`);
            }, 300);
        }
    }
};

// Dynamic Option Row insertion in product-variants.html
const initVariantsSetup = () => {
    const addOptBtn = document.getElementById('add-variant-option-btn');
    const container = document.getElementById('variants-setup-rows');
    if (!addOptBtn || !container) return;
    
    addOptBtn.addEventListener('click', () => {
        const div = document.createElement('div');
        div.className = 'variant-option-row animate-fade-in';
        div.innerHTML = `
            <div class="form-group-item">
                <label class="form-label-text">Option Name</label>
                <input type="text" class="form-input-element" placeholder="e.g. Color">
            </div>
            <div class="form-group-item" style="flex: 2;">
                <label class="form-label-text">Option Values</label>
                <input type="text" class="form-input-element" placeholder="e.g. Blue, Red, Green">
            </div>
            <button class="btn btn-icon-only text-danger mt-6" onclick="this.parentElement.remove()"><i class="ri-delete-bin-line"></i></button>
        `;
        container.appendChild(div);
    });
};

// Mock drag and drop file upload highlights
const initFileUploads = () => {
    const uploadArea = document.querySelector('.gallery-drag-drop-area');
    if (!uploadArea) return;
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--accent-blue)';
            uploadArea.style.backgroundColor = 'var(--accent-blue-light)';
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--border-color-hover)';
            uploadArea.style.backgroundColor = 'var(--bg-primary)';
        }, false);
    });
    
    uploadArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            alert(`Detected ${files.length} file(s) dropped!`);
        }
    });
};

// Form Save events
const initFormActions = () => {
    const saveBtn = document.getElementById('save-form-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            saveBtn.innerHTML = '<i class="ri-loader-4-line" style="animation: spin 1s infinite linear;"></i> Saving...';
            saveBtn.disabled = true;
            setTimeout(() => {
                alert('Changes saved successfully!');
                saveBtn.innerHTML = 'Save Changes';
                saveBtn.disabled = false;
                window.history.back();
            }, 800);
        });
    }
};
