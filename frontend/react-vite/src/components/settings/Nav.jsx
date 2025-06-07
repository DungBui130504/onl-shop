import React, { useState } from 'react';
import '../../css/user-infor/nav.css'
import Title from './Title';

const Nav = ({ tabIndex, name }) => {
    const [activeTab, setActiveTab] = useState('Hồ sơ');

    const tabs = ['Hồ sơ', 'Tài khoản', 'Địa chỉ nhận hàng'];

    const handleNavClick = (index) => {
        tabIndex(index);
    }

    return (
        <div style={{ width: '100%' }}>
            <nav className="navbar navbar-expand-lg fixed-top bg-white">
                <div className="container-fluid d-flex flex-column gap-3">
                    <div className='d-flex align-items-center justify-content-between' style={{ width: '100%' }}>
                        <h1 >SHOP</h1>
                        <Title name={name} />
                    </div>

                    {/* Cho phep cuon ngang khi o man hinh dien thoai */}
                    <nav className="nav flex-nowrap overflow-auto p-2">
                        {tabs.map((tab, i) => (
                            <p
                                key={tab}
                                className="nav-link"
                                style={{
                                    color: 'black',
                                    borderBottom: activeTab === tab ? '2px solid black' : 'none',
                                    cursor: 'pointer'
                                }}
                                onClick={() => { setActiveTab(tab); handleNavClick(i) }}
                            >
                                {tab}
                            </p>
                        ))}
                    </nav>
                </div>
            </nav>
        </div>
    )
}

export default Nav
