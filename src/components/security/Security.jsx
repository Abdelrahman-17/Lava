import React, { Fragment, useContext, useEffect, useState } from 'react'
import './Security.css'
import { Link, json } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authuser } from '../../redux/slice/authslice'
import { auth, db } from '../../firebase/config'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext'
import { sendPasswordResetEmail, updateProfile } from 'firebase/auth'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
const Security = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [activeedit, setActiveedit] = useState(false)
    const { currentUser } = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
    // console.log('currentUser', currentUser?.reloadUserInfo.passwordHash);
    // console.log('user', user?.password);
    // useEffect(() => {
    //     if (currentUser?.reloadUserInfo.passwordHash !== user?.password) {
    //         setDoc(doc(db, 'users', currentUser?.uid), {
    //             uid: currentUser?.uid,
    //             email: currentUser?.email,
    //             displayName: currentUser?.displayName,
    //             phoneNumber: user?.phoneNumber,
    //             password: currentUser?.reloadUserInfo.passwordHash,
    //         });
    //         // toast.success("success")
    //     }

    // }, [currentUser, user])
    useEffect(() => {
        setUsername(user?.displayName)
        setEmail(user?.email)
        setPhone(user?.phoneNumber)
        setPassword(user?.password)
    }, [user])

    useEffect(() => {
        const getuser = async () => {
            const usersCollection = query(
                collection(db, "users"),
                where("uid", "in", [currentUser?.uid])
            )
            const userSnapshot = await getDocs(usersCollection);
            userSnapshot.docs.map((doc) => setUser(doc.data()));
            // setLoading(false)
        }
        getuser();
        const getusers = async () => {
            const usersCollection = collection(db, "users");
            const userSnapshot = await getDocs(usersCollection);
            const usersData = userSnapshot.docs.map((doc) => doc.data());
            setUsers(usersData);
            // setLoading(false)
        }
        getusers();
    }, [])
    const onresethandler = async (e) => {
        e.preventDefault();
        // setisLoading(true);
        try {
            await sendPasswordResetEmail(auth, currentUser?.email)
            toast.success("check your Emai l inbox")
        }
        catch (error) {
            toast.error(error.message)
        }


    }
    // console.log(user);
    const passlenght = password?.length
    let astrike = ''
    for (let i = 0; i < passlenght; i++) {
        astrike += '*'
    }
    const confirm = async () => {
        let user_EditUI = {
            uid: user?.uid,
            displayName: username,
            email: email,
            phoneNumber: phone,
            password: password,
        }
        // console.log('user_EditUI', user_EditUI);
        // console.log('users', users);
        const findeNEusername = users.filter((obj) => obj.displayName !== user?.displayName)
        const findeusername = findeNEusername.findIndex((obj) => obj.displayName === user_EditUI.displayName)
        const findeNEemail = users.filter((obj) => obj.email !== user?.email)
        const findeemail = findeNEemail.findIndex((obj) => obj.email === user_EditUI.email)
        const findeNEphone = users.filter((obj) => obj.phoneNumber !== user?.phoneNumber)
        const findephone = findeNEphone.findIndex((obj) => obj.phoneNumber === user_EditUI.phoneNumber)
        if (findeusername < 0 && findeemail < 0) {
            // console.log('edit');
            const itemindex = users.findIndex((item) => item.uid === user?.uid);
            users[itemindex] = user_EditUI;
            console.log(users);
            await setDoc(doc(db, 'users', user?.uid), user_EditUI);
            await updateProfile(auth.currentUser, {
                // uid:`${userId}`,
                displayName: username,
            });
            //     localStorage.setItem('users', JSON.stringify(users))
            //     let account_Edit = {
            //         username: users[itemindex].username,
            //         email: users[itemindex].email,
            //         password: users[itemindex].password
            //     }
            //     localStorage.setItem("account", JSON.stringify(account_Edit));
            //     localStorage.removeItem(`orders${account && account.username}`)
            //     orders.username = username
            //     localStorage.setItem(`orders${account_Edit && account_Edit.username}`, JSON.stringify(orders))
            toast.success("User Edited Successfully")
            setActiveedit(false)
            //     // window.location.reload()
        }
        else {
            toast.error('valid')
        }
    }
    return (
        <>
            <div className='security'>
                <Fragment key={user?.uid}>
                    <div className="input-box">
                        <label>Username</label>
                        <input type="text" disabled={activeedit ? false : true} value={`${activeedit ? username : user?.displayName}`} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-box">
                        <label>Email</label>
                        <input type="text" disabled={activeedit ? false : true} value={`${activeedit ? email : user?.email}`} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-box">
                        <label>Password</label>
                        <input type="text" disabled={activeedit ? false : true} value={`${activeedit ? password : astrike}`} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-box">
                        <label>Phone</label>
                        <input type="text" disabled={activeedit ? false : true} value={`${activeedit ? phone : user?.phoneNumber}`} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    {
                        activeedit ? <>
                            <button className='confirm' onClick={confirm}>confirm</button>
                            <button className='confirm' onClick={onresethandler}>reset pass</button>
                        </>
                            :
                            <button className='edit' onClick={() => setActiveedit(true)}>edit</button>

                    }
                </Fragment>

            </div>
        </>
    )
}

export default Security