import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add to Cart Function
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
          <div className="row">
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading &&
              !error &&
              products.map((product) => (
                <div key={product.id} className="col-sm-6 col-md-4 col-lg-4">
                  <div className="box">
                    <div className="option_container">
                      <div className="options">
                        <button
                          className="option1"
                          onClick={() =>
                            handleAddToCart({
                              id: product.id,
                              title: product.title,
                              price: product.price,
                              image: product.image,
                            })
                          }
                        >
                          Add To Cart
                        </button>
                        <button
                          className="option2"
                          onClick={() =>
                            handleBuyNow({
                              id: product.id,
                              title: product.title,
                              price: product.price,
                              image: product.image,
                            })
                          }
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                    <div className="img-box">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className="detail-box">
                      <h5>{product.title}</h5>
                      <h6>${product.price.toFixed(2)}</h6>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="btn-box">
            <a href="/products">View All Products</a>
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
