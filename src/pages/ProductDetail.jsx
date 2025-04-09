import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await axios.get(`http://127.0.0.1:8000/api/public/user/products/${id}`);
        setProduct(result.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  const handleNext = () => {
    if (product?.image_urls?.length > 0) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % product.image_urls.length);
    }
  };

  const handlePrev = () => {
    if (product?.image_urls?.length > 0) {
      setActiveIndex((prevIndex) => (prevIndex - 1 + product.image_urls.length) % product.image_urls.length);
    }
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const { name, price, description, image_urls } = product;

  return (
    <div className="product-detail-page">
  <div className="container-detial">
    <div className="row">
      <div className="col-md-6">
        <div className="product-image">
          {image_urls && image_urls.length > 0 ? (
            <div id="carouselExample" className="carousel slide">
              <div className="carousel-inner">
                {image_urls.map((imageUrl, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <img
                      src={imageUrl}
                      className="d-block w-100"
                      alt={`${name} - Image ${index + 1}`}
                      style={{ objectFit: 'contain', maxHeight: '90vh' }}
                    />
                  </div>
                ))}
              </div>
              {image_urls.length > 1 && (
                <>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </>
              )}
            </div>
          ) : (
            <img
              src={product.image}
              alt={name}
              className="img-fluid"
              style={{ maxHeight: '90vh', objectFit: 'contain' }}
            />
          )}
        </div>
      </div>
      <div className="col-md-6">
        <div className="product-info">
          <h2 className="product-title">{name}</h2>
          <h6 className="product-price">${price}</h6>
          <p className="product-description">{description}</p>
          <div className="product-actions">
            <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default ProductDetail;