import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth, fs } from '../config/Firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
export const Signup = () => {
    const history = useHistory();
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const handleSignup = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password).then(
            async (userCredential) => {
                const ref = doc(fs, "tblUsers", userCredential.user.uid)
                const docRef = await setDoc(ref, {
                    Fullname: fullName,
                    Email: email,
                    Contact: contact,
                    Address: address,
                    Password: password
                })
                setSuccessMsg('Signup Successful. You will now redirect to Login')
                setFullName('');
                setAddress('');
                
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(() => {
                    setSuccessMsg('');
                    history.push('/login'); // Navigate to login page
                }, 3000);
            }).catch((error) => {
                setErrorMsg(error.message)
            })
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="text-center">Sign-Up</h1>
                        </div>
                        <div className="card-body">
                            {successMsg && <div className="alert alert-success">{successMsg}</div>}
                            <form className="form-group" autoComplete="off" onSubmit={handleSignup}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" required
                                        onChange={(e) => setFullName(e.target.value)} value={fullName}></input>
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" className="form-control" required
                                        onChange={(e) => setAddress(e.target.value)} value={address}></input>
                                </div>
                                <div className="form-group">
                                    <label>Contact</label>
                                    <input type="tel" className="form-control" required
                                        onChange={(e) => setContact(e.target.value)} value={contact}></input>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" required
                                        onChange={(e) => setEmail(e.target.value)} value={email}></input>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <div className="input-group">
                                        <input type="password" className="form-control" required
                                            onChange={(e) => setPassword(e.target.value)} value={password}></input>
                                    </div>
                                </div>
                                <div className="text-center mb-3">
                                    <button type="submit" className="btn btn-primary btn-md"
                                        style={{ marginTop: "10px" }}>Sign-up</button>
                                </div>
                            </form>
                            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                        </div>
                        <div className="card-footer">
                            <p className="text-center">Already have an account? <Link to="/login">Login here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Signup;
