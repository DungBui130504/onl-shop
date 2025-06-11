import React, { useEffect, useState } from 'react';
import '../../css/body/adminBody.css';
import axios from 'axios';
import StaffManage from './StaffManage';
import ProductManage from './ProductManage';
import CategoryManage from './CategoryManage';

const AdminBody = ({ manageOption, allData, handleProductChange, handleCateChange, categories }) => {

    return (
        <div className='admin-body-container'>
            {manageOption == 0 &&
                <StaffManage />
            }

            {manageOption == 1 &&
                <ProductManage allData={allData} handleProductChange={handleProductChange} />
            }

            {manageOption == 2 &&
                <CategoryManage handleCateChange={handleCateChange} categories={categories} />
            }
        </div>
    )
}

export default AdminBody
