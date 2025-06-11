import React, { useEffect, useState } from 'react';
import '../../css/body/adminBody.css';
import axios from 'axios';

const CategoryManage = ({ handleCateChange, categories }) => {
    const [file, setFile] = useState(null);
    const [isChange, setIsChange] = useState(false);
    const [cateName, setCateName] = useState('');
    const [desc, setDesc] = useState('');

    const handleDelCate = async (id) => {
        // console.log(id);

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        try {
            const delRes = await axios.delete(`${backendUrl}/category/delCate/${id}`, { withCredentials: true });
            // console.log(delRes.data);
            setIsChange(!isChange);
            handleCateChange(isChange);
        }
        catch (error) {
            console.log('Cannot del category');
            throw error;
        }
    }

    const handleAddCate = async () => {

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        try {
            const addRes = await axios.post(`${backendUrl}/category/addCate`, { cateName, desc }, { withCredentials: true });
            // console.log(addRes.data);
            setIsChange(!isChange);
            handleCateChange(isChange);
        }
        catch (error) {
            console.log('Cannot del category');
            throw error;
        }
    }

    return (
        <>
            <div className='table-container'>
                <table className="table my-table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên thể loại</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length == 0 ?
                            <tr><td>Không có sản phẩm nào</td></tr>
                            :
                            categories.map((cate, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td>{cate.CategoryName}</td>
                                        <td>{cate.Description}</td>
                                        <td><button className='button-1' onClick={() => handleDelCate(cate.CategoryID)}>Xóa</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div style={{
                padding: '40px'
            }}>
                <form>
                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexDirection: 'column' }}>
                        <div>
                            <label for="exampleFormControlFile1" style={{ marginRight: '20px' }}>Nhập tên thể loại cần thêm mới</label>
                            <input type="text" style={{ padding: '10px 20px' }} value={cateName} onChange={(e) => setCateName(e.target.value)} required />
                        </div>

                        <div>
                            <label for="exampleFormControlFile1" style={{ marginRight: '20px' }}>Nhập mô tả</label>
                            <input type="text" style={{ padding: '10px 20px' }} value={desc} onChange={(e) => setDesc(e.target.value)} />
                        </div>

                        <button className='button-3' onClick={handleAddCate}>Xác nhận</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CategoryManage
