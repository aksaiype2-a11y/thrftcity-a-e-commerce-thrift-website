import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { User, Package, Heart, LogOut } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useShop();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  
  // State for form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [pincode, setPincode] = useState('');
  const [isFetchingZip, setIsFetchingZip] = useState(false);

  // Load existing metadata when user changes
  useEffect(() => {
    if (user && user.user_metadata) {
      setFullName(user.user_metadata.full_name || '');
      setPhone(user.user_metadata.phone || '');
      setStreet(user.user_metadata.street_address || '');
      setLandmark(user.user_metadata.landmark || '');
      setCity(user.user_metadata.city || '');
      setStateName(user.user_metadata.state || '');
      setPincode(user.user_metadata.pincode || '');
    }
  }, [user]);

  if (!user) {
    return (
      <main className="container" style={{ padding: '6rem 20px', textAlign: 'center', minHeight: '60vh' }}>
        <h2>You are not logged in</h2>
        <button onClick={() => navigate('/login')} className="btn-primary" style={{ marginTop: '2rem' }}>Go to Login</button>
      </main>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone: phone,
          street_address: street,
          landmark: landmark,
          city: city,
          state: stateName,
          pincode: pincode
        }
      });
      
      if (error) throw error;
      toast.success('Profile updated successfully!', {
        style: { background: '#1a1a1a', color: '#fff', border: '1px solid #39ff14' },
        iconTheme: { primary: '#39ff14', secondary: '#000' }
      });
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleZipChange = async (e) => {
    const value = e.target.value;
    setPincode(value);

    if (value.length === 6 && /^\d+$/.test(value)) {
      setIsFetchingZip(true);
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await response.json();
        
        if (data && data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice.length > 0) {
          const postOffice = data[0].PostOffice[0];
          setCity(postOffice.District || postOffice.Block || postOffice.Region);
          setStateName(postOffice.State);
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

  const userInitial = user.user_metadata?.full_name 
    ? user.user_metadata.full_name.charAt(0).toUpperCase() 
    : user.email.charAt(0).toUpperCase();

  return (
    <main style={{ minHeight: '80vh', display: 'flex', background: '#121212', color: '#fff' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '280px', background: '#1a1a1a', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', borderRight: '1px solid #222' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#39ff14', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {userInitial}
          </div>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{user.user_metadata?.full_name || 'ThrftCity User'}</h3>
          <p style={{ color: '#aaa', fontSize: '0.9rem', marginTop: '0.2rem', wordBreak: 'break-all' }}>{user.email}</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '2rem' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '12px 16px', background: '#252525', border: 'none', borderRadius: '8px', color: '#39ff14', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', width: '100%', textAlign: 'left' }}>
            <User size={20} /> Personal Info
          </button>
          <button onClick={() => navigate('/orders')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '12px 16px', background: 'transparent', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', width: '100%', textAlign: 'left', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#222'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
            <Package size={20} /> Order History
          </button>
          <button onClick={() => navigate('/wishlist')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '12px 16px', background: 'transparent', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', width: '100%', textAlign: 'left', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#222'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
            <Heart size={20} /> Wishlist
          </button>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '12px 16px', background: 'transparent', border: 'none', borderRadius: '8px', color: '#ff4444', cursor: 'pointer', fontSize: '1rem', fontWeight: '500', width: '100%', textAlign: 'left', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#222'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <section style={{ flex: 1, padding: '3rem 4rem', background: '#121212', overflowY: 'auto' }}>
        <form onSubmit={handleSaveProfile} style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Personal Information Section */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>Personal Information</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', textAlign: 'center' }}>Full Name</label>
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '14px', background: '#252525', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem' }}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', textAlign: 'center' }}>Phone Number</label>
                <input 
                  type="tel" 
                  style={{ width: '100%', padding: '14px', background: '#252525', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem' }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', textAlign: 'center' }}>Email Address</label>
              <input 
                type="email" 
                disabled
                style={{ width: '100%', padding: '14px', background: '#1a1a1a', color: '#888', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'not-allowed', textAlign: 'center' }}
                value={user.email}
              />
            </div>
          </div>

          {/* Shipping Address Section */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>Shipping Address</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', textAlign: 'center' }}>Street Address</label>
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '14px', background: '#252525', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem' }}
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="123 Main St, Apartment 4B"
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', textAlign: 'center' }}>Landmark</label>
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '14px', background: '#252525', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem' }}
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="Near City Park"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem', color: '#ccc' }}>
                  <span>Pincode</span>
                  {isFetchingZip && <span style={{color: '#39ff14', fontSize: '0.8rem'}}>Fetching...</span>}
                </label>
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '14px', background: '#252525', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem' }}
                  value={pincode}
                  onChange={handleZipChange}
                  placeholder="400001"
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', textAlign: 'center' }}>City</label>
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '14px', background: '#252525', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem' }}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Mumbai"
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc', textAlign: 'center' }}>State</label>
                <input 
                  type="text" 
                  style={{ width: '100%', padding: '14px', background: '#252525', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem' }}
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  placeholder="Maharashtra"
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '14px 40px', fontSize: '1.1rem', borderRadius: '8px', fontWeight: 'bold' }}>
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
