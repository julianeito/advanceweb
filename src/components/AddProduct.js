import React, { useState, useContext, useEffect } from 'react';
import Navbar2 from './Navbar2';
import { storage, fs } from '../config/Firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { AuthContext } from "./AuthContext";

const productsCollectionRef = collection(fs, 'tblProducts');

const AddProduct = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [UploadError, setUploadError] = useState('');

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const userDoc = doc(fs, 'tblUsers', currentUser.uid);
        const userSnapshot = await getDoc(userDoc);
        setUser(userSnapshot.data().Fullname);
      };

      fetchUserData();
    }
  }, [currentUser]);

  const handleAdProductsImg = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];
      if (types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError('');
      } else {
        setImage(null);
        setImageError('Please select a valid file type (png or jpg)');
      }
    }
  };

  const handleAddProducts = (e) => {
    e.preventDefault();
    if (image) {
      const imgRef = ref(storage, `tblProducts/${image.name}`);
      uploadBytes(imgRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          addDoc(productsCollectionRef, {
            prodTitle: title,
            prodDesc: description,
            prodPrice: Number(price),
            prodQty: Number(qty),
            prodURL: url,
            timeStamp: serverTimestamp()
          }).then(() => {
            setSuccessMsg('Product added successfully');
            setTitle('');
            setDescription('');
            setPrice('');
            setQty('');
            setImage(null);
            setImageError('');
            setUploadError('');
          }).catch(error => setUploadError(error.message));
        });
      });
    }
  };

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
          {/* <div className="heading_container"> */}
            <h1>Add Product</h1>
          {/* </div> */}
          <div>
            <div>

                {successMsg&&<>
                  <div className="alert alert-success">{successMsg}</div>
                  <br></br>
                </>}
            
        
                    <form autoComplete='off' className='form-group' onSubmit={handleAddProducts}>
                  <label>Product Title</label>
                  <input type="text" className='form-control' required
                  onChange={(e) =>setTitle(e.target.value)} value={title}></input>
                  <br></br>
                  <label>Product Description</label>
                  <input type="text" className='form-control' required
                   onChange={(e) =>setDescription(e.target.value)} value={description}></input>
                  <br></br>
                  <label>Product Price</label>
                  <input type="number" className='form-control' required
                  onChange={(e)=>setPrice(e.target.value)} value={price}></input>
                  <br></br>
                  <label>Qty.</label>
                  <input type="number" className='form-control' required
                  onChange={(e)=>setQty(e.target.value)} value={qty}></input>
                  <br></br>
                  <label>Upload Product Image</label>
                  <input type="file" id='file' className='form-control' required
                   onChange={handleAdProductsImg}></input>
                   {imageError&&<>
                    <br></br>
                    <div className="alert alert-danger">{imageError}</div>
                   </>}
                  <br></br>
                  <br></br>

                  <div className="text-center mb-3">
                    <button type="submit" className='btn btn-success btn-md'>
                        SUBMIT
                    </button>
                  </div>
                    </form>
                    {UploadError&&<>
                    <br></br>
                    <div className="alert alert-danger">{UploadError}</div>
                    </>}
            
            </div>
          </div>
        </div>
      </section>
      </body>
    </>
  );
};
export default AddProduct;