// DOM Elements
const phone1Select = document.getElementById('phone1');
const phone2Select = document.getElementById('phone2');
const comparisonResult = document.getElementById('comparison-result');

// API endpoints
const API_BASE_URL = 'http://localhost:8081/api/v1/phones';

// Comparison metrics and their weights (for overall score)
const comparisonMetrics = {
    display: {
        name: 'Display',
        compare: (spec1, spec2) => {
            const size1 = parseFloat(spec1.match(/\d+\.\d+/)[0]);
            const size2 = parseFloat(spec2.match(/\d+\.\d+/)[0]);
            return { 
                winner: size1 > size2 ? 1 : size1 < size2 ? 2 : 0,
                difference: Math.abs(size1 - size2).toFixed(1) + ' inches'
            };
        }
    },
    processor: {
        name: 'Processor',
        compare: (spec1, spec2) => {
            // Simple comparison based on processor names
            const processors = {
                'Snapdragon 8 Gen 3': 100,
                'A17 Pro chip': 100,
                'Google Tensor G3': 90
            };
            const score1 = processors[spec1] || 0;
            const score2 = processors[spec2] || 0;
            return {
                winner: score1 > score2 ? 1 : score1 < score2 ? 2 : 0,
                difference: 'Different architecture'
            };
        }
    },
    camera: {
        name: 'Camera',
        compare: (spec1, spec2) => {
            const mp1 = parseInt(spec1.match(/\d+/)[0]);
            const mp2 = parseInt(spec2.match(/\d+/)[0]);
            return {
                winner: mp1 > mp2 ? 1 : mp1 < mp2 ? 2 : 0,
                difference: Math.abs(mp1 - mp2) + 'MP difference'
            };
        }
    },
    battery: {
        name: 'Battery',
        compare: (spec1, spec2) => {
            const capacity1 = parseInt(spec1.match(/\d+/)[0]);
            const capacity2 = parseInt(spec2.match(/\d+/)[0]);
            return {
                winner: capacity1 > capacity2 ? 1 : capacity1 < capacity2 ? 2 : 0,
                difference: Math.abs(capacity1 - capacity2) + 'mAh difference'
            };
        }
    }
};

// Initialize phone selectors
async function initializeSelectors() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch phones');
        const phones = await response.json();
        
        const options = phones.map(phone => 
            `<option value="${phone.uuid}">${phone.brand} ${phone.model}</option>`
        ).join('');
        
        phone1Select.innerHTML = '<option value="">Select first phone</option>' + options;
        phone2Select.innerHTML = '<option value="">Select second phone</option>' + options;
    } catch (error) {
        console.error('Error initializing selectors:', error);
        comparisonResult.innerHTML = '<p class="error-message">Error loading phones. Please try again later.</p>';
    }
}

// Compare phones when both are selected
async function comparePhones() {
    const phone1Id = phone1Select.value;
    const phone2Id = phone2Select.value;
    
    if (!phone1Id || !phone2Id || phone1Id === phone2Id) {
        comparisonResult.innerHTML = '<p class="error-message">Please select two different phones to compare.</p>';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/compare/${phone1Id}/${phone2Id}`);
        if (!response.ok) throw new Error('Failed to fetch comparison data');
        const phones = await response.json();
        
        displayComparison(phones[0], phones[1]);
    } catch (error) {
        console.error('Error comparing phones:', error);
        comparisonResult.innerHTML = '<p class="error-message">Error loading comparison data. Please try again.</p>';
    }
}

// Display comparison results
function displayComparison(phone1, phone2) {
    let comparisonHTML = `
        <div class="comparison-container">
            <div class="phone1">
                <div class="phone-image-container">
                    <img src="${phone1.imageUrl || 'https://placehold.co/400x400?text=No+Image'}" 
                         alt="${phone1.brand} ${phone1.model}" 
                         class="phone-image">
                </div>
                <h2>${phone1.brand} ${phone1.model}</h2>
                <p class="price">Starting from $${phone1.startingPrice ? Number(phone1.startingPrice).toFixed(2) : '0.00'}</p>
                <div class="os-badge">${phone1.operationSystem} ${phone1.version}</div>
            </div>
            <div class="phone2">
                <div class="phone-image-container">
                    <img src="${phone2.imageUrl || 'https://placehold.co/400x400?text=No+Image'}" 
                         alt="${phone2.brand} ${phone2.model}" 
                         class="phone-image">
                </div>
                <h2>${phone2.brand} ${phone2.model}</h2>
                <p class="price">Starting from $${phone2.startingPrice ? Number(phone2.startingPrice).toFixed(2) : '0.00'}</p>
                <div class="os-badge">${phone2.operationSystem} ${phone2.version}</div>
            </div>
        </div>
        
        <table class="comparison-table">
            <tr>
                <th>Feature</th>
                <th>${phone1.brand} ${phone1.model}</th>
                <th>${phone2.brand} ${phone2.model}</th>
                <th>Winner</th>
            </tr>
    `;

    // Compare specifications
    if (phone1.specifications && phone2.specifications) {
        phone1.specifications.forEach(spec1 => {
            const spec2 = phone2.specifications.find(s => s.name === spec1.name);
            if (!spec2) return;

            comparisonHTML += `
                <tr>
                    <td class="comparison-category">${spec1.name}</td>
                    <td>${spec1.description}</td>
                    <td>${spec2.description}</td>
                    <td>${spec1.description === spec2.description ? 'Equal' : 'Varies'}</td>
                </tr>
            `;
        });
    }

    comparisonHTML += `</table>`;
    comparisonResult.innerHTML = comparisonHTML;
}

// Calculate overall winner based on multiple factors
function compareOverall(phone1, phone2) {
    let score1 = 0;
    let score2 = 0;
    
    // Compare prices
    if (phone1.price < phone2.price) score1++;
    else if (phone2.price < phone1.price) score2++;
    
    // Compare ratings
    if (phone1.score > phone2.score) score1++;
    else if (phone2.score > phone1.score) score2++;
    
    // Compare newness
    if (phone1.isNew && !phone2.isNew) score1++;
    else if (phone2.isNew && !phone1.isNew) score2++;
    
    // Compare specs
    phone1.specs.forEach(spec => {
        const spec2 = phone2.specs.find(s => s.name === spec.name);
        if (!spec2) return;

        const metric = comparisonMetrics[spec.name.toLowerCase()];
        if (!metric) return;

        const comparison = metric.compare(spec.description, spec2.description);
        if (comparison.winner === 1) score1++;
        else if (comparison.winner === 2) score2++;
    });
    
    if (score1 > score2) {
        return {
            winner: phone1.name,
            reason: `Better overall performance with superior specs and features.`
        };
    } else if (score2 > score1) {
        return {
            winner: phone2.name,
            reason: `Better overall performance with superior specs and features.`
        };
    } else {
        return {
            winner: "Tie",
            reason: "Both phones are equally matched in terms of features and specifications."
        };
    }
}

// Add event listeners
phone1Select.addEventListener('change', comparePhones);
phone2Select.addEventListener('change', comparePhones);

// Initialize the page
document.addEventListener('DOMContentLoaded', initializeSelectors);