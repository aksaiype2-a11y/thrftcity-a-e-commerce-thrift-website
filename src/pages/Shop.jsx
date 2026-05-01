import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const genderParam = searchParams.get('gender');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      let query = supabase.from('products').select('*');
      
      if (categoryParam) {
        query = query.eq('category', categoryParam);
      }
      
      if (genderParam) {
        query = query.eq('gender', genderParam);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
    
    fetchProducts();
  }, [categoryParam, genderParam]);

  let title = 'All Products';
  if (genderParam && categoryParam) title = `${genderParam}'s ${categoryParam}`;
  else if (genderParam) title = `${genderParam}'s Collection`;
  else if (categoryParam) title = `${categoryParam} Collection`;

  return (
    <main>
      <div className="container" style={{ padding: '4rem 20px' }}>
        <h2 className="section-title" style={{ textTransform: 'capitalize' }}>
          {title}
        </h2>
        
        {loading ? (
          <div style={{textAlign: "center", padding: "4rem 0"}}>
             <div className="spinner"></div>
             <p style={{marginTop: "1rem", color: "#aaa"}}>Loading products...</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
            {products.length === 0 && (
              <p style={{textAlign:"center", color:"#888"}}>No products found for this category.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
