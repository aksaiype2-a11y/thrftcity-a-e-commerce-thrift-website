// script.js
// Updated Core logic for state and UI functionality (Single-Piece Thrift Version)

const STORE_KEYS = {
    CART: 'thrft_cart',
    WISHLIST: 'thrft_wishlist',
    USER: 'thrft_user',
    ORDERS: 'thrft_orders'
};

// --- Toast Notifications ---
function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-color);"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- Cart Logic (Thrift Mode - Single Piece) ---
/* Cart is now stored as an array of product IDs representing the unique items */

function getCart() {
    return JSON.parse(localStorage.getItem(STORE_KEYS.CART)) || [];
}

function saveCart(cart) {
    localStorage.setItem(STORE_KEYS.CART, JSON.stringify(cart));
    updateHeaderCounts();
}

function addToCart(productId) {
    const cart = getCart();

    // In a thrift store, there's only 1 item. If it's already in the cart, do nothing.
    if (cart.includes(productId)) {
        showToast('Item is already in your cart!');
        return;
    }

    cart.push(productId);
    saveCart(cart);
    showToast('Added to cart');
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(id => id !== productId);
    saveCart(cart);
}

function getCartTotal() {
    const cart = getCart();
    let total = 0;
    cart.forEach(productId => {
        const product = window.thrftData.getProductById(productId);
        if (product) {
            total += product.price; // Just sum the prices, no quantity multiplication
        }
    });
    return total;
}

function clearCart() {
    localStorage.removeItem(STORE_KEYS.CART);
    updateHeaderCounts();
}


// --- Wishlist Logic ---
function getWishlist() {
    return JSON.parse(localStorage.getItem(STORE_KEYS.WISHLIST)) || [];
}

function saveWishlist(wishlist) {
    localStorage.setItem(STORE_KEYS.WISHLIST, JSON.stringify(wishlist));
    updateHeaderCounts();
}

function toggleWishlist(productId) {
    let wishlist = getWishlist();
    const index = wishlist.indexOf(productId);

    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Removed from wishlist');
    } else {
        wishlist.push(productId);
        showToast('Added to wishlist');
    }

    saveWishlist(wishlist);
    return !(index > -1); // returns true if added, false if removed
}

function isInWishlist(productId) {
    const wishlist = getWishlist();
    return wishlist.includes(productId);
}


// --- Auth Logic ---
function getUser() {
    return JSON.parse(localStorage.getItem(STORE_KEYS.USER));
}

function loginUser(phoneOrEmail, name) {
    const user = {
        id: Date.now().toString(),
        phoneOrEmail,
        name: name || "Thrft Shopper"
    };
    localStorage.setItem(STORE_KEYS.USER, JSON.stringify(user));
    updateHeaderAuthButton();
    showToast(`Welcome back, ${user.name}`);

    // Redirect after slight delay if on login page
    if (window.location.pathname.includes('login.html')) {
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

function logoutUser() {
    localStorage.removeItem(STORE_KEYS.USER);
    updateHeaderAuthButton();
    showToast('Logged out successfully');

    if (window.location.pathname.includes('profile.html') || window.location.pathname.includes('orders.html')) {
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}


// --- Order Logic ---
function getOrders() {
    return JSON.parse(localStorage.getItem(STORE_KEYS.ORDERS)) || [];
}

function placeOrder(checkoutDetails) {
    const cart = getCart();
    if (cart.length === 0) return false;

    // Convert id array to objects to store historical order info
    const resolvedItems = cart.map(id => {
        const p = window.thrftData.getProductById(id);
        return {
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.image,
            size: p.availableSize
        };
    }).filter(i => i !== null);


    const orders = getOrders();
    const newOrder = {
        orderId: 'ORD-' + Math.floor(Math.random() * 1000000),
        date: new Date().toISOString(),
        items: resolvedItems,
        total: getCartTotal(),
        status: 'Processing',
        details: checkoutDetails
    };

    orders.push(newOrder);
    localStorage.setItem(STORE_KEYS.ORDERS, JSON.stringify(orders));

    // Clear cart after order
    clearCart();
    return newOrder.orderId;
}


// --- UI Updaters ---

function updateHeaderCounts() {
    const cartCountEl = document.getElementById('cart-count');
    const wishlistCountEl = document.getElementById('wishlist-count');

    if (cartCountEl) {
        const cart = getCart();
        cartCountEl.textContent = cart.length; // Array length is the total number of single items
        if (cart.length > 0) cartCountEl.style.display = 'flex';
        else cartCountEl.style.display = 'none';
    }

    if (wishlistCountEl) {
        const wishlist = getWishlist();
        wishlistCountEl.textContent = wishlist.length;
        if (wishlist.length > 0) wishlistCountEl.style.display = 'flex';
        else wishlistCountEl.style.display = 'none';
    }
}

function updateHeaderAuthButton() {
    const authBtn = document.getElementById('auth-btn');
    if (!authBtn) return;

    const user = getUser();
    if (user) {
        authBtn.innerHTML = '<i class="fas fa-user"></i> Profile';
        authBtn.href = 'profile.html';
    } else {
        authBtn.innerHTML = 'Login';
        authBtn.href = 'login.html';
    }
}

// Render a product card (Thrift Version)
function createProductCardHTML(product) {
    const inWishlist = isInWishlist(product.id);
    const wishlistClass = inWishlist ? 'active' : '';

    return `
        <div class="product-card fade-in">
            <div class="thrift-badge">Only 1 Available</div>
            <button class="wishlist-btn ${wishlistClass}" onclick="handleWishlistClick(event, '${product.id}')" title="Add to Wishlist">
                <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <a href="product.html?id=${product.id}" class="product-img-container">
                <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
                <div class="condition-tag">Cond: ${product.condition}</div>
            </a>
            <div class="product-info">
                <div style="display:flex; justify-content:space-between; margin-bottom: 0.5rem;">
                    <span class="product-category">${product.gender} • ${product.category}</span>
                    <span class="product-category">Size: ${product.availableSize}</span>
                </div>
                <a href="product.html?id=${product.id}"><h3 class="product-title">${product.name}</h3></a>
                <div class="product-price">₹${product.price}</div>
                <button class="add-to-cart-btn" onclick="handleQuickAdd(event, '${product.id}')">
                    <i class="fas fa-shopping-cart"></i> View Details
                </button>
            </div>
        </div>
    `;
}

// Global click handlers
window.handleWishlistClick = function (event, productId) {
    event.preventDefault();
    event.stopPropagation();

    const isAdded = toggleWishlist(productId);
    const btn = event.currentTarget;
    const icon = btn.querySelector('i');

    if (isAdded) {
        btn.classList.add('active');
        icon.classList.remove('far');
        icon.classList.add('fas');
    } else {
        btn.classList.remove('active');
        icon.classList.remove('fas');
        icon.classList.add('far');
    }
};

window.handleQuickAdd = function (event, productId) {
    event.preventDefault();
    event.stopPropagation();
    window.location.href = `product.html?id=${productId}`;
};

// Search Setup
function setupSearch() {
    const searchInput = document.getElementById('global-search');
    const resultsContainer = document.getElementById('search-results');

    if (!searchInput || !resultsContainer) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length < 2) {
            resultsContainer.classList.remove('active');
            return;
        }

        const hits = window.thrftData.products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.gender.toLowerCase().includes(query)
        ).slice(0, 5); // top 5 hits

        if (hits.length > 0) {
            let html = '';
            hits.forEach(p => {
                html += `
                    <div class="search-result-item" onclick="window.location.href='product.html?id=${p.id}'">
                        <img src="${p.image}" alt="${p.name}">
                        <div>
                            <div style="font-size:0.9rem">${p.name}</div>
                            <div style="color:var(--accent-color); font-weight:bold; font-size:0.8rem">₹${p.price}</div>
                        </div>
                    </div>
                `;
            });
            resultsContainer.innerHTML = html;
            resultsContainer.classList.add('active');
        } else {
            resultsContainer.innerHTML = '<div style="padding:10px; color:#888;">No results found</div>';
            resultsContainer.classList.add('active');
        }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.classList.remove('active');
        }
    });
}

// Setup Mobile Menu
function setupMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Initialize global features on page load
document.addEventListener('DOMContentLoaded', () => {
    updateHeaderCounts();
    updateHeaderAuthButton();
    setupSearch();
    setupMobileMenu();
});
