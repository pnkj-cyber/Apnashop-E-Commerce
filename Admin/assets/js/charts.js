/* Reusable Reports Charts Renderer */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('report-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Determine the report type based on the page title
    const pageTitle = document.querySelector('.page-title-text')?.innerText || 'Report';
    
    let chartType = 'bar';
    let labels = [];
    let datasetLabel = '';
    let dataPoints = [];
    let colorTheme = '#3b82f6';
    
    if (pageTitle.includes('Sales')) {
        chartType = 'line';
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        datasetLabel = 'Revenue ($)';
        dataPoints = [1200, 1900, 3200, 5000, 2900, 6200, 7500];
        colorTheme = '#10b981'; // Green
    } else if (pageTitle.includes('Order')) {
        chartType = 'bar';
        labels = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returns'];
        datasetLabel = 'Order Count';
        dataPoints = [10, 24, 45, 124, 14, 8];
        colorTheme = '#f59e0b'; // Amber
    } else if (pageTitle.includes('Customer')) {
        chartType = 'line';
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        datasetLabel = 'New Customers';
        dataPoints = [45, 80, 120, 167];
        colorTheme = '#3b82f6'; // Blue
    } else if (pageTitle.includes('Inventory')) {
        chartType = 'bar';
        labels = ['Electronics', 'Laptops', 'Wearables', 'Shoes', 'Apparel'];
        datasetLabel = 'In Stock Items';
        dataPoints = [420, 190, 850, 120, 1430];
        colorTheme = '#6366f1'; // Indigo
    } else if (pageTitle.includes('Revenue')) {
        chartType = 'line';
        labels = ['Q1', 'Q2', 'Q3', 'Q4'];
        datasetLabel = 'Net Revenue ($)';
        dataPoints = [45000, 58000, 72000, 115000];
        colorTheme = '#10b981';
    } else {
        chartType = 'bar';
        labels = ['Tax Paid', 'Tax Owed', 'Deductions'];
        datasetLabel = 'Tax Value ($)';
        dataPoints = [8400, 1200, 3100];
        colorTheme = '#ef4444'; // Red
    }
    
    // Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, hexToRgba(colorTheme, 0.2));
    gradient.addColorStop(1, hexToRgba(colorTheme, 0.0));
    
    new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: datasetLabel,
                data: dataPoints,
                borderColor: colorTheme,
                backgroundColor: chartType === 'line' ? gradient : colorTheme,
                borderWidth: 2,
                borderRadius: chartType === 'bar' ? 6 : 0,
                fill: chartType === 'line',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: { family: 'Outfit', size: 12 }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { family: 'Outfit', size: 11 }, color: '#64748b' }
                },
                y: {
                    grid: { color: '#f1f5f9' },
                    ticks: { font: { family: 'Outfit', size: 11 }, color: '#64748b' }
                }
            }
        }
    });
});

// Helper hex to RGBA
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
