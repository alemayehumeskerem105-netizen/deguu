import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const categories = [
  { name: 'Crops', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS43oUFCFC9BRGHyonBJ4Z7pVh61hB4USZssA&s', query: 'crops',path: '/crops'  },
  { name: 'Vegetables', img: 'https://img.freepik.com/premium-photo/high-angle-view-chopped-vegetables-leaves_1048944-13164214.jpg?semt=ais_hybrid&w=740&q=80', query: 'vegetables',path:'marketplace?category=vegetables' },
  { name: 'Livestock', img: 'https://media.istockphoto.com/id/884747768/photo/cows-and-cattle-in-the-omo-valley-of-ethiopia.jpg?s=612x612&w=0&k=20&c=taXyG2VROAXbx-MFhrmcXdWY7fdhdx4s3nfmL3s_eTY=', query: 'livestock',path: '/livestock' },
  { name: 'Fruits', img: 'https://png.pngtree.com/thumb_back/fh260/background/20240509/pngtree-fresh-fruit-water-3d-ai-image-image_15727757.jpg', query: 'fruits' },
];

// Hero background images (Ethiopian farms)
const heroImages = [
  'https://thumbs.dreamstime.com/b/ploughing-10456947.jpg?w=768',
  'https://thumbs.dreamstime.com/b/ethiopian-farmer-tilling-his-field-blue-nile-falls-ethiopia-43781323.jpg?w=768',
  'https://thumbs.dreamstime.com/b/teff-23897057.jpg?w=768',
  'https://thumbs.dreamstime.com/b/ethiopian-farmer-using-his-cows-threshing-harvest-addis-ababa-ethiopia-may-herd-oxen-54311160.jpg?w=992',
];

function Home({ user }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentHero, setCurrentHero] = useState(0);
   const navigate = useNavigate();
const handleCategoryClick = (path) => {
    navigate(path); // Navigate to category page
  };


  // Rotate hero images every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url('${heroImages[currentHero]}')` }}
      >
        <div className="hero-overlay">
          <h1>Connect Farmers & Buyers Seamlessly</h1>
          <p>Find trusted farmers, buy fresh products, and grow your business.</p>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search for products..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Link to={`/marketplace?search=${searchQuery}`} className="search-btn">
              Search
            </Link>
          </div>

          {/* CTA Buttons */}
          {!user && (
            <div className="cta-buttons">
              <Link to="/signup" className="btn-primary">Join as Farmer</Link>
              <Link to="/signup" className="btn-secondary">Join as Buyer</Link>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Explore Categories</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link key={cat.name} to={`/marketplace?category=${cat.query}`} className="category-card">
              <img src={cat.img} alt={cat.name} />
              <h3>{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="carousel">
          {[1, 2, 3, 4].map((id) => (
            <div key={id} className="product-card">
              <img
                src={`https://www.cgiar.org/news-events/news/transforming-ethiopias-agriculture-through-agronomy-innovation-the-landscape-segmented-fertilizer-advisory/`}
                alt={`Product ${id}`}
              />
              <h4>Product {id}</h4>
              <p>$ {id * 10}</p>
              <Link to={`/product/${id}`} className="btn-primary">View</Link>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span>1</span>
            <h3>Sign Up</h3>
            <p>Create your account as a farmer or buyer.</p>
          </div>
          <div className="step">
            <span>2</span>
            <h3>List or Find Products</h3>
            <p>Farmers list products, buyers browse the marketplace.</p>
          </div>
          <div className="step">
            <span>3</span>
            <h3>Connect & Trade</h3>
            <p>Chat, negotiate, and complete orders securely.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"This platform helped me sell my vegetables faster than ever!"</p>
            <h4>- Farmer Bekele</h4>
          </div>
          <div className="testimonial-card">
            <p>"Buying fresh products directly from farmers is amazing."</p>
            <h4>- Buyer Almaz</h4>
             
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to start trading?</h2>
        <Link to="/signup" className="btn-primary">Get Started</Link>
      </section>
    </div>
  );
}

export default Home;
