import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../../assets/logo.png"
import { signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../firebase/config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext'
import { cartitem, removefromcart, totalquantity } from '../../redux/slice/cartslice'
import { Adminlink } from '../../context/Onlyadmin'
const Navbar = () => {
    // console.log(Adminlink);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [sidenav, setSidenav] = useState(false)
    const [sidecart, setSidecart] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const items = useSelector(cartitem);
    const totquantity = useSelector(totalquantity)
    const showsidenav = () => {
        setSidenav(!sidenav);
    }

    const logouthandler = () => {
        signOut(auth).then(() => {
            // navigate("/");
            toast.success("logout succeessful...")
        }).catch((error) => {
            toast.error(error.message)
        });
    }
    return (
        <>
            <ToastContainer />
            {/* {currentUser && */}
            <header>
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <button className="btn-h" onClick={showsidenav}>=</button>
                <div className={`${sidenav ? "nav-menu active" : "nav-menu"}`}>
                    <nav>
                        <Adminlink>
                            <Link to='/admin/home' >Admin</Link>
                        </Adminlink>
                        <Link to="/">home</Link>
                        <Link to="/booking">booking</Link>
                        <Link to="/store">store</Link>
                        {/* <Link to="/orders">orders</Link> */}
                        <Link to="/cart" className="cart" onMouseMove={() => setSidecart(true)}>Cart
                            <i className="fa-solid fa-cart-shopping me-2"></i>
                            <p>{totquantity}</p>
                        </Link>
                        {/* {items && items.length > 0 &&
                            < div className={`${sidecart ? "sidecart active" : "sidecart"}`}>
                                <button onClick={() => setSidecart(false)}>X</button>
                                {
                                    items.map((ele, index) => {
                                        return (
                                            <div key={index}>
                                                <p>{ele.title}</p>
                                                <p>{ele.price} EGB</p>
                                                <img src={ele.ImageUrl} />
                                                <button onClick={() => dispatch(removefromcart(ele))}>X</button >
                                            </div>
                                        )
                                    })
                                }
                            </div>} */}
                        {/* <div className="dropdown"> */}
                        <Link to="/" className=" dropdown-btn">pages
                            <ion-icon name="chevron-down-outline"></ion-icon>
                        </Link>
                        {/* <div className="dropdown-menu">
                                <Link to="/About">about</Link>
                                <Link to="/Services">services</Link>
                                <Link to="/News">news</Link>
                                <Link to="/Team">team</Link>
                                <Link to="/Faq">FAQ</Link>
                                <Link to="/404">404</Link>
                                <Link to="/Contact">contact</Link>
                            </div> */}
                    </nav>
                    <div className="account">
                        {
                            currentUser ?
                                <>
                                    <Link to="/profile">{currentUser?.displayName}</Link>
                                    <button onClick={logouthandler}>Logout</button>

                                </>
                                :
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/signup">Signup</Link>
                                </>
                        }

                    </div>
                </div >
            </header >
            {/* } */}
        </>
    )
}

export default Navbar