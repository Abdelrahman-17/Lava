import React, { useEffect, useState } from 'react'
import { auth, db } from "../../firebase/config";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    updateProfile
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import './Account.css'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../loader/Loader';
const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setcPassword] = useState("");
    const [loading, setLoading] = useState(false);
    // hash_config {
    //     algorithm: SCRYPT,
    //     base64_signer_key: SpZ2Cc1uoPcOkhJxli/WcCd2EIXbd9XYW5iEkCrbnZADq2n73aOhqQpXD3uSaUnftQrQHPgdbHoNbGhSeuMjsA==,
    //     base64_salt_separator: Bw==,
    //     rounds: 8,
    //     mem_cost: 14,
    //   }
    const navigate = useNavigate()
    const register = async (e) => {
        e.preventDefault();
        setLoading(true);
        // let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
        // let emailw = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        // let validateUser = username !== "" && username.length > 6 && username.length < 20
        // let validateEmail = email !== "" && email.match(emailw)
        // let validatePass = password !== "" && password.match(passw)
        // let validateconfPass = cPassword !== "" && cPassword === password
        // let validatePhone = phone !== "" && phone.length === 11
        // if (validateUser && validatePass && validateEmail && validateconfPass && validatePhone) {
        // if (!username || !phone || !email || !password || !cPassword) {
        //     setLoading(false)
        //     toast.error("Please fill out all the fields!");
        //     return;
        // }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            user.phoneNumber = phone
            await updateProfile(user, {
                // uid:`${userId}`,
                displayName: username,
            });
            // await updatePhoneNumber(user, phone)
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: username,
                phoneNumber: phone,
                password: user.reloadUserInfo.passwordHash,
            });
            await sendEmailVerification(auth.currentUser);
            await signOut(auth)
            // window.location.reload()
            // toast.success("add user successfully")
            toast.success("check your Email inbox to verified your email")
            setLoading(false)
            // navigate('/')
        }
        catch (error) {
            // setUsername("")
            // setEmail("")
            // setPassword("")
            // setcPassword('')
            // setPhone("")
            setLoading(false);
            toast.error(error.message);
        }
        // }

    }
    return (
        <>
            {loading && <Loader />}
            <ToastContainer />
            <div className='body'>
                <div className="wrapper">
                    <span className="icon-close">
                        <ion-icon id="close-outline" name="close-outline"></ion-icon> </span>
                    <div className="form-box register">
                        <h2>Register</h2>
                        <form>
                            <div className="input-box">
                                <span className="erroruser error text-danger"></span>
                                <span className="icon">
                                    <ion-icon name="person"></ion-icon>
                                </span>
                                <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                <label>Username</label>
                            </div>
                            <div className="input-box">
                                <span className="erroremail error text-danger"></span>
                                <span className="icon">
                                    <ion-icon name="mail"></ion-icon>
                                </span>
                                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <label>Email</label>
                            </div>
                            <div className="input-box">
                                <span className="errorphone error text-danger"></span>
                                <span className="icon">
                                    <ion-icon name="call"></ion-icon> </span>
                                <input type="tel" name="Phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                <label>Phone</label>
                            </div>
                            <div className="input-box">
                                <span className="errorpassword error text-danger"></span>
                                <span className="icon">
                                    <ion-icon name="lock-closed"></ion-icon>
                                </span>
                                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <label>Password</label>
                                <div className="strength"></div>
                            </div>
                            <div className="input-box">
                                <span className="errorconfpassword error text-danger"></span>
                                <span className="icon">
                                    <ion-icon name="lock-closed"></ion-icon>
                                </span>
                                <input type="password" name="" id="confpassword" value={cPassword} onChange={(e) => setcPassword(e.target.value)} required />
                                <label>Confirm Password</label>
                            </div>
                            {/* <div className="input-box">
                            <span className="errorcarimage error text-danger"></span>
                            <span className="icon">
                                <ion-icon name="person"></ion-icon>
                            </span>
                            <input type="file" id="carimage" name="carimage" accept="image/*" />
                            <label htmlFor="carimage" >Car Image</label>
                        </div> */}
                            {/* <div className="input-box">
                            <span className="errorcarmodel error text-danger"></span>
                            <span className="icon">
                                <ion-icon name="person"></ion-icon>
                            </span>
                            <input type="text" name="carmodel" id="carmodel" value={carmodel} onChange={(e) => setCarmodel(e.target.value)} required />
                            <label>Car Model</label>
                        </div> */}
                            <div className="remember-forget text-center">
                                <label>
                                    <input type="checkbox" />
                                    I agree the terms & conditions
                                </label>
                            </div>

                            <button type="submit" onClick={register} id="register_btn" className="btn">
                                register
                            </button>
                            <div className="login-register">
                                <p>Already have an acoount?
                                    <Link to="/Login" className="login-link"> Login</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup