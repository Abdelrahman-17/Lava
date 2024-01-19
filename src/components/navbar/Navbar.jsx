import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
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
    const activelink = ({ isActive }) => (isActive && `active`)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [sidenav, setSidenav] = useState(false)
    const [sidecart, setSidecart] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const items = useSelector(cartitem);
    const totquantity = useSelector(totalquantity)
    // const [activeside, setActiveside] = useState(true)
    const showsidenav = () => {
        setSidenav(!sidenav);
    }
    // console.log(location.pathname);
    // useEffect(() => {
    //     if (location.pathname === "/profile/chat") {
    //         setActiveside(false)
    //     }
    // }, [location.pathname])
    const logouthandler = () => {
        signOut(auth).then(() => {
            toast.success("logout succeessful...")
        }).catch((error) => {
            toast.error(error.message)
        });
    }

    return (
        <>
            <ToastContainer />
            {currentUser &&
                <header>
                    <div className="logo">
                        <img src={Logo} alt="" />
                    </div>
                    <button className="btn-h" onClick={showsidenav}>=</button>
                    <div className={`${sidenav ? "nav-menu active" : "nav-menu"}`}>
                        <nav>
                            <Adminlink>
                                <NavLink className={activelink} to='/admin/home' >Admin</NavLink>
                            </Adminlink>
                            <NavLink className={activelink} to="/">home</NavLink>
                            <NavLink className={activelink} to="/booking">booking</NavLink>
                            <NavLink className={activelink} to="/store">store</NavLink>
                            {/* <NavLink className={activelink} to="/orders">orders</NavLink> */}
                            <NavLink className={`${activelink} cart`} to="/cart" onMouseMove={() => setSidecart(true)}>Cart
                                <i className="fa-solid fa-cart-shopping me-2"></i>
                                <p>{totquantity}</p>
                            </NavLink>
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
                            <div className="dropdown">
                                <button className={`${activelink} dropdown-btn`}  >pages
                                    <ion-icon name="chevron-down-outline"></ion-icon>
                                </button>
                                <div className="dropdown-menu">
                                    <NavLink className={activelink} to="/About">about</NavLink>
                                    <NavLink className={activelink} to="/Services">services</NavLink>
                                    <NavLink className={activelink} to="/News">news</NavLink>
                                    <NavLink className={activelink} to="/Team">team</NavLink>
                                    <NavLink className={activelink} to="/Faq">FAQ</NavLink>
                                    <NavLink className={activelink} to="/404">404</NavLink>
                                    <NavLink className={activelink} to="/Contact">contact</NavLink>
                                </div>
                            </div>
                        </nav>
                        <div className="account">
                            {
                                currentUser ?
                                    <>
                                        <Link to="/profile">
                                            <span>{currentUser?.displayName}</span>
                                            <img src={currentUser?.photoURL} className='ml-2 w-8 h-8 rounded-full' alt="" />
                                        </Link>
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
            }
        </>
    )
}

export default Navbar