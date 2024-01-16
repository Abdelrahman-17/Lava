import React, { useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
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
import SecurityPage from './pages/securitypage/SecurityPage'
import BookingPage from './pages/bookingpage/Bookingpage'
// import Loader from './components/loader/Loader'
import Admin from './components/admin/Admin';
import { AuthContext } from './context/AuthContext'
import icon from './assets/logo.png'
import loader from './assets/loader1.mp4'
import Onlyadmin from './context/Onlyadmin'
import { useDispatch } from 'react-redux'
import { getProducts } from './redux/slice/productslice'
import { getorders } from './redux/slice/orderslice'
import { sendEmailVerification, signOut, updateProfile } from 'firebase/auth'
import { auth } from './firebase/config'
import { toast } from 'react-toastify'

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getorders())
  }, [dispatch])
  const { currentUser, loading } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  // console.log(currentUser);
  useEffect(() => {
    if (currentUser && currentUser?.emailVerified !== true) {
      signOut(auth)
      sendEmailVerification(auth.currentUser);
      toast.info("you must Verified your email")
    }
  }, [currentUser])
  if (loading) {
    return (
      <div style={{ zIndex: '444444', background: '#222123' }} className=" h-screen w-screen fixed top-0 left-0 flex justify-center items-center text-center flex-col">
        <video autoPlay loop muted className='h-full w-full'>
          <source src={loader} type="video/mp4" />
        </video>
      </div>
    )
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/store' element={<ProtectedRoute><StorePage /></ProtectedRoute>} />
        <Route path='/orders' element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
        <Route path='/cart' element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path='/booking' element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
        <Route path='/checkout' element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/chat' element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path='/security' element={<ProtectedRoute><SecurityPage /></ProtectedRoute>} />
        <Route path='/About' element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
        <Route path='/Team' element={<ProtectedRoute><TeamPage /></ProtectedRoute>} />
        <Route path='/admin/*' element={<Onlyadmin><Admin /></Onlyadmin>} />
        <Route path='/*' element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App