import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import HomePage from './pages/homepage/HomePage'
import Footer from './components/footer/Footer'
import LoginPage from './pages/accountpage/LoginPage'
import SignupPage from './pages/accountpage/SignupPage'
import StorePage from './pages/storepage/StorePage'
import OrdersPage from './pages/orderspage/OrdersPage'
import CartPage from './pages/cartpage/CartPage'
import CheckoutPage from './pages/checkoutpage/CheckoutPage'
import AboutPage from './pages/aboutpage/AboutPage'
import TeamPage from './pages/teampage/TeamPage'
import ProfilePage from './pages/Profilepage/ProfilePage'
import ChatPage from './pages/chatpage/ChatPage'
import Securitypage from './pages/securitypage/Securitypage'
import BookingPage from './pages/bookingpage/Bookingpage'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { authuser, removeActiveUserHandler, setActiveUserHandler } from './redux/slice/authslice'
import { auth } from './firebase/config'
import Loader from './components/loader/Loader'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(authuser);
  const [isloading, setIsloading] = useState(true)
  useEffect(() => {
    // setIsloading(true)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log('phone', user.phoneNumber);
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber
        };
        dispatch(setActiveUserHandler(userData))
        // if(user.displayName || user.photoURL )
        // navigate('/')
      }
      else {
        dispatch(removeActiveUserHandler());
        navigate('/Login')
        // navigate('/')
      }
      setIsloading(false)
    });
    return () => unsubscribe();
  }, [dispatch])
  if (!localStorage.admin_data) {
    let admin_data = {
      uid: "admin",
      displayName: "admin",
      password: "admin"
    }
    localStorage.setItem('admin_data', JSON.stringify(admin_data))
  }
  return (
    <>
      {isloading && <Loader />}
      <Navbar />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        {/* <Route path='/Home' element={<HomePage />} /> */}
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/Signup' element={<SignupPage />} />
        <Route path='/Store' element={<StorePage />} />
        <Route path='/Orders' element={<OrdersPage />} />
        <Route path='/Cart' element={<CartPage />} />
        <Route path='/Booking' element={<BookingPage />} />
        <Route path='/Checkout' element={<CheckoutPage />} />
        <Route path='/Profile' element={<ProfilePage />} />
        <Route path='/Chat' element={<ChatPage />} />
        <Route path='/Security' element={<Securitypage />} />
        {/* <Route path='/About' element={<AboutPage />} /> */}
        {/* <Route path='/Team' element={<TeamPage />} /> */}
        <Route path='/*' element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App