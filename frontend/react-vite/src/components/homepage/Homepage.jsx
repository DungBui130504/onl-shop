import React, { useState } from 'react'
import axios from 'axios'
import Nav from '../nav-bar/Nav';
import Banner from '../banner/Banner'
import Body from '../body/Body';
import Footer from '../footer/Footer';

const Homepage = () => {
    const [cateProduct, setCateProduct] = useState(0);

    const [favProduct, setFavProduct] = useState(0);

    const [showBanner, setShowBanner] = useState(true);

    const [showCart, setShowCart] = useState(false);

    const [userRole, setUserRole] = useState('Customer');

    const [manageOption, setManageOption] = useState(0);

    const [cateChange, setCateChange] = useState(false);

    const [categories, setCategories] = useState([]);

    const [isLogin, setIsLogin] = useState(false);

    const handleLogin = (status) => {
        setIsLogin(status);
    }

    const handleCateProduct = (ID) => {
        setCateProduct(ID);
    }

    const handleFavProduct = (status) => {
        setFavProduct(status);
    }

    const handleShowBanner = (status) => {
        setShowBanner(status);
    }

    const handleShowCart = (status) => {
        setShowCart(status)
    }

    const handleSetUserRole = (role) => {
        setUserRole(role);
    }

    const handleSetOption = (option) => {
        setManageOption(option);
    }

    const handleCateChange = (isChange) => {
        setCateChange(isChange);
    }

    const handleGetCategories = (newCates) => {
        setCategories(newCates);
    };

    return (
        <div>
            <Nav handleCateProduct={handleCateProduct} handleFavProduct={handleFavProduct} handleShowCart={handleShowCart} handleSetUserRole={handleSetUserRole} userRole={userRole} handleSetOption={handleSetOption} manageOption={manageOption} handleGetCategories={handleGetCategories} categories={categories} cateChange={cateChange} handleIsLogin={handleLogin} isLogin={isLogin} />
            {showBanner == true && userRole == "Customer" && <Banner />}
            <Body cateProduct={cateProduct} favProduct={favProduct} handleShowBanner={handleShowBanner} showCart={showCart} handleShowCart={handleShowCart} userRole={userRole} manageOption={manageOption} handleCateChange={handleCateChange} categories={categories} isLogin={isLogin} />
            {userRole == "Customer" && <Footer />}
        </div>
    )
}

export default Homepage
