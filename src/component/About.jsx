import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

const About = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const result = await axios.get('http://127.0.0.1:8000/api/public/companies/1');
      setData(result.data); // Access the data property of the Axios response
      console.log(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Safely access the phone numbers after checking if data exists
  const phoneNumbers = data ? (Array.isArray(data.phone) ? data.phone.join(', ') : data.phone || 'N/A') : 'Loading...';

  if (!data) {
    return <div>Loading company data...</div>; // Or a more appropriate loading indicator
  }
  return (
    <div>
     <div className="container bg-white p-3 rounded">
            <div className="d-flex flex-column align-items-center">
                <div className="rounded overflow-hidden border border-secondary bg-white mb-3" style={{ width: '200px', height: '200px' }}>
                    <img
                        src={data.photo_url}
                        alt="Company Logo"
                        className="img-fluid object-cover w-100 h-100"
                    />
                </div>
                <div className="w-100" style={{ width: 'calc(100% - 200px)' }}>
                    <h3 className="text-center font-semibold text-xl">{data.name}</h3>

                    <div className="d-flex justify-content-between border-bottom border-secondary py-1 mt-3">
                        <strong>Email:</strong>
                        <p>{data.email}</p>
                    </div>
                    <div className="d-flex justify-content-between border-bottom border-secondary py-1">
                        <strong>Phone:</strong>
                        <p>{phoneNumbers}</p>
                    </div>
                    <div className="d-flex justify-content-between border-bottom border-secondary py-1">
                        <strong>Website Url:</strong>
                        <a
                            href={data.website}
                            target="__blank"
                            className="hover-underline text-decoration-none text-primary"
                        >
                            {data.website}
                        </a>
                    </div>
                    <div className="d-flex justify-content-between border-bottom border-secondary py-1">
                        <strong>Address:</strong>
                        <p>{data.address}</p>
                    </div>
                    <div className="d-flex justify-content-between border-bottom border-secondary py-1">
                        <strong>Description:</strong>
                        <p>{data.description}</p>
                    </div>
                    {data.store_locations && (
                        <div className="d-flex justify-content-between border-bottom border-secondary py-1">
                            <strong>Store Locations:</strong>
                            <p>{data.store_locations}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

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
                  <a href="#">
                    <i className="fa fa-envelope" aria-hidden="true" />
                    <span>demo@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 footer-col">
              <div className="footer_detail">
                <a href="index.html" className="footer-logo">Famms</a>
                <p>Necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with</p>
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
                © <span id="displayYear" /> All Rights Reserved By
                <a href="https://html.design/"> Free Html Templates</a><br />
                Distributed By <a href="https://themewagon.com/" target="_blank">ThemeWagon</a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      <Outlet />
    </div>
  );
};

export default About;
