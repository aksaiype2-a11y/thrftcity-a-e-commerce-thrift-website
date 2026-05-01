import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-col">
          <Link to="/" className="logo" style={{ marginBottom: '1rem', display: 'block' }}>Thrft<span>City</span></Link>
          <p style={{ color: '#aaa', fontSize: '0.9rem' }}>The premier destination for modern curated thrift fashion.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
        <div className="footer-col" style={{ marginLeft: 'auto' }}>
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop?category=men">Men</Link></li>
            <li><Link to="/shop?category=women">Women</Link></li>
            <li><Link to="/shop?category=clothes">Clothes</Link></li>
            <li><Link to="/shop?category=shoes">Shoes</Link></li>
            <li><Link to="/shop?category=accessories">Accessories</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Help & Info</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
            <li><Link to="/returns">Returns Policy</Link></li>
            <li><Link to="/shipping">Shipping Info</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-tiktok"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-pinterest"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2026 ThrftCity. All rights reserved. Built for Gen-Z.
      </div>
    </footer>
  );
}
