/* Customers Database Actions */

document.addEventListener('DOMContentLoaded', () => {
    initCustomersTable();
});

const initCustomersTable = () => {
    const tbody = document.getElementById('table-body-rows');
    if (!tbody || !window.location.pathname.includes('/customers/')) return;
    
    const pageTitle = document.querySelector('.page-title-text')?.innerText || 'All Customers';
    
    const mockCustomers = [
        { id: "CUST-3091", name: "Amara Singh", email: "amara@gmail.com", orders: 12, spent: "$1,842.00", status: "active", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=80&auto=format&fit=crop" },
        { id: "CUST-3092", name: "Jonathan Clark", email: "clark.j@outlook.com", orders: 8, spent: "$959.00", status: "active", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80&auto=format&fit=crop" },
        { id: "CUST-3093", name: "Sophie Dubois", email: "sophie.d@gmail.com", orders: 15, spent: "$3,430.00", status: "active", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80&auto=format&fit=crop" },
        { id: "CUST-3094", name: "Clara Oswald", email: "clara.o@yahoo.com", orders: 5, spent: "$412.00", status: "blocked", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=80&auto=format&fit=crop" },
        { id: "CUST-3095", name: "Hassan Al-Fayed", email: "hassan.f@gmail.com", orders: 20, spent: "$5,240.00", status: "active", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=80&auto=format&fit=crop" }
    ];
    
    let filteredCustomers = [...mockCustomers];
    if (pageTitle.includes('Blocked')) {
        filteredCustomers = mockCustomers.filter(c => c.status === 'blocked');
    }
    
    tbody.innerHTML = filteredCustomers.map(c => `
        <tr>
            <td><input type="checkbox" class="table-row-checkbox"></td>
            <td><span style="font-weight:600;">${c.id}</span></td>
            <td>
                <div class="table-item-profile">
                    <img src="${c.avatar}" class="table-item-image" style="border-radius:50%;" alt="${c.name}">
                    <div class="table-item-meta">
                        <span class="table-item-title">${c.name}</span>
                        <span class="table-item-subtitle" style="font-size:0.8rem; text-transform:none; letter-spacing:0;">${c.email}</span>
                    </div>
                </div>
            </td>
            <td><span style="font-weight:500;">${c.orders} Orders</span></td>
            <td><span style="font-weight:700;">${c.spent}</span></td>
            <td>
                <span class="badge ${c.status === 'active' ? 'badge-success' : 'badge-danger'}">
                    ${c.status.toUpperCase()}
                </span>
            </td>
            <td>
                <div class="actions-cell-group">
                    <a href="customer-details.html" class="action-row-btn" title="View Details"><i class="ri-user-search-line"></i></a>
                    <button class="action-row-btn delete-action" title="${c.status === 'active' ? 'Block Customer' : 'Unblock Customer'}" onclick="toggleBlockCustomer('${c.id}', '${c.status}')">
                        <i class="${c.status === 'active' ? 'ri-user-unfollow-line' : 'ri-user-follow-line'}"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
};

window.toggleBlockCustomer = (id, currentStatus) => {
    const action = currentStatus === 'active' ? 'block' : 'unblock';
    if (confirm(`Are you sure you want to ${action} customer ${id}?`)) {
        alert(`Customer ${id} has been ${action}ed.`);
        window.location.reload();
    }
};
