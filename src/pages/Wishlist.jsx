import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useShop();

  return (
    <main className="container" style={{ padding: '4rem 20px', minHeight:'60vh' }}>
      <h1 className="section-title" style={{textAlign: 'left', fontSize:'2.5rem'}}>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <div style={{textAlign:'center', marginTop:'4rem'}}>
           <p style={{color: '#888', fontSize:'1.2rem'}}>Your wishlist is empty. Start saving items you love!</p>
        </div>
      ) : (
        <div className="products-grid">
          {wishlist.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
