import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, Package } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useState } from 'react';

export default function Navbar() {
  const { cart, wishlist, user, logout } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <header>
      <div className="nav-container">
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} />
        </button>
        <Link to="/" className="logo">Thrft<span>City</span></Link>

        {/* Note: In a real app we would use CSS classes to toggle mobile visibility. Inline styles block the CSS display:none logic. */}
        <nav className={`nav-links category-tabs ${menuOpen ? 'force-show' : ''}`} style={{ margin: 0, padding: 4, borderRadius: 40, background: 'rgba(26,26,26,0.8)', backdropFilter: 'blur(4px)' }}>
          <div className="dropdown">
            <Link to="/shop?gender=men" className="tab-btn" style={{ textDecoration: 'none', padding: '8px 24px', fontSize: '1rem', display: 'inline-block' }}>Men</Link>
            <div className="dropdown-content" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <Link to="/shop?gender=men&category=clothes">Clothes</Link>
              <Link to="/shop?gender=men&category=shoes">Shoes</Link>
              <Link to="/shop?gender=men&category=accessories">Accessories</Link>
            </div>
          </div>
          <div className="dropdown">
            <Link to="/shop?gender=women" className="tab-btn" style={{ textDecoration: 'none', padding: '8px 24px', fontSize: '1rem', display: 'inline-block' }}>Women</Link>
            <div className="dropdown-content" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <Link to="/shop?gender=women&category=clothes">Clothes</Link>
              <Link to="/shop?gender=women&category=shoes">Shoes</Link>
              <Link to="/shop?gender=women&category=accessories">Accessories</Link>
            </div>
          </div>
        </nav>

        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input type="text" id="global-search" className="search-input" placeholder="Search clothes, shoes, accessories..." autoComplete="off" />
        </div>

        <div className="nav-icons" style={{gap: '1rem'}}>
          <Link to="/orders" className="nav-icon" title="My Orders">
            <Package size={22} />
          </Link>
          <Link to="/wishlist" className="nav-icon" title="Wishlist">
            <Heart size={22} />
            {wishlistCount > 0 && <span className="badge" style={{display: 'flex'}}>{wishlistCount}</span>}
          </Link>
          <Link to="/cart" className="nav-icon" title="Cart">
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="badge" style={{display: 'flex'}}>{cartCount}</span>}
          </Link>
          {user ? (
            <Link to="/profile" className="auth-btn" style={{marginLeft: '0.5rem', background: 'none', border: '1px solid var(--accent-color)', color: 'var(--accent-color)'}}>Profile</Link>
          ) : (
            <Link to="/login" id="auth-btn" className="auth-btn" style={{marginLeft: '0.5rem'}}>Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
