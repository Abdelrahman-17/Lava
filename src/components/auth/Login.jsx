import React, { useContext, useEffect, useState } from 'react'
import './Account.css'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext';
const Login = () => {
    const { currentUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const login = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!email || !password) {
            toast.success("Please fill out all the fields!");
            setLoading(false)
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            if (currentUser?.emailVerified === true) {
                //     await signOut(auth)
                toast.success("Signin successfully");
            }
            // navigate("/");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    }
    return (
        <>
            <ToastContainer />
            <div className='body'>
                <div className="wrapper">
                    <span className="icon-close">
                        <ion-icon id="close-outline" name="close-outline"></ion-icon> </span>
                    <div className="form-box login">
                        <h2>Login</h2>
                        <form>
                            <div className="input-box">
                                <span className="icon">
                                    <ion-icon name="mail"></ion-icon>
                                </span>
                                <input type="text" name="emaill" id="emaill" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <label>Email</label>
                            </div>
                            <div className="input-box">
                                <span className="icon">
                                    <ion-icon name="lock-closed"></ion-icon>
                                </span>
                                <input type="password" id="passwordd" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <label>Password</label>
                            </div>
                            <div className="remember-forget">
                                <label>
                                    <input type="checkbox" />
                                    Remember me
                                </label>
                            </div>

                            <button type="submit" onClick={login} className="btn" id="login_btn">
                                {`${loading ? `Login ....` : `Login`}`}
                            </button>
                            <div className="login-register">
                                <p>Don't have an acoount?
                                    <Link to="/Signup" className="register-link">Register</Link>
                                </p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login