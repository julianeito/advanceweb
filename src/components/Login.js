import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth, fs} from '../config/Firebase';
import { signInWithEmailAndPassword } from "firebase/auth";


export const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSignup = (e) => { 
        e.preventDefault(); 
        signInWithEmailAndPassword(auth,email,password).then(()=>{
            setSuccessMsg('Login Successful!. you will now redirected to Home page.');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setTimeout(() => {
                setSuccessMsg('');
                history.push('./Home'); // Navigate to home page
            }, 3000);
        }).catch((error) => {
            setErrorMsg(error.message)
        })
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="text-center">Login</h1>
                        </div>
                        <div className="card-body">
                            {successMsg && <div className="alert alert-success">{successMsg}</div>}
                            <form autoComplete="off" onSubmit={handleSignup}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <div className="input-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                        />
                                    </div>
                                </div>
                                <div className="text-center mb-3">
                                    <button type="submit" className="btn btn-primary btn-md" style={{ marginTop: "10px" }}>Login</button>
                                </div>
                            </form>
                            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                        </div>
                        <div className="card-footer">
                            <p className="text-center">No account yet? <Link to="/signup">Sign up here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;
