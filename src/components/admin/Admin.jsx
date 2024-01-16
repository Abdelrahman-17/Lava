import React from "react";
import "./Admin.css"
import { Route, Routes } from "react-router-dom";
import Adminnav from "./adminnav/Adminnav";
import Allproducts from "./allproducts/Allproducts";
import Addproduct from "./addproduct/Addproduct";
import Adminhome from "./adminhome/Adminhome";
const Admin = () => {
    return (
        <div className="admin">
            <div className="navbar">
                <Adminnav />
            </div>
            <div className="content">
                <Routes>
                    <Route path="all-products" element={<Allproducts />} />
                    <Route path="add-product/:id" element={<Addproduct />} />
                    <Route path="home" element={<Adminhome />} />
                </Routes>
            </div>
        </div>)
}

export default Admin