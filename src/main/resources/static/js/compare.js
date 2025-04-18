// DOM Elements
const phone1Select = document.getElementById('phone1');
const phone2Select = document.getElementById('phone2');
const comparisonResult = document.getElementById('comparison-result');

// API endpoints
const API_BASE_URL = 'http://localhost:8081/api';

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
        const response = await fetch(`${API_BASE_URL}/phones`);
        if (!response.ok) throw new Error('Failed to fetch phones');
        const phones = await response.json();
        
        const options = phones.map(phone => 
            `<option value="${phone.id}">${phone.name}</option>`
        ).join('');
        
        phone1Select.innerHTML += options;
        phone2Select.innerHTML += options;
    } catch (error) {
        console.error('Error initializing selectors:', error);
    }
}

// Compare phones when both are selected
async function comparePhones() {
    const phone1Id = parseInt(phone1Select.value);
    const phone2Id = parseInt(phone2Select.value);
    
    if (!phone1Id || !phone2Id || phone1Id === phone2Id) {
        comparisonResult.innerHTML = '<p>Please select two different phones to compare.</p>';
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/phones/compare?phone1Id=${phone1Id}&phone2Id=${phone2Id}`);
        if (!response.ok) throw new Error('Failed to fetch comparison data');
        const [phone1, phone2] = await response.json();
        
        displayComparison(phone1, phone2);
    } catch (error) {
        console.error('Error comparing phones:', error);
        comparisonResult.innerHTML = '<p>Error loading comparison data. Please try again.</p>';
    }
}

// Display comparison results
function displayComparison(phone1, phone2) {
    let comparisonHTML = `
        <div class="comparison-container">
            <div class="phone1">
                <img src="${phone1.image}" alt="${phone1.name}" class="phone-image">
                <h2>${phone1.name}</h2>
                <div class="rating">
                    <div class="stars">${'★'.repeat(Math.floor(phone1.score))}${'☆'.repeat(5-Math.floor(phone1.score))}</div>
                    <span>${phone1.score} (${phone1.reviews} reviews)</span>
                </div>
                <p class="price">$${phone1.price}</p>
            </div>
            <div class="phone2">
                <img src="${phone2.image}" alt="${phone2.name}" class="phone-image">
                <h2>${phone2.name}</h2>
                <div class="rating">
                    <div class="stars">${'★'.repeat(Math.floor(phone2.score))}${'☆'.repeat(5-Math.floor(phone2.score))}</div>
                    <span>${phone2.score} (${phone2.reviews} reviews)</span>
                </div>
                <p class="price">$${phone2.price}</p>
            </div>
        </div>
        
        <table class="comparison-table">
            <tr>
                <th>Feature</th>
                <th>${phone1.name}</th>
                <th>${phone2.name}</th>
                <th>Winner</th>
            </tr>
    `;

    // Compare each specification
    phone1.specs.forEach(spec => {
        const spec2 = phone2.specs.find(s => s.name === spec.name);
        if (!spec2) return;

        const metric = comparisonMetrics[spec.name.toLowerCase()];
        if (!metric) return;

        const comparison = metric.compare(spec.description, spec2.description);
        const winner = comparison.winner;

        comparisonHTML += `
            <tr>
                <td class="comparison-category">${spec.name}</td>
                <td class="${winner === 1 ? 'highlight' : ''}">${spec.description}
                    ${winner === 1 ? '<div class="feature-better">Better</div>' : 
                      winner === 2 ? '<div class="feature-worse">Lower</div>' : 
                      '<div class="feature-equal">Equal</div>'}
                </td>
                <td class="${winner === 2 ? 'highlight' : ''}">${spec2.description}
                    ${winner === 2 ? '<div class="feature-better">Better</div>' : 
                      winner === 1 ? '<div class="feature-worse">Lower</div>' : 
                      '<div class="feature-equal">Equal</div>'}
                </td>
                <td>
                    ${winner === 0 ? 'Equal' : 
                      `${winner === 1 ? phone1.name : phone2.name}`}
                    ${comparison.difference ? `<div class="difference">${comparison.difference}</div>` : ''}
                </td>
            </tr>
        `;
    });

    // Add overall comparison
    const overallComparison = compareOverall(phone1, phone2);
    comparisonHTML += `
        <tr>
            <td colspan="4" class="overall-winner">
                <h3>Overall Winner: ${overallComparison.winner}</h3>
                <p>${overallComparison.reason}</p>
            </td>
        </tr>
        </table>
    `;

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

// Event listeners
phone1Select.addEventListener('change', comparePhones);
phone2Select.addEventListener('change', comparePhones);

// Initialize the page
document.addEventListener('DOMContentLoaded', initializeSelectors); 