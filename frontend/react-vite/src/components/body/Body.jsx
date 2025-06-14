import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import '../../css/body/body.css'
import Item from '../items/Item'
import ItemDetail from '../items/ItemDetail';
import Cart from '../cart/Cart';
import AdminBody from './AdminBody';
import Chat from '../chat/Chat';
import ConversationList from './ConversationList';

const Body = ({ cateProduct, favProduct, handleShowBanner, showCart, handleShowCart, userRole, manageOption, handleCateChange, categories, isLogin }) => {
    const [allData, setAllData] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [favProductData, setFavProductData] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [more, setMore] = useState(24);
    const [isOut, setIsOut] = useState(false);
    const [noData, setNoData] = useState(false);
    const [noFavData, setNoFavData] = useState(true);
    const [oneProductData, setOneProductData] = useState({});
    const [isDisplayProduct, setIsDisplayProduct] = useState(0);
    const [productChange, setProductChange] = useState(false);
    const [targetUserId, setTargetUserId] = useState(userRole == 'Customer' ? localStorage.getItem('UserID') : 'null');
    const [newChat, setNewChat] = useState([]);
    const [receiveId, setReceiveID] = useState(null);


    const detailRef = useRef(null);

    // Scroll khi selectedProductId thay đổi
    useEffect(() => {
        if (detailRef.current) {
            detailRef.current.scrollIntoView();
        }
    }, [oneProductData]);


    const handleGetMoreProducts = () => {
        setMore(prev => {
            const newMore = prev + 12;
            const newData = allData.slice(0, newMore);
            setProductsData(newData);

            if (newMore >= allData.length) {
                setIsOut(true);
            }

            return newMore;
        });
    }

    const handleSetReceiveID = (id) => {
        setReceiveID(id);
    }

    const handleSetNewChat = (chat) => {
        setNewChat(chat);
    }

    const handleChangeTarget = (id) => {
        setTargetUserId(id);
    }

    const handleOneProductDetail = (product) => {
        setOneProductData(product);
        // console.log(oneProductData);
    }

    const hanleClickProduct = (status) => {
        setIsDisplayProduct(status);
        // console.log(isDisplayProduct);
    }

    const handleProductChange = (isChange) => {
        setProductChange(isChange);
    }

    useEffect(() => {
        const getProducts = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            try {
                const productResponse = await axios.get(`${backendUrl}/product/products`, { withCredentials: true });
                // console.log(productResponse.data);
                setAllData(productResponse.data);
                setProductsData(productResponse.data.slice(0, more));

                if (productResponse.data.length == 0) {
                    setNoData(true);
                }
                else {
                    setNoData(false);
                }
            }
            catch (error) {
                console.log('Cannot get products infor');
                throw error;
            }
        }

        getProducts();
    }, [productChange]);

    useEffect(() => {
        const newData = allData.filter(product => product.CategoryID == cateProduct);
        setProductsData(newData);
        // console.log(newData);
        if (newData.length == 0) {
            setNoData(true);
        }
        else {
            setNoData(false);
        }
    }, [cateProduct]);

    useEffect(() => {
        const getFavProducts = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            try {
                const productResponse = await axios.get(`${backendUrl}/product/favProducts`, { withCredentials: true });
                // console.log(productResponse.data);
                setFavProductData(productResponse.data);

                if (productResponse.data.length == 0) {
                    setNoFavData(true);
                }
                else {
                    setNoFavData(false);
                }
            }
            catch (error) {
                console.log('Cannot get favorite product');
                throw error;
            }
        }

        getFavProducts();
    }, [favProduct]);

    useEffect(() => {
        if (showCart === true) {
            handleShowBanner(false);
        }
        const getCartProduct = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            try {
                const productResponse = await axios.get(`${backendUrl}/cart/carts`, { withCredentials: true });
                // console.log(productResponse.data[0]);
                setCartData(productResponse.data[0])

            }
            catch (error) {
                console.log('Cannot get cart product');
                throw error;
            }
        }

        getCartProduct();
    }, [showCart]);

    return (
        <>
            {userRole == "Customer" &&
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {!showCart ?

                        <>
                            {isDisplayProduct == true &&
                                <div ref={detailRef}>
                                    <ItemDetail oneProductData={oneProductData} handleShowCart={handleShowCart} />
                                </div>
                            }

                            {noFavData && favProduct == 1 && <div className='container-fluid' style={{ height: '15vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <p>Không có sản phẩm yêu thích nào!!!</p>
                            </div>}

                            {favProduct == 1 && <Item products={favProductData} oneProductData={handleOneProductDetail} hanleClickProduct={hanleClickProduct} handleShowBanner={handleShowBanner} fav={true} />}

                            {favProduct == 1 &&
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '50px' }}>
                                    <div style={{ background: 'black', width: '30vw', height: '1px' }}></div>
                                    <p>Xem thêm</p>
                                    <div style={{ background: 'black', width: '30vw', height: '1px' }}></div>
                                </div>
                            }

                            <div className='container-fluid' style={{
                                backgroundImage: 'url(/images/no-data.gif)',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'contain',
                                height: '50vh',
                                width: '90vw',
                                display: noData ? 'block' : 'none',
                                textAlign: 'center'
                            }}></div>

                            <Item products={productsData} oneProductData={handleOneProductDetail} hanleClickProduct={hanleClickProduct} handleShowBanner={handleShowBanner} fav={false} />

                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '15px'
                            }}>
                                <button className='more-btn' onClick={handleGetMoreProducts}
                                    style={{
                                        display: isOut ? 'none' : 'block',
                                        marginTop: '10px'
                                    }}
                                >View More</button>
                            </div>
                        </>
                        :
                        <div>
                            <Cart cartData={cartData} />
                        </div>
                    }

                </div>
            }

            {userRole == 'Admin' &&
                <AdminBody manageOption={manageOption} allData={allData} handleProductChange={handleProductChange} handleCateChange={handleCateChange} categories={categories} />
            }

            {userRole == 'Staff' &&
                <ConversationList handleChangeTarget={handleChangeTarget} handleSetNewChat={handleSetNewChat} handleSetReceiveID={handleSetReceiveID} />
            }

            {isLogin && <Chat token={localStorage.getItem('token')} role={userRole} targetUserId={targetUserId} newChat={newChat} receiveId={receiveId} />}
        </>
    )
}

export default Body
