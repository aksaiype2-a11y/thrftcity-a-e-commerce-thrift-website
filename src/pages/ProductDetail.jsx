import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useShop();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState('');

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        console.error("Error fetching product:", error);
      } else if (data) {
        setProduct(data);
        const szArray = Array.isArray(data.available_size) ? data.available_size : [data.available_size || ''];
        setSize(szArray[0]);
      }
      setLoading(false);
    }
    
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="container" style={{padding: '6rem 20px', textAlign: 'center'}}><div className="spinner"></div><p style={{marginTop:'1rem', color:'#aaa'}}>Loading product...</p></div>;
  }

  if (!product) {
    return <div className="container" style={{padding: '6rem 20px', textAlign: 'center'}}><h2>Product Not Found</h2><Link to="/shop" className="btn-primary" style={{marginTop:'2rem'}}>Back to Shop</Link></div>;
  }

  const handleAddToCart = () => {
    // Re-map available_size back to what ShopContext expects if needed, 
    // or ShopContext can just use selectedSize.
    addToCart({ ...product, selectedSize: size });
    toast.success(`${product.name} added to cart!`, {
      style: { background: '#1a1a1a', color: '#fff', border: '1px solid #39ff14' },
      iconTheme: { primary: '#39ff14', secondary: '#000' }
    });
  };

  const availableSizes = Array.isArray(product.available_size) ? product.available_size : [product.available_size || ''];

  return (
    <main className="container" style={{ padding: '4rem 20px' }}>
      <div className="product-detail-layout">
        <div className="product-detail-img">
           <img src={`/${product.image}`} alt={product.name} style={{width:'100%', borderRadius: '12px', objectFit:'cover', boxShadow:'var(--shadow-lg)'}} />
        </div>
        <div className="product-detail-info" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <p className="product-category" style={{textTransform:'uppercase', letterSpacing:'1px', color:'#aaa'}}>{product.category}</p>
          <h1 style={{fontSize:'2.8rem', lineHeight: '1.2', marginBottom:'1rem'}}>{product.name}</h1>
          <h2 style={{fontSize:'2rem', color:'var(--accent-color)', marginBottom:'2rem'}}>₹{product.price}</h2>
          
          <div style={{marginBottom:'2rem', display:'flex', gap:'3rem', flexWrap:'wrap'}}>
            <div>
              <h4 style={{marginBottom:'0.5rem', color:'#aaa'}}>Authenticity:</h4>
              <span style={{color:'#39ff14'}}><i className="fas fa-check-circle"></i> Verified Thrift</span>
            </div>
          </div>

          {product.category !== 'accessories' && availableSizes.length > 0 && availableSizes[0] !== '' && (
            <div style={{marginBottom:'2rem'}}>
              <h4 style={{marginBottom:'1rem', color:'#aaa'}}>
                {product.category === 'shoes' ? 'Shoe Size:' : 'Size:'}
              </h4>
              <div className="size-selector" style={{display:'flex', gap:'10px'}}>
                 {availableSizes.map(sz => (
                   <button 
                     key={sz} 
                     className={`size-btn ${size === sz ? 'active' : ''}`} 
                     onClick={() => setSize(sz)}
                   >
                     {sz}
                   </button>
                 ))}
              </div>
            </div>
          )}

          <p style={{lineHeight:'1.6', color:'#ccc', marginBottom:'3rem', fontSize:'1.1rem'}}>{product.description}</p>

          <button className="btn-primary" style={{width:'100%', padding:'15px', fontSize:'1.2rem', justifyContent:'center'}} onClick={handleAddToCart}>
             <i className="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
