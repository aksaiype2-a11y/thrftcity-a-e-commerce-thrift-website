import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

global.window = {};
import products from '../src/data/products.js';

// Load env vars
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedProducts() {
  console.log('Seeding products into Supabase...');

  // Format products to match DB schema
  const formattedProducts = products.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    category: p.category,
    gender: p.gender,
    image: p.image,
    images: p.images || [],
    is_new: p.isNew || false,
    available_size: Array.isArray(p.availableSize) ? p.availableSize : (p.availableSize ? [p.availableSize] : []),
    condition: p.condition || '9/10',
    description: p.description || ''
  }));

  const { data, error } = await supabase
    .from('products')
    .upsert(formattedProducts, { onConflict: 'id' });

  if (error) {
    console.error('Error seeding products:', error.message);
  } else {
    console.log(`Successfully seeded ${formattedProducts.length} products!`);
  }
}

seedProducts();
