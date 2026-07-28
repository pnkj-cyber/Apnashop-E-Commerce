/* Orders Database Actions */

document.addEventListener('DOMContentLoaded', () => {
    initOrdersTable();
});

const initOrdersTable = () => {
    const tbody = document.getElementById('table-body-rows');
    if (!tbody || !window.location.pathname.includes('/orders/')) return;
    
    // Check page title to filter mock data
    const pageTitle = document.querySelector('.page-title-text')?.innerText || 'All Orders';
    
    const mockOrders = [
        { id: "ORD-7011", customer: "Jonathan Clark", items: "1x Crop top pants", date: "12 Feb 2026", price: "$599.00", status: "delivered", platform: "Shopee" },
        { id: "ORD-7012", customer: "Amara Singh", items: "2x T-shirt rainbow white", date: "10 Feb 2026", price: "$98.00", status: "pending", platform: "Tokopedia" },
        { id: "ORD-7013", customer: "Hassan Al-Fayed", items: "1x Huzzle black cap", date: "09 Feb 2026", price: "$109.00", status: "processing", platform: "Tokopedia" },
        { id: "ORD-7014", customer: "Clara Oswald", items: "1x Smart leather watch", date: "05 Feb 2026", price: "$299.00", status: "shipped", platform: "Tiktok" },
        { id: "ORD-7015", customer: "David Miller", items: "1x Running lightweight shoes", date: "02 Feb 2026", price: "$189.00", status: "cancelled", platform: "Shopee" },
        { id: "ORD-7016", customer: "Sophie Dubois", items: "1x Crop top pants", date: "01 Feb 2026", price: "$599.00", status: "returned", platform: "Tiktok" }
    ];
    
    // Filter items based on active sub-category page
    let filteredOrders = [...mockOrders];
    if (pageTitle.includes('Pending')) {
        filteredOrders = mockOrders.filter(o => o.status === 'pending');
    } else if (pageTitle.includes('Processing')) {
        filteredOrders = mockOrders.filter(o => o.status === 'processing');
    } else if (pageTitle.includes('Shipped')) {
        filteredOrders = mockOrders.filter(o => o.status === 'shipped');
    } else if (pageTitle.includes('Delivered')) {
        filteredOrders = mockOrders.filter(o => o.status === 'delivered');
    } else if (pageTitle.includes('Cancelled')) {
        filteredOrders = mockOrders.filter(o => o.status === 'cancelled');
    } else if (pageTitle.includes('Return')) {
        filteredOrders = mockOrders.filter(o => o.status === 'returned');
    }
    
    tbody.innerHTML = filteredOrders.map(o => `
        <tr>
            <td><input type="checkbox" class="table-row-checkbox"></td>
            <td><span style="font-weight:600;">${o.id}</span></td>
            <td>
                <div class="table-item-profile">
                    <div class="table-item-meta">
                        <span class="table-item-title">${o.customer}</span>
                        <span class="table-item-subtitle">${o.items}</span>
                    </div>
                </div>
            </td>
            <td style="color: var(--text-muted);">${o.date}</td>
            <td><span style="font-weight:700;">${o.price}</span></td>
            <td>
                <span class="badge ${getStatusBadgeClass(o.status)}">
                    ${o.status.toUpperCase()}
                </span>
            </td>
            <td>
                <div class="actions-cell-group">
                    <a href="order-details.html" class="action-row-btn" title="Invoice"><i class="ri-article-line"></i></a>
                    <button class="action-row-btn" title="Ship / Deliver" onclick="updateOrderStatus('${o.id}', '${o.status}')"><i class="ri-truck-line"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
};

const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'pending': return 'badge-warning';
        case 'processing': return 'badge-info';
        case 'shipped': return 'badge-info';
        case 'delivered': return 'badge-success';
        case 'cancelled': return 'badge-danger';
        case 'returned': return 'badge-danger';
        default: return 'badge-secondary';
    }
};

window.updateOrderStatus = (orderId, currentStatus) => {
    const nextStatus = currentStatus === 'pending' ? 'processing' : currentStatus === 'processing' ? 'shipped' : 'delivered';
    if (confirm(`Advance status of ${orderId} from "${currentStatus}" to "${nextStatus}"?`)) {
        alert(`Order ${orderId} updated to: ${nextStatus.toUpperCase()}`);
        window.location.reload();
    }
};
