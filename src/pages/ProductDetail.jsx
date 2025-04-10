import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChevronLeft, ChevronRight, Star, StarHalf, StarOutline } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await axios.get(`http://127.0.0.1:8000/api/public/user/products/${id}`);
        setProduct(result.data);
        console.log(result.data)
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
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find((item) => item.id === product.id && item.size === selectedSize);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, size: selectedSize, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating); // Full stars (integer part)
    const half = rating % 1 >= 0.5;  // Half star condition
    const empty = 5 - full - (half ? 1 : 0); // Empty stars to make the total 5
  
    return (
      <>
        {Array(full).fill().map((_, i) => (
          <Star key={`full-${i}`} fill="yellow" className="text-warning me-1" />
        ))}
        {half && <StarHalf key={`half`} fill="yellow" className="text-warning me-1" />}
        {Array(empty).fill().map((_, i) => (
          <Star key={`empty-${i}`} className="text-warning me-1" />
        ))}
      </>
    );
  };

  if (loading) return <div className="text-center py-5">Loading product details...</div>;
  if (error) return <div className="text-center text-danger py-5">Error: {error}</div>;
  if (!product) return <div className="text-center py-5">Product not found.</div>;

  const { name, price, description, image_urls, rating, sizes } = product;

  return (
    <div className="">
      <Button
        variant="outline-secondary"
        onClick={() => navigate(-1)} 
        className='ml-4 bg-primary text-white'
      >
        <ChevronLeft/> Back
      </Button>
      <Container fluid className=" d-flex align-items-center justify-content-center bg-light">

        <Card className="w-100 h-100 mt-3 overflow-hidden border-0">
          <Row className="h-100 g-0">
            {/* Left Column with Carousel */}
            <Col md={7} className="position-relative d-flex">
              {image_urls && image_urls.length > 0 ? (
                <Row className="w-100 m-0">
                  <Col xs={10} className="d-flex align-items-center justify-content-center p-2">
                      <div
                        style={{
                          width: '700px',
                          height: '600px',
                          overflow: 'hidden',
                          borderRadius: '6px',
                          boxShadow: '0 0 15px rgba(0,0,0,0.1)',
                          position: 'relative',
                          border: '1px solid rgb(180, 176, 176)'
                        }}
                      >
                        <img
                          src={image_urls[activeIndex]}
                          alt={`Product - ${activeIndex + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        
                        {image_urls.length > 1 && (
                          <>
                            <Button
                              variant="light"
                              size="sm"
                              onClick={() => setActiveIndex((prev) => (prev - 1 + image_urls.length) % image_urls.length)}
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '10px',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                opacity: 0.8,
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                              }}>
                              <ChevronLeft />
                            </Button>
                            <Button
                              variant="light"
                              size="sm"
                              onClick={() => setActiveIndex((prev) => (prev + 1) % image_urls.length)}
                              style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                zIndex: 10,
                                opacity: 0.8,
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                              }}
                            >
                              <ChevronRight/>
                            </Button>
                          </>
                        )}
                      </div>
                    </Col>

                  <Col className="py-2 overflow-auto">
                    <div className="d-flex flex-column gap-2 align-items-center">
                      {image_urls.map((img, index) => (
                        <Image
                          key={index}
                          src={img}
                          thumbnail
                          onClick={() => setActiveIndex(index)}
                          style={{
                            cursor: 'pointer',
                            border: index === activeIndex ? '2px solid #007bff' : '1px solid #ddd',
                            height: '60px',
                            width: '60px',
                            objectFit: 'cover',
                          }}
                        />
                      ))}
                    </div>
                  </Col>
                </Row>
              ) : (
                <div className="w-100 d-flex align-items-center justify-content-center">
                  <img
                    src={product.image}
                    alt={name}
                    className="img-fluid"
                    style={{ width: '500px', height: '500px', objectFit: 'cover' }}
                  />
                </div>
              )}
            </Col>

            {/* Right Column with Product Info */}
            <Col md={5} className="p-5 d-flex flex-column justify-content-between bg-white">
              <div>
                <h2 className="fw-bold mb-2">{name}</h2>
                <h5 className="text-danger">${price}</h5>
                <div className="mb-3">{renderStars(rating)}{rating}</div>
                <p className="text-muted">{description}</p>

                {/* Size Selection */}
                {sizes && sizes.length > 0 && (
                  <div className="mb-3">
                    <strong>Select Size</strong>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {sizes.map((size, i) => (
                        <Button
                          key={i}
                          variant={selectedSize === size ? 'primary' : 'outline-secondary'}
                          onClick={() => setSelectedSize(size)}
                          size="sm"
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}


              <div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-100 mt-4"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
    
  );
};

export default ProductDetail;
