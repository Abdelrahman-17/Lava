import React, { useContext, useState } from 'react'
import './Profilenav.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { FaUserCircle } from 'react-icons/fa';

const Profilenav = ({ setActiveside }) => {
    const navigate = useNavigate()
    // const currentUser = useSelector(authuser);
    // const [activeside, setActiveside] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const auth = getAuth();
    const user = auth.currentUser;
    const logouthandler = () => {
        signOut(auth).then(() => {
            navigate("/");
            toast.success("logout succeessful...")
        }).catch((error) => {
            toast.error(error.message)
        });
    }
    const deleteaccount = () => {
        user.delete().then(async () => {
            try {
                const usersQuery = query(
                    collection(db, "users"),
                    where("uid", "in", [currentUser?.uid]),
                );
                const usersSnapshot = await getDocs(usersQuery);
                const deletePromises = usersSnapshot.docs.map((doc) =>
                    deleteDoc(doc.ref)
                );
                await Promise.all(deletePromises);
                toast.success("delete accout succeessful...")
            } catch (error) {
                console.error("Error clearing messages:", error);
            }
        });
    }
    const activelink = ({ isActive }) => (isActive ? `active` : `links`)
    const activeside = ({ isActive }) => (isActive ? setActiveside(true) : setActiveside(false))
    return (
        <>
            <div className='nav'>
                <div className='user'>
                    {currentUser?.photoURL ?
                        <img src={currentUser?.photoURL} className='icon inline-block' width={60} />
                        :
                        <FaUserCircle className='icon inline-block' size={60} color="#fff" />
                    }
                    {/* <img src={currentUser?.photoURL} alt="" /> */}
                    <h4>{currentUser?.displayName}</h4>
                </div>
                <div className='listcontainer'>
                    <ul className='list'>
                        <li>
                            <NavLink className={activelink} to='/profile/orders'>
                                history
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={activelink} to='/profile/security'>
                                security
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={activelink} to='/'>
                                notification
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className={activeside} to='/profile/chat'>
                                chat
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={logouthandler}>Logout</button>
                        </li>
                        <li>
                            <button onClick={deleteaccount}>delete accout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Profilenav