import React, { useState, useEffect, useContext } from "react";
import Navbar2 from "./Navbar2";
import { fs } from "../config/Firebase";
import { useHistory } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { AuthContext } from "./AuthContext";

const productCollectionRef = collection(fs, "tblProducts");

const Contacts = () => {
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
      history.push("/Login");
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
    <>
     <body class="sub_page">
      <div className="hero_area">
      <header class="header_section">
      <div class="container-fluid">
      <Navbar2 user={user} />
        </div>
    </header>
      </div>
      
      <section className="contact_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>Request A Call Back</h2>
          </div>
          <div>
            <div>
              <div className="row">
                <div className="col-md-9 mx-auto">
                  <div className="contact-form">
                    <form action="">
                      <div>
                        <input type="text" placeholder="Full Name" />
                      </div>
                      <div>
                        <input type="text" placeholder="Phone Number" />
                      </div>
                      <div>
                        <input type="email" placeholder="Email Address" />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Message"
                          className="input_message"
                        />
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn_on-hover">
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="map_img-box">
            <img src="images/map-img.png" alt="" />
          </div>
        </div>
      </section>
      
      <section className="info_section ">
        {/* Removed info section */}
      </section>
      <section className="container-fluid footer_section">
        <p>
          &copy; 2020 All Rights Reserved By
          <a href="https://html.design/">Free Html Templates</a>
          Distributed By <a href="https://themewagon.com">ThemeWagon</a>
        </p>
      </section>
      </body>
    </>
  );
};

export default Contacts;