// Static Product Data
const products = [
    {
        id: '1',
        name: 'ecoosoft 14 LEDs 3 m Yellow Steady Clip Rice Lights',
        price: 159,
        description: '3 meter warm yellow decorative clip lights. Energy efficient, durable, and perfect for creating a cozy atmosphere in bedrooms or for festive occasions.',
        image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/decorative-light/h/k/i/14-led-rice-lights-3-meter-warm-yellow-clip-lights-pack-of-1-vsh-original-imagp5z9sz8gzmhh.jpeg',
        category: 'Lights',
        flipkartLink: 'https://dl.flipkart.com/s/sSy8MwuuuN',
        featured: true
    },
    {
        id: '2',
        name: 'Panda Night Lamp',
        price: 480,
        description: 'USB rechargeable silicone cute panda lamp. Soft touch, multi-color breathing mode, and long battery life. Ideal gift for kids and room decoration.',
        image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/night-lamp/q/t/e/rechargeable-cute-panda-silicone-night-light-portable-soft-original-imagvwyhgnczzzzg.jpeg',
        category: 'Lamps',
        flipkartLink: 'https://dl.flipkart.com/s/bmPLfUNNNN',
        featured: true
    },
    {
        id: '3',
        name: 'Sunset Projection Lamp',
        price: 395,
        description: 'Romantic LED sunset projection lamp. Create a stunning aesthetic atmosphere for photography, bedroom decor, or relaxing evenings. 180-degree rotation.',
        image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/night-lamp/g/l/f/sunset-projection-lamp-romantic-led-night-light-for-photography-original-imagmhzffzhuzzzh.jpeg',
        category: 'Lamps',
        flipkartLink: 'https://dl.flipkart.com/s/sS2o3iuuuN',
        featured: true
    }
];

// Cart Logic
let cart = JSON.parse(localStorage.getItem('ecoCart')) || [];

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countElement.innerText = totalItems;
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('ecoCart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${product.name} added to cart!`);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl z-50 animate-bounce';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Rendering Products
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    const featured = products.filter(p => p.featured);
    container.innerHTML = featured.map(product => `
        <div class="product-card glass rounded-[32px] overflow-hidden hover-lift border border-slate-100 group">
            <div class="h-64 overflow-hidden relative">
                <img src="${product.image}" alt="${product.name}" class="product-card-img w-full h-full object-cover">
                <span class="absolute top-4 left-4 bg-sky-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">${product.category}</span>
            </div>
            <div class="p-8">
                <h3 class="text-xl font-bold text-slate-900 mb-2 truncate">${product.name}</h3>
                <p class="text-slate-500 text-sm mb-6 line-clamp-2">${product.description}</p>
                <div class="flex items-center justify-between mb-8">
                    <span class="text-2xl font-black text-slate-900">₹${product.price}</span>
                    <a href="${product.flipkartLink}" target="_blank" class="text-sky-600 hover:text-sky-700 font-bold text-xs flex items-center gap-1">
                        View on Flipkart <i data-lucide="external-link" size="14"></i>
                    </a>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <button onclick="addToCart('${product.id}')" class="bg-slate-100 text-slate-900 py-3.5 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                        <i data-lucide="shopping-cart" size="18"></i> Add
                    </button>
                    <a href="product-details.html?id=${product.id}" class="bg-sky-500 text-white py-3.5 rounded-xl font-bold hover:bg-sky-600 transition-colors flex items-center justify-center shadow-lg shadow-sky-100">
                        Details
                    </a>
                </div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderFeaturedProducts();
});
