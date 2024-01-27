import React, { useContext, useEffect, useState } from 'react'
import "./Orders.css"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { authuser } from '../../redux/slice/authslice'
import { AuthContext } from '../../context/AuthContext'
const Orders = () => {
    let account_user = localStorage.getItem("account")
    let account = JSON.parse(account_user)
    let admin_user = localStorage.getItem("admin")
    let admin = JSON.parse(admin_user)
    const [getorders, setGetorders] = useState([])
    // let currentUser = useSelector(authuser)
    const { currentUser } = useContext(AuthContext)
    // console.log(ord);
    // useEffect(() => {
    // if (account) {
    //     get_order = localStorage.getItem(`orders${account.username}`)
    //     orders = JSON.parse(get_order)
    // }
    // else if (admin) {
    //     get_order = localStorage.getItem(`orders${admin.username}`)
    //     orders = JSON.parse(get_order)
    // }
    // }, [])
    // console.log(orders);
    const deletefromorders = (a) => {
        const objWithIdIndex = orders.findIndex((obj) => obj.id === a)
        orders.orders.splice(objWithIdIndex, 1)
        // console.log(orders.orders);
        localStorage.setItem(`orders${admin && admin.username}`, JSON.stringify(orders.orders))
        // order.innerHTML = ''
        // showdataorders()
        // if (!orders || orders.length === 0) {
        //     window.location.reload()
        // }
    }
    useEffect(() => {
        axios.get("https://lava-11a9b-default-rtdb.firebaseio.com/orders.json")
            .then(res => {
                setGetorders(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    let orders = []
    for (const key in getorders) {
        if (getorders[key].uid === currentUser?.uid) {
            // console.log(key);
            // orders.push({
            //     id: key,
            //     orderitem: getorders[key].orderitem,
            //     username: getorders[key].uid,
            // })
            orders.push(
                getorders[key].orderitem
            )
        }
    }
    // console.log('orders', orders);
    let items = []
    for (const key of orders) {
        console.log(key);
        key.map(ele => items.push(ele))
    }
    return (
        <section className="orders">
            {/* <h2>Order Details</h2>  */}
            {/* <p><b>Order ID :</b>{theorder[0]?.id}</p>  */}
            {/* <p><b>Order Amount :</b>{theorder[0]?.orderamount}</p>  */}
            {/* {
                orders && <h2>Hello {orders}</h2>
            } */}
            {orders ?
                <>
                    <h2>Hello {currentUser?.displayName}</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Product</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((ele, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{ele.title}</td>
                                        <td>{ele.description}</td>
                                        <td>{+ele.price} EGB</td>
                                        <td><img className="tdimg" src={ele.thumbnail} /></td>
                                        <td>{ele.itemquantity}</td>
                                        <td>{+ele.price * ele.itemquantity} EGB</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
                : <>
                    <h2>Hello {currentUser?.displayName}</h2>
                    <div className="noorders">
                        <h1><i className="fa-solid fa-heart-crack"></i></h1>
                        <h5 >Shopping cart is empty !</h5>
                        <p >push some products into your cart</p>
                        <div>
                            <a href="home.html" className="btn btn-warning text-end">Back to Home</a>
                        </div>
                    </div>
                </>

            }

        </section>
    )
}

export default Orders