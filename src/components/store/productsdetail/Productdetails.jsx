import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import styles from './Productdetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { addtocart } from "../../../redux/slice/cartslice"
function Productdetails() {
    const { id } = useParams();
    const get = localStorage.getItem('product')
    const productdetails = JSON.parse(get)
    const dispatch = useDispatch()
    console.log(productdetails);
    const additem = () => {
        dispatch(addtocart(productdetails))
    }
    return (
        <>
            <div className="container">
                <div className="head">
                    <h2><b>Product Details</b></h2>
                    <Link to="/products">&larr; Back To Products</Link>
                </div>
                <div className="content">
                    <div className="image">
                        <img src={productdetails.ImageUrl} alt="detail" />
                    </div>
                    <div className="text">
                        <p className="title">{productdetails.title}</p>
                        <h5 className="price">${productdetails.price}</h5>
                        <p className="description">{productdetails.description}</p>
                        <h5 className="category">{productdetails.category}</h5>
                        <p><b className="title">Brand: {productdetails.brand}</b></p>
                        <button onClick={additem} className="addingbtn">Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Productdetails
