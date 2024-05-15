import React, { useState, useEffect, useContext } from "react";
import Navbar2 from "./Navbar2";
import { auth, fs } from "../config/Firebase";
import { useHistory } from "react-router-dom";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import Products from "./Products";
import { AuthContext } from "./AuthContext";
import './IndividualProduct.css';

const productCollectionRef = collection(fs, "tblProducts");

export const Home = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const userDoc = doc(fs, "tblUsers", currentUser.uid);
        const userSnapshot = await getDoc(userDoc);
        setUser(userSnapshot.data().Fullname);
      };
      fetchUserData();
    } else {
      setUser(null);
      history.push("/login");
    }
  }, [currentUser, history]);

  const getProducts = async () => {
    const productsData = await getDocs(productCollectionRef);
    setProducts(productsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="hero_area">
      <header className="header_section">
        <Navbar2 user={user} />
        <br />
      </header>
      {/* Slider section */}
      <section className="slider_section position-relative">
        <div className="container">
          {/* Carousel */}
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              {/* Carousel Items */}
              <div className="carousel-item active">
                <div className="row">
                  <div className="col">
                    <div className="detail-box">
                      <div>
                        <h2>welcome to</h2>
                        <h1>Lorem ipsum</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Add more carousel items as needed */}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div>
            {products.length > 0 ? (
              <div className="container-fluid">
                <h1 className="text-center">Products</h1>
                <div className="products-container">
                  <Products products={products} />
                </div>
              </div>
            ) : (
              <div className="container-fluid text-center">Please wait...</div>
            )}
          </div>
        </div>
      </section>

      {/* info section */}
      <section className="info_section">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="info_contact">
                <h5>About Shop</h5>
                <div>
                  <div className="img-box">
                    <img src="images/location-white.png" width="18px" alt="" />
                  </div>
                  <p>Address</p>
                </div>
                <div>
                  <div className="img-box">
                    <img src="images/telephone-white.png" width="12px" alt="" />
                  </div>
                  <p>+01 1234567890</p>
                </div>
                <div>
                  <div className="img-box">
                    <img src="images/envelope-white.png" width="18px" alt="" />
                  </div>
                  <p>demo@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info_info">
                <h5>Informations</h5>
                <p>ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info_insta">
                <h5>Instagram</h5>
                <div className="insta_container">
                  <div>
                    <a href="">
                      <div className="insta-box b-1">
                        <img src="images/insta.png" alt="" />
                      </div>
                    </a>
                    <a href="">
                      <div className="insta-box b-2">
                        <img src="images/insta.png" alt="" />
                      </div>
                    </a>
                  </div>
                  <div>
                    <a href="">
                      <div className="insta-box b-3">
                        <img src="images/insta.png" alt="" />
                      </div>
                    </a>
                    <a href="">
                      <div className="insta-box b-4">
                        <img src="images/insta.png" alt="" />
                      </div>
                    </a>
                  </div>
                  <div>
                    <a href="">
                      <div className="insta-box b-3">
                        <img src="images/insta.png" alt="" />
                      </div>
                    </a>
                    <a href="">
                      <div className="insta-box b-4">
                        <img src="images/insta.png" alt="" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info_form ">
                <h5>Newsletter</h5>
                <form action="">
                  <input type="email" placeholder="Enter your email" />
                  <button>Subscribe</button>
                </form>
                <div className="social_box">
                  <a href="">
                    <img src="images/fb.png" alt="" />
                  </a>
                  <a href="">
                    <img src="images/twitter.png" alt="" />
                  </a>
                  <a href="">
                    <img src="images/linkedin.png" alt="" />
                  </a>
                  <a href="">
                    <img src="images/youtube.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer section */}
      <section className="container-fluid footer_section">
        <p>
          &copy; 2020 All Rights Reserved By
          <a href="https://html.design/">Free Html Templates</a>
          Distributed By <a href="https://themewagon.com">ThemeWagon</a>
        </p>
      </section>
      <script type="text/javascript" src="js/jquery-3.4.1.min.js"></script>
      <script type="text/javascript" src="js/bootstrap.js"></script>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" />
    </div>
  );
};

export default Home;
