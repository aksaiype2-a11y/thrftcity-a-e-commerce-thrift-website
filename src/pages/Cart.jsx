import { useShop } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Cart() {
  const { cart, removeFromCart } = useShop();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <main className="container" style={{ padding: '6rem 20px', textAlign: 'center', minHeight:'60vh' }}>
        <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>Your Cart is Empty</h2>
        <p style={{color: '#888', marginBottom: '2rem', fontSize:'1.1rem'}}>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="btn-primary">Start Shopping</Link>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: '4rem 20px', minHeight:'60vh' }}>
      <h1 className="section-title" style={{textAlign: 'left', fontSize:'2.5rem'}}>Shopping Cart</h1>
      
      <div className="cart-layout" style={{display:'grid', gap:'3rem', gridTemplateColumns:'2fr 1fr'}}>
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} style={{display:'flex', gap:'1.5rem', background:'var(--surface-light)', padding:'1.5rem', borderRadius:'12px', marginBottom:'1.5rem', position:'relative', border:'1px solid var(--border-color)'}}>
              <Link to={`/product/${item.id}`}>
                 <img src={`/${item.image}`} alt={item.name} style={{width:'120px', height:'120px', objectFit:'cover', borderRadius:'8px'}} />
              </Link>
              <div style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                <div>
                  <h3 style={{fontSize:'1.3rem', marginBottom:'0.3rem'}}>{item.name}</h3>
                  <p style={{color:'#aaa'}}>{item.category}</p>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'1rem', marginTop:'1rem', color:'#888'}}>
                  <span>Size: {item.selectedSize || (Array.isArray(item.availableSize) ? item.availableSize[0] : item.availableSize)}</span>
                </div>
              </div>
              <div style={{textAlign:'right', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'flex-end'}}>
                <span style={{fontSize:'1.4rem', fontWeight:'bold', color:'var(--accent-color)'}}>₹{item.price * item.quantity}</span>
                <button onClick={() => {removeFromCart(item.cartItemId || item.id); toast('Item removed', {style:{background:'#333', color:'#fff'}});}} style={{background:'transparent', color:'#ff4444', border:'none', cursor:'pointer', padding:'8px'}} title="Remove Item"><Trash2 size={24}/></button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary" style={{background:'var(--surface-light)', padding:'2.5rem', borderRadius:'12px', height:'fit-content', border:'1px solid var(--border-color)'}}>
          <h2 style={{marginBottom:'2rem', fontSize:'1.5rem'}}>Order Summary</h2>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1rem', fontSize:'1.1rem'}}>
            <span style={{color:'#aaa'}}>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1.5rem', borderBottom:'1px solid #333', paddingBottom:'1.5rem', fontSize:'1.1rem'}}>
            <span style={{color:'#aaa'}}>Shipping</span>
            <span>₹{shipping}</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'2.5rem', fontSize:'1.5rem', fontWeight:'900'}}>
            <span>Total</span>
            <span style={{color:'var(--accent-color)'}}>₹{total}</span>
          </div>
          <button className="btn-primary" style={{width:'100%', display:'flex', justifyContent:'center', gap:'10px', padding:'1.2rem', fontSize:'1.2rem'}} onClick={handleCheckout}>
            <span>Checkout Securely</span>
          </button>
        </div>
      </div>
    </main>
  );
}
