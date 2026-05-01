import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';

// Scroll restoration component so when you click footer links it scrolls to the top
function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
  return null;
}


// Static Info Pages
const About = () => <main><div className="container" style={{padding: '6rem 20px', textAlign:'center', minHeight:'60vh'}}><h2>About Us</h2><p style={{color:'#aaa', marginTop:'1rem', maxWidth:'600px', margin:'1rem auto'}}>We are ThrftCity, your premier destination for modern curated thrift fashion. We source high-quality streetwear and vintage pieces.</p></div></main>;
const Contact = () => <main><div className="container" style={{padding: '6rem 20px', textAlign:'center', minHeight:'60vh'}}><h2>Contact Support</h2><p style={{color:'#aaa', marginTop:'1rem'}}>Email us at support@thrftcity.com or call 1-800-THRIFT.</p></div></main>;
const Returns = () => <main><div className="container" style={{padding: '6rem 20px', textAlign:'center', minHeight:'60vh'}}><h2>Returns Policy</h2><p style={{color:'#aaa', marginTop:'1rem'}}>We accept returns within 14 days for store credit only. Vintage items are generally final sale unless damaged in transit.</p></div></main>;
const Shipping = () => <main><div className="container" style={{padding: '6rem 20px', textAlign:'center', minHeight:'60vh'}}><h2>Shipping Info</h2><p style={{color:'#aaa', marginTop:'1rem'}}>Free standard shipping on orders over ₹2000. Orders usually ship within 2-3 business days.</p></div></main>;
const FAQ = () => <main><div className="container" style={{padding: '6rem 20px', textAlign:'center', minHeight:'60vh'}}><h2>Frequently Asked Questions</h2><p style={{color:'#aaa', marginTop:'1rem'}}>Can I wash the clothes? Yes, we recommend cold wash.</p></div></main>;

function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        {/* Info & Help Links */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
