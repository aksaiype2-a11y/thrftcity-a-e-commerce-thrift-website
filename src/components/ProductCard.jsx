import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { id, name, category, price, condition, image, is_new, quantity } = product;
  const { addToCart, toggleWishlist, wishlist } = useShop();

  const navigate = useNavigate();

  const isWished = wishlist.find(item => item.id === id);

  const handleAddToCart = () => {
    const defaultSize = Array.isArray(product.available_size) ? product.available_size[0] : (product.available_size || 'N/A');
    addToCart({ ...product, selectedSize: defaultSize });
    toast.success(`${name} added!`, {
      style: { background: '#1a1a1a', color: '#fff', border: '1px solid #39ff14' },
      iconTheme: { primary: '#39ff14', secondary: '#000' }
    });
  };

  const handleCardClick = (e) => {
    // If the click was on a button or heart icon, don't navigate
    if (e.target.closest('button') || e.target.closest('.wishlist-btn')) return;
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      {is_new && <div className="thrift-badge">New Arrival</div>}
      
      <div className="product-img-container">
        <img src={`/${image}`} alt={name} className="product-img" />
        <button 
          className={`wishlist-btn ${isWished ? 'active' : ''}`} 
          title="Add to Wishlist"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
        >
          <Heart size={18} fill={isWished ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="product-info">
        <div className="product-category">{category}</div>
        <h3 className="product-title" style={{ margin: '0.5rem 0', fontSize: '1.1rem', fontWeight: '600' }}>
          {name}
        </h3>
        <div className="product-details" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>
          <span>Cond: {condition || '9/10'}</span>
        </div>
        <div className="product-price">₹{price}</div>
        <button className="add-to-cart-btn" onClick={(e) => {
          e.stopPropagation();
          handleAddToCart();
        }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
