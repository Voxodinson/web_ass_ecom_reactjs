//import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserImage from '../assets/images/user_image.jpg';
const Testimonial = () =>{
    const [data, setData] = useState([]);

    const fetchData = async () => {
      try {
          const result = await axios.get('http://127.0.0.1:8000/api/public/feedbacks');
          setData(result.data.data);
      } catch (error) {
          console.error("Error fetching products:", error);
      }
    };  
  
    useEffect(() => {
      fetchData();
    }, []);
    
    return(
        <div>
            <div>
            <section className="inner_page_head">
                <div className="container_fuild">
                <div className="row">
                    <div className="col-md-12">
                    <div className="full">
                        <h3>Testimonial</h3>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <section className="client_section layout_padding">
                <div className="container">
                <div className="heading_container heading_center">
                    <h2>
                    Customer's Testimonial
                    </h2>
                </div>
                <div id="carouselExample3Controls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {data.map((item, index) => (
                        <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={item.id}>
                        <div className="box col-lg-10 mx-auto">
                            <div className="img_container">
                            <div className="img-box">
                                <div className="img_box-inner">
                                <img src={item.image || UserImage} alt="client" />
                                </div>
                            </div>
                            </div>
                            <div className="detail-box">
                            <h5>{item.user_name || '------'}</h5>
                            <h6>{item.title}</h6>
                            <p>{item.description}</p>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                    <div className="carousel_btn_box">
                    <a className="carousel-control-prev" href="#carouselExample3Controls" role="button" data-slide="prev">
                        <i className="fa fa-long-arrow-left" aria-hidden="true" />
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExample3Controls" role="button" data-slide="next">
                        <i className="fa fa-long-arrow-right" aria-hidden="true" />
                        <span className="sr-only">Next</span>
                    </a>
                    </div>
                </div>
                </div>
            </section>
            <footer className="footer_section">
                <div className="container">
                <div className="row">
                    <div className="col-md-4 footer-col">
                    <div className="footer_contact">
                        <h4>
                        Reach at..
                        </h4>
                        <div className="contact_link_box">
                        <a href>
                            <i className="fa fa-map-marker" aria-hidden="true" />
                            <span>
                            Location
                            </span>
                        </a>
                        <a href>
                            <i className="fa fa-phone" aria-hidden="true" />
                            <span>
                            Call +01 1234567890
                            </span>
                        </a>
                        <a href>
                            <i className="fa fa-envelope" aria-hidden="true" />
                            <span>
                            demo@gmail.com
                            </span>
                        </a>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-4 footer-col">
                    <div className="footer_detail">
                        <a href="index.html" className="footer-logo">
                        Famms
                        </a>
                        <p>
                        Necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with
                        </p>
                        <div className="footer_social">
                        <a href>
                            <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                        <a href>
                            <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                        <a href>
                            <i className="fa fa-linkedin" aria-hidden="true" />
                        </a>
                        <a href>
                            <i className="fa fa-instagram" aria-hidden="true" />
                        </a>
                        <a href>
                            <i className="fa fa-pinterest" aria-hidden="true" />
                        </a>
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
                        © <span id="displayYear" /> All Rights Reserved By
                        <a href="https://html.design/">Free Html Templates</a><br />
                        Distributed By <a href="https://themewagon.com/" target="_blank">ThemeWagon</a>
                    </p>
                    </div>
                </div>
                </div>
            </footer>
            </div>

        </div>
    )
}
export default Testimonial;