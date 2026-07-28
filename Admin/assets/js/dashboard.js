/* Dashboard Page Logic & Chart Initializations */

document.addEventListener('DOMContentLoaded', () => {
    // Only run if chart canvas exists
    const chartCanvas = document.getElementById('sales-report-chart-canvas');
    if (!chartCanvas) return;
    
    // Initialize Dashboard Elements
    initMetricsCounters();
    initSalesChart(chartCanvas);
    initProductCarousel();
});

// Animate numbers count-up on load
const initMetricsCounters = () => {
    const counters = document.querySelectorAll('.metric-big-number');
    counters.forEach(counter => {
        const valStr = counter.innerText.replace(/[^0-9]/g, '');
        const targetVal = parseInt(valStr, 10);
        if (isNaN(targetVal)) return;
        
        let startVal = 0;
        const duration = 1200; // ms
        const steps = 60;
        const stepTime = duration / steps;
        const increment = Math.ceil(targetVal / steps);
        
        const isPrice = counter.innerText.startsWith('$');
        
        const timer = setInterval(() => {
            startVal += increment;
            if (startVal >= targetVal) {
                startVal = targetVal;
                clearInterval(timer);
            }
            
            if (isPrice) {
                counter.innerText = `$${startVal.toLocaleString()}`;
            } else {
                counter.innerText = startVal.toLocaleString();
            }
        }, stepTime);
    });
};

// Double line Chart.js initialization
let salesChartInstance = null;
const initSalesChart = (canvas) => {
    const ctx = canvas.getContext('2d');
    
    // Gradient fills
    const gradientBlue = ctx.createLinearGradient(0, 0, 0, 300);
    gradientBlue.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
    gradientBlue.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
    
    const gradientOrange = ctx.createLinearGradient(0, 0, 0, 300);
    gradientOrange.addColorStop(0, 'rgba(249, 115, 22, 0.12)');
    gradientOrange.addColorStop(1, 'rgba(249, 115, 22, 0.0)');
    
    // Monthly data matching screenshot
    const chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const transactionsData = [120, 150, 140, 180, 160, 210, 190, 222, 250, 210, 230, 240];
    const productsData = [35, 45, 40, 50, 42, 58, 38, 44, 60, 48, 52, 55];
    
    const tooltipEl = document.getElementById('chart-tooltip-bubble');
    
    salesChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [
                {
                    label: 'Transactions',
                    data: transactionsData,
                    borderColor: '#3b82f6', // blue
                    borderWidth: 2.5,
                    pointBackgroundColor: '#3b82f6',
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#3b82f6',
                    pointHoverBorderWidth: 3,
                    pointHoverRadius: 6,
                    pointRadius: 0, // hide default points except on hover
                    fill: true,
                    backgroundColor: gradientBlue,
                    tension: 0.4
                },
                {
                    label: 'Product',
                    data: productsData,
                    borderColor: '#f97316', // orange
                    borderWidth: 2,
                    pointBackgroundColor: '#f97316',
                    pointHoverBackgroundColor: '#ffffff',
                    pointHoverBorderColor: '#f97316',
                    pointHoverBorderWidth: 3,
                    pointHoverRadius: 6,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: gradientOrange,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // hidden legend as matching header dropdown UI
                },
                tooltip: {
                    enabled: false, // disable default HTML tooltips
                    external: function(context) {
                        const { chart, tooltip } = context;
                        
                        if (tooltip.opacity === 0) {
                            tooltipEl.style.opacity = 0;
                            return;
                        }
                        
                        // Set text inside custom tooltip bubble
                        if (tooltip.body) {
                            const titleLines = tooltip.title || [];
                            
                            // Find matching transaction & product values
                            const transactionIndex = tooltip.dataPoints[0].dataIndex;
                            const tVal = transactionsData[transactionIndex];
                            const pVal = productsData[transactionIndex];
                            
                            const dateLabel = titleLines[0] ? `14 ${titleLines[0]} 2023` : '14 Aug 2023';
                            
                            tooltipEl.innerHTML = `
                                <div class="tooltip-date">${dateLabel}</div>
                                <div class="tooltip-row-item">
                                    <span class="tooltip-bullet-indicator" style="background-color:#3b82f6;"></span>
                                    <span>Transactions: <span class="tooltip-value-bold">${tVal}</span></span>
                                </div>
                                <div class="tooltip-row-item">
                                    <span class="tooltip-bullet-indicator" style="background-color:#f97316;"></span>
                                    <span>Product: <span class="tooltip-value-bold">${pVal}</span></span>
                                </div>
                            `;
                        }
                        
                        // Position custom tooltip bubble
                        const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
                        
                        tooltipEl.style.opacity = 1;
                        tooltipEl.style.left = positionX + tooltip.caretX + 'px';
                        tooltipEl.style.top = positionY + tooltip.caretY + 'px';
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Outfit',
                            size: 11
                        },
                        color: '#94a3b8'
                    }
                },
                y: {
                    grid: {
                        color: '#f1f5f9',
                        drawBorder: false
                    },
                    ticks: {
                        display: false // hide y-axis numbers matching screenshot
                    }
                }
            }
        }
    });
    
    // Highlight August index (7) on load to mirror screenshot tooltip display
    setTimeout(() => {
        if (salesChartInstance && salesChartInstance.tooltip) {
            const meta = salesChartInstance.getDatasetMeta(0);
            const point = meta.data[7]; // index 7 = Aug
            
            // Set tooltip active elements
            salesChartInstance.tooltip.setActiveElements([
                { datasetIndex: 0, index: 7 },
                { datasetIndex: 1, index: 7 }
            ], {
                x: point.x,
                y: point.y
            });
            salesChartInstance.update();
        }
    }, 800);
    
    // Interactivity: Timeframe Pills Selector clicks
    const pills = document.querySelectorAll('.timeframe-pill-btn');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            // Generate mock transaction updates
            const scope = pill.innerText;
            const amtHeadline = document.getElementById('sales-headline-amount-text');
            
            let mockAmount = 4435.70;
            let mockTrend = '+2.5%';
            let mockDataOffset = 0;
            
            if (scope === '1d') {
                mockAmount = 840.00;
                mockTrend = '+1.1%';
                mockDataOffset = -50;
            } else if (scope === '30d') {
                mockAmount = 18630.90;
                mockTrend = '+4.8%';
                mockDataOffset = 120;
            } else if (scope === '16m') {
                mockAmount = 89430.00;
                mockTrend = '-0.8%';
                mockDataOffset = 300;
            } else if (scope === 'Max') {
                mockAmount = 132430.50;
                mockTrend = '+12.4%';
                mockDataOffset = 500;
            }
            
            // Animate dollar amount text
            if (amtHeadline) {
                amtHeadline.innerText = `$${mockAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            }
            
            // Update chart data
            const offsetTransactions = transactionsData.map(val => Math.max(20, val + mockDataOffset));
            salesChartInstance.data.datasets[0].data = offsetTransactions;
            salesChartInstance.update();
        });
    });
};

// Congratulations product slider carousel logic
const initProductCarousel = () => {
    // Array of top sold products
    const products = [
        {
            name: "T-shirt Rainbow White",
            sold: "271 sold",
            image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=150&auto=format&fit=crop"
        },
        {
            name: "Huzzle black cap",
            sold: "189 sold",
            image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=150&auto=format&fit=crop"
        },
        {
            name: "Crop top pants",
            sold: "142 sold",
            image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=150&auto=format&fit=crop"
        }
    ];
    
    let activeIndex = 0;
    const nameEl = document.getElementById('carousel-item-name');
    const soldEl = document.getElementById('carousel-item-sold');
    const imgEl = document.getElementById('carousel-item-image-source');
    
    const prevBtn = document.getElementById('carousel-prev-slide');
    const nextBtn = document.getElementById('carousel-next-slide');
    
    const renderSlide = (index) => {
        // Fade out animation transition
        const container = document.querySelector('.carousel-slide-content');
        if (container) {
            container.style.opacity = 0;
            container.style.transform = 'translateY(4px)';
            
            setTimeout(() => {
                const prod = products[index];
                nameEl.innerText = prod.name;
                soldEl.innerText = prod.sold;
                imgEl.src = prod.image;
                imgEl.alt = prod.name;
                
                container.style.opacity = 1;
                container.style.transform = 'translateY(0)';
            }, 200);
        }
    };
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            activeIndex--;
            if (activeIndex < 0) {
                activeIndex = products.length - 1;
            }
            renderSlide(activeIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            activeIndex++;
            if (activeIndex >= products.length) {
                activeIndex = 0;
            }
            renderSlide(activeIndex);
        });
    }
};
