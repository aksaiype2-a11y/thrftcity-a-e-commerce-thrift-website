import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import toast from 'react-hot-toast';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const { cart, placeOrder } = useShop();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    zip: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('online');
  const [isFetchingZip, setIsFetchingZip] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="container" style={{ padding: '6rem 20px', textAlign: 'center', minHeight:'60vh' }}>
        <h2>Your Cart is Empty</h2>
        <Link to="/shop" className="btn-primary" style={{marginTop:'2rem'}}>Go Shopping</Link>
      </main>
    );
  }

  const handleZipChange = async (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, zip: value }));

    if (value.length === 6 && /^\d+$/.test(value)) {
      setIsFetchingZip(true);
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await response.json();
        
        if (data && data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice.length > 0) {
          const postOffice = data[0].PostOffice[0];
          setFormData(prev => ({
            ...prev,
            city: postOffice.District || postOffice.Block || postOffice.Region,
            state: postOffice.State
          }));
          toast.success('Location auto-filled!');
        } else {
          toast.error('Invalid PIN Code');
        }
      } catch (error) {
        console.error('Error fetching PIN details:', error);
        toast.error('Failed to fetch location');
      } finally {
        setIsFetchingZip(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'cod') {
      placeOrder(formData, "COD");
      toast.success('Order placed successfully via Cash on Delivery!', { style: { background: '#1a1a1a', color: '#fff', border: '1px solid #39ff14' }, iconTheme: { primary: '#39ff14', secondary: '#000' }});
      navigate('/orders');
      return;
    }

    // Load Razorpay Script for Online Payment
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
      amount: total * 100, // Amount in paise
      currency: "INR",
      name: "ThrftCity",
      description: "Secure Online Payment",
      image: "https://via.placeholder.com/150", 
      handler: function (response) {
        // This function runs on successful payment
        placeOrder(formData, response.razorpay_payment_id);
        toast.success(`Payment Successful!`, { style: { background: '#1a1a1a', color: '#fff', border: '1px solid #39ff14' }, iconTheme: { primary: '#39ff14', secondary: '#000' }});
        navigate('/orders');
      },
      prefill: {
        name: formData.name,
        email: "user@example.com", 
        contact: formData.phone
      },
      theme: {
        color: "#39ff14"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <main className="container" style={{ padding: '4rem 20px', minHeight:'60vh' }}>
      <h1 className="section-title" style={{textAlign: 'left', fontSize:'2.5rem'}}>Checkout</h1>
      <div className="cart-layout" style={{display:'grid', gap:'3rem', gridTemplateColumns:'2fr 1fr'}}>
        
        <form onSubmit={handleSubmit} style={{background:'var(--surface-light)', padding:'2.5rem', borderRadius:'12px', border:'1px solid var(--border-color)'}}>
          <h2 style={{marginBottom:'2rem', fontSize:'1.5rem'}}>Shipping Address</h2>
          
          <div className="form-group" style={{marginBottom:'1.5rem'}}>
            <label className="form-label" style={{display:'block', marginBottom:'0.5rem', color:'#aaa'}}>Full Name</label>
            <input required className="form-control" style={{width:'100%', padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', borderRadius:'8px'}} type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="form-group" style={{marginBottom:'1.5rem'}}>
            <label className="form-label" style={{display:'block', marginBottom:'0.5rem', color:'#aaa'}}>Phone Number</label>
            <input required className="form-control" style={{width:'100%', padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', borderRadius:'8px'}} type="tel" placeholder="10-digit number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div className="form-group" style={{marginBottom:'1.5rem'}}>
            <label className="form-label" style={{display:'block', marginBottom:'0.5rem', color:'#aaa'}}>Street Address</label>
            <input required className="form-control" style={{width:'100%', padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', borderRadius:'8px'}} type="text" placeholder="House/Flat No., Street Name" value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} />
          </div>
          <div className="form-group" style={{marginBottom:'1.5rem'}}>
            <label className="form-label" style={{display:'block', marginBottom:'0.5rem', color:'#aaa'}}>Landmark</label>
            <input className="form-control" style={{width:'100%', padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', borderRadius:'8px'}} type="text" placeholder="Near Apollo Hospital (Optional)" value={formData.landmark} onChange={e => setFormData({...formData, landmark: e.target.value})} />
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px, 1fr))', gap:'1rem', marginBottom:'1.5rem'}}>
             <div className="form-group">
               <label className="form-label" style={{display:'block', marginBottom:'0.5rem', color:'#aaa'}}>City</label>
               <input required className="form-control" style={{width:'100%', padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', borderRadius:'8px'}} type="text" placeholder="e.g. Mumbai" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
             </div>
             <div className="form-group">
               <label className="form-label" style={{display:'block', marginBottom:'0.5rem', color:'#aaa'}}>State</label>
               <input required className="form-control" style={{width:'100%', padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', borderRadius:'8px'}} type="text" placeholder="e.g. Maharashtra" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
             </div>
             <div className="form-group">
               <label className="form-label" style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'0.5rem', color:'#aaa'}}>
                 <span>PIN Code</span>
                 {isFetchingZip && <span style={{color: 'var(--accent-color)', fontSize: '0.8rem'}}>Fetching...</span>}
               </label>
               <input required className="form-control" style={{width:'100%', padding:'12px', background:'#111', color:'#fff', border:'1px solid #333', borderRadius:'8px'}} type="text" placeholder="400001" value={formData.zip} onChange={handleZipChange} />
             </div>
          </div>
          
          <h2 style={{margin:'2rem 0 1rem', fontSize:'1.5rem'}}>Payment Method</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ padding: '1.5rem', background: paymentMethod === 'online' ? '#1a2e1a' : '#111', borderRadius: '8px', border: `1px solid ${paymentMethod === 'online' ? '#39ff14' : '#333'}`, color: '#ccc', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} style={{ accentColor: '#39ff14', width: '20px', height: '20px' }} />
              <div>
                <strong style={{ color: '#fff', display: 'block', fontSize: '1.1rem', marginBottom: '4px' }}>Pay Online (UPI, QR Code, Cards)</strong>
                <span style={{ fontSize: '0.9rem' }}>Secured by Razorpay. Supports PhonePe, GPay, Paytm, and all major cards.</span>
              </div>
            </label>
            
            <label style={{ padding: '1.5rem', background: paymentMethod === 'cod' ? '#1a2e1a' : '#111', borderRadius: '8px', border: `1px solid ${paymentMethod === 'cod' ? '#39ff14' : '#333'}`, color: '#ccc', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} style={{ accentColor: '#39ff14', width: '20px', height: '20px' }} />
              <div>
                <strong style={{ color: '#fff', display: 'block', fontSize: '1.1rem', marginBottom: '4px' }}>Cash on Delivery (COD)</strong>
                <span style={{ fontSize: '0.9rem' }}>Pay with cash when your order is delivered to your address.</span>
              </div>
            </label>
          </div>
          
          <button type="submit" className="btn-primary" style={{width:'100%', marginTop:'2rem', padding:'1.2rem', justifyContent:'center'}}>
            {paymentMethod === 'online' ? `Pay Securely - ₹${total}` : `Confirm COD Order - ₹${total}`}
          </button>
        </form>

        <div className="cart-summary" style={{background:'var(--surface-light)', padding:'2.5rem', borderRadius:'12px', height:'fit-content', border:'1px solid var(--border-color)'}}>
          <h2 style={{marginBottom:'2rem', fontSize:'1.5rem'}}>Order Summary</h2>
          {cart.map(item => (
            <div key={item.id} style={{display:'flex', justifyContent:'space-between', marginBottom:'1rem'}}>
              <span style={{color:'#aaa'}}>{item.name} (x{item.quantity})</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div style={{borderBottom:'1px solid #333', margin:'1.5rem 0'}}></div>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1rem', fontSize:'1.1rem'}}>
            <span style={{color:'#aaa'}}>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1.5rem', fontSize:'1.1rem'}}>
            <span style={{color:'#aaa'}}>Shipping</span>
            <span>₹{shipping}</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1rem', fontSize:'1.5rem', fontWeight:'900'}}>
            <span>Total</span>
            <span style={{color:'var(--accent-color)'}}>₹{total}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
