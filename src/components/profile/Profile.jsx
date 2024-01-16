import React, { useContext, useEffect } from 'react'
import './Profile.css'
import { Link, useNavigate } from 'react-router-dom'
import { deleteUser, getAuth, signOut } from 'firebase/auth'
import { auth, db } from '../../firebase/config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { authuser } from '../../redux/slice/authslice'
import { useSelector } from 'react-redux'
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore'
import { AuthContext } from '../../context/AuthContext'

const Profile = () => {
    const navigate = useNavigate()
    // const currentUser = useSelector(authuser);
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
    // const handleDeleteAccount = () => {
    //     const user = firebase.auth().currentUser;
    //     // Prompt the user to re-authenticate before deleting the account
    //     const password = prompt('Please enter your password to confirm account deletion:');
    //     // Create a credential with the user's email and password
    //     const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);

    //     // Re-authenticate the user with the credential
    //     user
    //       .reauthenticateWithCredential(credential)
    //       .then(() => {
    //         // Delete the user account
    //         user.delete()
    //           .then(() => {
    //             console.log('User account deleted successfully');
    //           })
    //           .catch((error) => {
    //             console.log('Failed to delete user account', error);
    //           });
    //       })
    //       .catch((error) => {
    //         console.log('Failed to re-authenticate user', error);
    //       });
    //   };
    return (
        <>
            <nav className='profile'>
                <Link to='/orders'>history</Link>
                <Link to='/security'>security</Link>
                <Link to='/profile'>notification</Link>
                <Link to='/chat'>chat</Link>

                <button onClick={logouthandler}>Logout</button>
                <button onClick={deleteaccount}>delete accout</button>
            </nav>
        </>
    )
}

export default Profile