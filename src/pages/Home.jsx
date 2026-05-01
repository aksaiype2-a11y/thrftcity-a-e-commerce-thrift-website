import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewArrivals() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(4);
      
      if (error) {
        console.error("Error fetching new arrivals:", error);
      } else {
        setNewArrivals(data || []);
      }
      setLoading(false);
    }
    
    fetchNewArrivals();
  }, []);

  return (
    <main>
      <section className="hero fade-in">
        <div className="hero-overlay"></div>
        <div className="container hero-content" style={{ textAlign: "center", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 className="hero-title">Own Your <span>Aesthetic.</span></h1>
          <p className="hero-desc">Curated vintage and modern thrift pieces. High fashion, low impact.</p>
        </div>
      </section>

      <section className="container" style={{ padding: "4rem 20px", textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
        <p style={{ fontSize: "1.2rem", color: "#ccc", lineHeight: "1.6" }}>
          ThrftCity is your ultimate destination for curated vintage and modern second-hand fashion. We specialize in sourcing the best high-quality streetwear, classic pieces, and sustainable fashion choices so you can own your aesthetic without the environmental guilt. Whether you are hunting for rare sneakers or the perfect retro jacket, we've got you covered.
        </p>
      </section>

      <section className="container" style={{ padding: "2rem 20px 4rem" }}>
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "2rem" }}>New Collection</h2>
        {loading ? (
          <div style={{textAlign: "center", padding: "2rem 0"}}>
             <div className="spinner"></div>
          </div>
        ) : (
          <div className="products-grid-4col">
            {newArrivals.map(p => (
              <div className="grid-item" key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link to="/shop" className="btn-secondary">Shop the Collection</Link>
        </div>
      </section>
    </main>
  );
}
