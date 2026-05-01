import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

export default function Orders() {
  const { orders } = useShop();

  return (
    <main className="container" style={{ padding: '4rem 20px', minHeight:'60vh' }}>
      <h1 className="section-title" style={{textAlign: 'left', fontSize:'2.5rem'}}>My Orders</h1>
      
      {orders.length === 0 ? (
        <div style={{textAlign:'center', marginTop:'4rem'}}>
           <p style={{color: '#888', fontSize:'1.2rem'}}>You haven't placed any orders yet.</p>
           <Link to="/shop" className="btn-primary" style={{marginTop:'1.5rem'}}>Start Shopping</Link>
        </div>
      ) : (
        <div style={{display:'flex', flexDirection:'column', gap:'2rem'}}>
          {orders.map(order => (
             <div key={order.id} style={{background:'var(--surface-light)', borderRadius:'12px', border:'1px solid var(--border-color)', overflow:'hidden'}}>
                <div style={{padding:'1.5rem', background:'#111', borderBottom:'1px solid var(--border-color)', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem'}}>
                   <div>
                      <span style={{color:'#aaa', fontSize:'0.9rem', display:'block'}}>Order Status</span>
                      <span style={{color:'var(--accent-color)', fontWeight:'bold'}}><i className="fas fa-box"></i> {order.status}</span>
                   </div>
                   <div>
                      <span style={{color:'#aaa', fontSize:'0.9rem', display:'block'}}>Order Date</span>
                      <span style={{fontWeight:'bold'}}>{new Date(order.date).toLocaleDateString()}</span>
                   </div>
                   <div>
                      <span style={{color:'#aaa', fontSize:'0.9rem', display:'block'}}>Order ID</span>
                      <span style={{fontWeight:'bold'}}>{order.id}</span>
                   </div>
                   <div>
                      <span style={{color:'#aaa', fontSize:'0.9rem', display:'block'}}>Total</span>
                      <span style={{fontWeight:'bold'}}>₹{order.total}</span>
                   </div>
                </div>
                
                <div style={{padding:'2rem'}}>
                   <div style={{display:'flex', gap:'3rem', flexWrap:'wrap'}}>
                      <div style={{flex:'1', minWidth:'250px'}}>
                         <h4 style={{marginBottom:'1rem', color:'#fff', fontSize:'1.1rem'}}>Delivery Address:</h4>
                         <p style={{color:'#aaa', lineHeight:'1.6'}}>
                           <strong>{order.address.name}</strong><br/>
                           {order.address.street}<br/>
                           {order.address.city} - {order.address.zip}<br/>
                           Phone: {order.address.phone}
                         </p>
                      </div>
                      <div style={{flex:'2', minWidth:'300px'}}>
                         <h4 style={{marginBottom:'1rem', color:'#fff', fontSize:'1.1rem'}}>Items:</h4>
                         {order.items.map(item => (
                            <div key={item.id} style={{display:'flex', gap:'1rem', marginBottom:'1.5rem', alignItems:'center'}}>
                               <img src={`/${item.image}`} style={{width:'70px', height:'70px', objectFit:'cover', borderRadius:'8px'}} />
                               <div>
                                  <Link to={`/product/${item.id}`} style={{fontSize:'1.1rem', fontWeight:'bold', display:'block', marginBottom:'0.3rem'}}>{item.name}</Link>
                                  <span style={{color:'#aaa'}}>Qty: {item.quantity}  |  ₹{item.price} each</span>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          ))}
        </div>
      )}
    </main>
  );
}
