
// products.js
// Updated Thrift dataset for ThrftCity
// PRICING RULES:
// Clothes: ₹299 – ₹899
// Shoes: ₹799 – ₹1899
// Accessories: ₹149 – ₹599

const products = [
    // ===================== MEN =====================
    // MEN CLOTHES
    {
        id: "m-c-1",
        name: "Vintage Harley Davidson Graphic Tee",
        gender: "men",
        category: "clothes",
        price: 699,
        availableSize: "L",
        condition: "8/10",
        image: "img/harlay tshirt.png",
        description: "Classic faded graphic tee with an authentic vintage wash. Minor cracking on the print but adds to the character."
    },
    {
        id: "m-c-2",
        name: "Levi's 501 Washed Black Denim",
        gender: "men",
        category: "clothes",
        price: 899,
        availableSize: "W32 L30",
        condition: "9/10",
        image: "img/levis_501_2.jpg",
        description: "Perfectly worn-in Levi's denim. Excellent condition fading."
    },
    {
        id: "m-c-3",
        name: "90s Cargo Parachute Pants",
        gender: "men",
        category: "clothes",
        price: 799,
        availableSize: "M",
        condition: "7/10",
        image: "img/cargo pants.jpeg",
        description: "Baggy parachute pants with adjustable toggles. Small scuff on the left knee."
    },
    {
        id: "m-c-4",
        name: "Retro Block Puffer Vest",
        gender: "men",
        category: "clothes",
        price: 849,
        availableSize: "XL",
        condition: "9/10",
        image: "img/retro vest.webp",
        description: "Warm puffer vest with color block design from the late 90s. No tears or stains."
    },
    {
        id: "m-c-5",
        name: "Distressed Grunge Flannel",
        gender: "men",
        category: "clothes",
        price: 499,
        availableSize: "M",
        condition: "8/10",
        image: "img/distressed_grunge_flannel.png",
        description: "Soft grunge flannel with mild fraying at the hem. Essential layering piece."
    },

    // MEN SHOES
    {
        id: "m-s-1",
        name: "Nike Air Max 95 (Retro Archive)",
        gender: "men",
        category: "shoes",
        price: 1899,
        availableSize: "UK 9",
        condition: "8/10",
        image: "img/nike_air_max_95.png",
        description: "Chunky 90s sneakers. Bubbles are intact, minor heel drag."
    },
    {
        id: "m-s-2",
        name: "Dr. Martens 1460 Boots",
        gender: "men",
        category: "shoes",
        price: 1799,
        availableSize: "UK 10",
        condition: "7/10",
        image: "img/dr_martens_1460.png",
        description: "Well-worn genuine leather boots. Perfectly broken in, heavy scuffing on the toe box."
    },
    {
        id: "m-s-3",
        name: "Vans Old Skool Classics",
        gender: "men",
        category: "shoes",
        price: 799,
        availableSize: "UK 8",
        condition: "8/10",
        image: "img/vans_old_skool.png",
        description: "Beat-up look skate shoes. Essential for the uniform. Suede is slightly faded."
    },
    {
        id: "m-s-4",
        name: "Nike Dunk Panda Low",
        gender: "men",
        category: "shoes",
        price: 1599,
        availableSize: "UK 9",
        condition: "9/10",
        image: "img/nike_dunk_panda_low.png",
        description: "Classic black and white colorway. Highly sought after, excellent condition."
    },

    // MEN ACCESSORIES
    {
        id: "m-a-1",
        name: "Thick Silver Cuban Chain",
        gender: "men",
        category: "accessories",
        price: 399,
        availableSize: "One Size",
        condition: "9/10",
        image: "img/thick_silver_cuban_chain.png",
        description: "Heavy stainless steel chain. Unbranded."
    },
    {
        id: "m-a-2",
        name: "Faded Carhartt Dad Hat",
        gender: "men",
        category: "accessories",
        price: 299,
        availableSize: "One Size",
        condition: "8/10",
        image: "img/hat.jpg",
        description: "Vintage wash baseball cap. Perfectly faded brim."
    },

    // ===================== WOMEN =====================
    // WOMEN CLOTHES
    {
        id: "w-c-1",
        name: "Y2K Rhinestone Baby Tee",
        gender: "women",
        category: "clothes",
        price: 299,
        availableSize: "S",
        condition: "9/10",
        image: "img/y2k_rhinestone_baby_tee.png",
        description: "Tight fit cropped baby tee. All rhinestones intact."
    },
    {
        id: "w-c-2",
        name: "Low Rise Cargo Midi Skirt",
        gender: "women",
        category: "clothes",
        price: 649,
        availableSize: "M",
        condition: "8/10",
        image: "img/denim skirt.png",
        description: "Utilitarian skirt with multiple cargo pockets. Heavy canvas material."
    },
    {
        id: "w-c-3",
        name: "Oversized Vintage Leather Blazer",
        gender: "women",
        category: "clothes",
        price: 899,
        availableSize: "L",
        condition: "7/10",
        image: "img/oversize jacket.png",
        description: "Genuine vintage leather blazer. Mild creasing on the sleeves but incredibly soft."
    },
    {
        id: "w-c-4",
        name: "90s Argyle Knit Vest",
        gender: "women",
        category: "clothes",
        price: 499,
        availableSize: "S",
        condition: "9/10",
        image: "img/argyle_knit_vest.png",
        description: "Argyle print knit vest. Preppy yet grungy. No pilling."
    },
    {
        id: "w-c-5",
        name: "Silky 90s Slip Dress",
        gender: "women",
        category: "clothes",
        price: 799,
        availableSize: "M",
        condition: "8/10",
        image: "img/Elegant black satin midi dress.png",
        description: "A gorgeous 90s piece. Minor snag on the back hem."
    },

    // WOMEN SHOES
    {
        id: "w-s-1",
        name: "Demonia Platform Boots",
        gender: "women",
        category: "shoes",
        price: 1899,
        availableSize: "UK 6",
        condition: "8/10",
        image: "img/demonia_platform_boots.png",
        description: "Heavy platform boots. Gives you an extra 3 inches. Minor scuffs on the platform."
    },
    {
        id: "w-s-2",
        name: "Asics Gel Kayano Retro Runners",
        gender: "women",
        category: "shoes",
        price: 1299,
        availableSize: "UK 5",
        condition: "9/10",
        image: "img/asics_gel_kayano_runners.png",
        description: "Silver and mesh runners. Excellent condition, very lightweight."
    },
    {
        id: "w-s-3",
        name: "Vintage Square Toe Heels",
        gender: "women",
        category: "shoes",
        price: 899,
        availableSize: "UK 7",
        condition: "7/10",
        image: "img/heels.jpg",
        description: "Classic 90s silhouette. Heel caps replaced recently."
    },
    {
        id: "w-s-4",
        name: "Puma Suede Platform Sneakers",
        gender: "women",
        category: "shoes",
        price: 1399,
        availableSize: "UK 6",
        condition: "9/10",
        image: "img/puma_women_sneakers_pink.png",
        description: "Chunky platform sole Puma sneakers in pink suede. Excellent condition."
    },

    // WOMEN ACCESSORIES
    {
        id: "w-a-1",
        name: "Prada-style Nylon Mini Bag",
        gender: "women",
        category: "accessories",
        price: 599,
        availableSize: "One Size",
        condition: "8/10",
        image: "img/prada_nylon_mini_bag.png",
        description: "Nylon shoulder bag, unbranded thrift find. Inner lining is clean."
    },
    {
        id: "w-a-2",
        name: "Chunky Yellow Tinted Sunglasses",
        gender: "women",
        category: "accessories",
        price: 149,
        availableSize: "One Size",
        condition: "9/10",
        image: "img/chunky_yellow_tinted_sunglasses.png",
        description: "Rectangular frames with yellow tinted lenses. Minor scratching."
    }
];

// Helper functions for data access
function getAllProducts() {
    return products;
}

function getProductById(id) {
    return products.find(p => p.id === id);
}

function getProductsByGender(gender) {
    return products.filter(p => p.gender === gender);
}

function getProductsByCategory(category) {
    return products.filter(p => p.category === category);
}

function getProductsByGenderAndCategory(gender, category) {
    return products.filter(p => p.gender === gender && p.category === category);
}

// Add 'new arrival' property randomly for sorting
products.forEach(p => p.isNewArrival = Math.random() > 0.5);

// Make functions available globally
window.thrftData = {
    products,
    getAllProducts,
    getProductById,
    getProductsByGender,
    getProductsByCategory,
    getProductsByGenderAndCategory
};
