import React, { useState, useEffect } from 'react';

export default function Merchant({ username }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Fetch products from SQLite backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to load products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!title.trim() || !price.trim()) {
      alert('Product title and price are required.');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          price: parseFloat(price) || 0.0,
          description,
          image_url: imageUrl.trim() || 'https://via.placeholder.com/200?text=Product'
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert('Product added successfully!');
        setProducts([...products, data.product]);
        
        // Clear inputs
        setTitle('');
        setPrice('');
        setDescription('');
        setImageUrl('');
      } else {
        alert(data.error || 'Failed to add product');
      }
    } catch (err) {
      console.error(err);
      alert('Could not connect to the backend server.');
    }
  };

  return (
    <>
      <header className="page-header">
        <h1>Merchant Dashboard</h1>
        <p>Welcome, <strong>{username || 'Merchant Admin'}</strong>. Manage your Chinese manufacturer products catalog.</p>
      </header>

      <section className="content-section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <form onSubmit={handleAddProduct} className="form" style={{ marginBottom: '40px' }}>
            <h2>Add New Product</h2>
            
            <label>Product Name</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. Industrial Solar Panels" 
              required 
            />

            <label>Price ($ USD)</label>
            <input 
              type="number" 
              step="0.01" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              placeholder="e.g. 120.00" 
              required 
            />

            <label>Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Enter product details..."
            />

            <label>Image URL</label>
            <input 
              type="text" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
              placeholder="https://via.placeholder.com/200?text=Solar" 
            />

            <button type="submit">Add Product</button>
          </form>

          <h3 style={{ fontSize: '1.5rem', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px', color: 'var(--primary-green)' }}>
            Your Published Products Catalog
          </h3>

          {loading ? (
            <p>Loading products from sqlite database...</p>
          ) : (
            <div className="grid">
              {products.map((p) => (
                <div className="card" key={p.id || p.title}>
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  ) : (
                    <div className="placeholder" style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
                      No Image
                    </div>
                  )}
                  <div style={{ padding: '15px' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>{p.title}</h3>
                    <p className="price" style={{ color: 'var(--primary-green)', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '10px' }}>
                      ${p.price.toFixed(2)}
                    </p>
                    <p className="desc" style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.4' }}>{p.description}</p>
                  </div>
                </div>
              ))}
              {products.length === 0 && <p>No products yet.</p>}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
