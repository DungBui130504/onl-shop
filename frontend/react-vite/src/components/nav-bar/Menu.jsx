import React, { useState, useEffect } from 'react';

const Menu = ({ isOpen, categoriesData, handleCateProduct }) => {
    const [activeTab, setActiveTab] = useState(categoriesData[0]?.CategoryName || '');

    const handleCategory = (ID) => {
        handleCateProduct(ID);
    }

    return (
        <div
            style={{
                width: '100%',
                borderTop: '1px solid #A0A0A0',
                display: isOpen ? 'block' : 'none',
                transition: 'all 0.3s ease',
            }}
        >
            <nav className="navbar navbar-expand-lg bg-white">
                <div className="container-fluid">

                    {/* Cho phep cuon ngang khi o man hinh dien thoai */}
                    <nav className="nav flex-nowrap overflow-auto p-0" style={{ fontSize: '15px', fontFamily: 'arial' }}>
                        {categoriesData.map((category, i) => (
                            <p
                                key={category.CategoryID || i}
                                className="nav-link"
                                style={{
                                    color: 'black',
                                    borderBottom: activeTab === category.CategoryName ? '2px solid black' : 'none',
                                    cursor: 'pointer'
                                }}
                                onClick={() => { setActiveTab(category.CategoryName); handleCategory(category.CategoryID || i) }}
                            >
                                {category.CategoryName}
                            </p>
                        ))}
                    </nav>


                </div>
            </nav>
        </div>
    )
}

export default Menu
