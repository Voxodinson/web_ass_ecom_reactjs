import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Product() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
        const result = await axios.get('http://127.0.0.1:8000/api/public/user/products');
        setData(result.data.data);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
  };  

  useEffect(() => {
    fetchData();
  }, []);
  
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if product already exists in the cart
    } else {
      cart.push({ ...product, quantity: 1 }); // Add new product with quantity 1
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  // Buy Now Function
  const handleBuyNow = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity
    } else {
      cart.push({ ...product, quantity: 1 }); // Add new product
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = '/checkout'; // Redirect to the checkout page
  };

  const [successMessage, setSuccessMessage] = useState('');

  const addToCart = (product) => {
    const storedCart = localStorage.getItem('cart');
    const cartItems = storedCart ? JSON.parse(storedCart) : [];
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity = (cartItems[existingItemIndex].quantity || 1) + 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Set the success message
    setSuccessMessage(`${product.name} added to cart!`);

    // Clear the success message after a short delay (e.g., 3 seconds)
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <>
      {/* Inner Page Section */}
      <section className="inner_page_head">
        <div className="container_fuild">
          <div className="row">
            <div className="col-md-12">
              <div className="full">
                <h3>Product Grid</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="product_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>
              Our <span>Products</span>
            </h2>
          </div>
          <div className="product-grid">
                {data.map(product => (
                    <div key={product.id} className="product-card">
                        <Link to={`/product/${product.id}`}>
                          <div className="product-image">
                              <img 
                                src={product.image} 
                                alt={product.title} 
                                />
                          </div>
                        </Link>
                        <div className="product-details">
                            <h5 className="product-title">{product.name}</h5>
                            <p className="text-truncate d-block" style={{ maxWidth: '100%' }}>
                              {product.description}
                            </p>
                            <h6 className="product-price">${product.price}</h6>
                        </div>
                        <div className="product-actions">
                            <div className="action-buttons">
                                <button 
                                  onClick={() => handleAddToCart(product)}
                                  className='btn-add'>
                                    Add to card
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                </div>

        </div>
      </section>
      {/* End Product Section */}

      {/* Footer Section */}
      <footer className="footer_section">
        <div className="container">
          <div className="row">
            <div className="col-md-4 footer-col">
              <div className="footer_contact">
                <h4>Reach at..</h4>
                <div className="contact_link_box">
                  <a href="#">
                    <i className="fa fa-map-marker" aria-hidden="true" />
                    <span>Location</span>
                  </a>
                  <a href="#">
                    <i className="fa fa-phone" aria-hidden="true" />
                    <span>Call +01 1234567890</span>
                  </a>
                  <a href="mailto:demo@gmail.com">
                    <i className="fa fa-envelope" aria-hidden="true" />
                    <span>demo@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 footer-col">
              <div className="footer_detail">
                <a href="/" className="footer-logo">
                  Famms
                </a>
                <p>
                  Necessary, making this the first true generator on the
                  Internet. It uses a dictionary of over 200 Latin words,
                  combined with...
                </p>
                <div className="footer_social">
                  <a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a>
                  <a href="#"><i className="fa fa-twitter" aria-hidden="true" /></a>
                  <a href="#"><i className="fa fa-linkedin" aria-hidden="true" /></a>
                  <a href="#"><i className="fa fa-instagram" aria-hidden="true" /></a>
                  <a href="#"><i className="fa fa-pinterest" aria-hidden="true" /></a>
                </div>
              </div>
            </div>
            <div className="col-md-4 footer-col">
              <div className="map_container">
                <div className="map">
                  <div id="googleMap" />
                </div>
              </div>
            </div>
          </div>
          <div className="footer-info">
            <div className="col-lg-7 mx-auto px-0">
              <p>
                © {new Date().getFullYear()} All Rights Reserved By{' '}
                <a href="https://html.design/">Free Html Templates</a>
                <br />
                Distributed By{' '}
                <a href="https://themewagon.com/" target="_blank" rel="noopener noreferrer">
                  ThemeWagon
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Product;
