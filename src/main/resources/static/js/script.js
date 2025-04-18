// DOM Elements
const searchBar = document.querySelector('.search-bar');
const phonesGrid = document.querySelector('.phones-grid');
const filterButtons = document.querySelectorAll('.filter-button');
const productDetail = document.querySelector('.product-detail');
const loadingSpinner = document.querySelector('.loading-spinner');

// API endpoints
const API_BASE_URL = 'http://localhost:8081/api/v1/phones';

let phones = [];

// Fetch phones from spring
async function fetchPhones() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched phones:', data);
        return data;
    } catch (error) {
        console.error('Error fetching phones:', error);
        return [];
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    try {
        phones = await fetchPhones();
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('catalog.html')) {
            displayPhones(phones);
            setupFilters();
        } else if (currentPage.includes('product.html')) {
            const urlParams = new URLSearchParams(window.location.search);
            const phoneId = urlParams.get('id');
            if (phoneId) {
                showLoading();
                await displayPhoneDetails(phoneId);
            } else {
                showError('No phone ID provided');
            }
        } else if (currentPage === '/' || currentPage.includes('index.html')) {
            displayPopularPhones();
        }
    } catch (error) {
        console.error('Error initializing page:', error);
        showError('Failed to load page content');
    }
});

if (searchBar) {
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPhones = phones.filter(phone => 
            phone.model.toLowerCase().includes(searchTerm) ||
            phone.brand.toLowerCase().includes(searchTerm) ||
            (phone.description && phone.description.toLowerCase().includes(searchTerm))
        );
        displayPhones(filteredPhones);
    });
}

function displayPhones(phonesToShow) {
    if (!phonesGrid) return;
    
    if (!phonesToShow || phonesToShow.length === 0) {
        phonesGrid.innerHTML = '<p class="no-phones">No phones available</p>';
        return;
    }
    
    phonesGrid.innerHTML = phonesToShow.map(phone => `
        <div class="phone-card">
            <img src="${phone.imageUrl || 'https://placehold.co/400x400?text=No+Image'}" 
                 alt="${phone.brand} ${phone.model}" 
                 class="phone-image">
            <div class="phone-info">
                <h3>${phone.brand} ${phone.model}</h3>
                <p>${phone.description || 'No description available'}</p>
                <div class="price">Starting from $${phone.startingPrice ? Number(phone.startingPrice).toFixed(2) : '0.00'}</div>
                ${isNewPhone(phone.publishDate) ? '<span class="new-badge">NEW</span>' : ''}
                <div class="phone-details">
                    <span class="os-badge">${phone.operationSystem} ${phone.version}</span>
                </div>
                <a href="product.html?id=${phone.uuid}" class="view-phone">View Details</a>
            </div>
        </div>
    `).join('');
}

function showLoading() {
    if (loadingSpinner) {
        loadingSpinner.classList.add('active');
    }
    if (productDetail) {
        productDetail.classList.remove('active');
    }
}

function hideLoading() {
    if (loadingSpinner) {
        loadingSpinner.classList.remove('active');
    }
    if (productDetail) {
        productDetail.classList.add('active');
    }
}

function showError(message) {
    if (productDetail) {
        productDetail.innerHTML = `
            <div class="error-message">
                <h2>Error</h2>
                <p>${message}</p>
                <a href="catalog.html" class="back-to-catalog">← Back to Catalog</a>
            </div>
        `;
        productDetail.classList.add('active');
    }
    hideLoading();
}

async function displayPhoneDetails(phoneId) {
    try {
        console.log('Fetching phone details for ID:', phoneId);
        const response = await fetch(`${API_BASE_URL}/${phoneId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const phone = await response.json();
        console.log('Received phone details:', phone);

        if (!phone) {
            throw new Error('Phone not found');
        }

        if (!productDetail) {
            console.error('Product detail container not found');
            return;
        }

        productDetail.innerHTML = `
            <div class="product-image-container">
                <img src="${phone.imageUrl || 'https://placehold.co/400x400?text=No+Image'}" 
                     alt="${phone.brand} ${phone.model}" 
                     class="product-image">
            </div>
            <div class="product-info">
                <h1>${phone.brand} ${phone.model}</h1>
                <div class="phone-meta">
                    <span class="os-badge">${phone.operationSystem} ${phone.version}</span>
                    <span class="release-date">Released: ${formatDate(phone.publishDate)}</span>
                </div>
                <p class="price">Starting from $${phone.startingPrice ? Number(phone.startingPrice).toFixed(2) : '0.00'}</p>
                <p class="description">${phone.description || 'No description available'}</p>
                
                ${phone.specifications && phone.specifications.length > 0 ? `
                    <div class="specs-list">
                        <h2>Specifications</h2>
                        ${phone.specifications.map(spec => `
                            <div class="spec-item">
                                <span class="spec-name">${spec.name}</span>
                                <span class="spec-value">${spec.description}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p>No specifications available</p>'}
            </div>
        `;
        hideLoading();
    } catch (error) {
        console.error('Error fetching phone details:', error);
        showError('Error loading phone details. Please try again later.');
    }
}

function formatDate(dateString) {
    if (!dateString) return 'Unknown';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function isNewPhone(publishDate) {
    if (!publishDate) return false;
    const publishDateTime = new Date(publishDate);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return publishDateTime > threeMonthsAgo;
}

function displayPopularPhones() {
    if (!phones || phones.length === 0) {
        return;
    }

    // 3 recent phones
    const popularPhones = phones
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .slice(0, 3);
    
    const popularPhonesGrid = document.querySelector('.phones-grid');
    if (popularPhonesGrid) {
        displayPhones(popularPhones);
    }
}

function setupFilters() {
    if (!filterButtons) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterType = button.dataset.filter;
            let filteredPhones = [...phones];

            switch(filterType) {
                case 'new':
                    filteredPhones = phones.filter(phone => isNewPhone(phone.publishDate));
                    break;
                case 'price-low':
                    filteredPhones.sort((a, b) => Number(a.startingPrice || 0) - Number(b.startingPrice || 0));
                    break;
                case 'price-high':
                    filteredPhones.sort((a, b) => Number(b.startingPrice || 0) - Number(a.startingPrice || 0));
                    break;
                case 'latest':
                    filteredPhones.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
                    break;
            }

            displayPhones(filteredPhones);
        });
    });
} 