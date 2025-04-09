import React from 'react';
import { Outlet } from 'react-router-dom';

function Contact() {
  return (
     <div>
        <div>
        {/* inner page section */}
        <section className="inner_page_head">
            <div className="container_fuild">
            <div className="row">
                <div className="col-md-12">
                <div className="full">
                    <h3>Contact us</h3>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* end inner page section */}
        {/* why section */}
        <section className="why_section layout_padding">
            <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                <div className="full">
                    <form action="index.html">
                    <fieldset>
                        <input type="text" placeholder="Enter your full name" name="name" required />
                        <input type="email" placeholder="Enter your email address" name="email" required />
                        <input type="text" placeholder="Enter subject" name="subject" required />
                        <textarea placeholder="Enter your message" required defaultValue={""} />
                        <input type="submit" defaultValue="Submit" />
                    </fieldset>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* end why section */}
        {/* arrival section */}
        <section className="arrival_section">
            <div className="container">
            <div className="box">
                <div className="arrival_bg_box">
                <img src="images/arrival-bg.png" alt />
                </div>
                <div className="row">
                <div className="col-md-6 ml-auto">
                    <div className="heading_container remove_line_bt">
                    <h2>
                        #NewArrivals
                    </h2>
                    </div>
                    <p style={{marginTop: 20, marginBottom: 30}}>
                    Vitae fugiat laboriosam officia perferendis provident aliquid voluptatibus dolorem, fugit ullam sit earum id eaque nisi hic? Tenetur commodi, nisi rem vel, ea eaque ab ipsa, autem similique ex unde!
                    </p>
                    <a href>
                    Shop Now
                    </a>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* end arrival section */}
        {/* footer section */}
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
  );
}
export default Contact;