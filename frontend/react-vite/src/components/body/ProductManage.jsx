import React, { useEffect, useState } from 'react';
import '../../css/body/adminBody.css';
import axios from 'axios';

const ProductManage = ({ allData, handleProductChange }) => {
    const [file, setFile] = useState(null);
    const [isChange, setIsChange] = useState(false);

    const handleDelProduct = async (id) => {
        // console.log(id);

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        try {
            const delRes = await axios.delete(`${backendUrl}/product/delProduct/${id}`, { withCredentials: true });
            // console.log(delRes.data);
            setIsChange(!isChange);
            handleProductChange(isChange);
        }
        catch (error) {
            console.log('Cannot del product');
            throw error;
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Vui lòng chọn file trước khi upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        try {
            const res = await axios.post(`${backendUrl}/product/addProduct`, formData, {
                withCredentials: true,
            });
            // console.log(res.data);
            setIsChange(!isChange);
            handleProductChange(isChange);
            alert("Upload thành công!");
        } catch (err) {
            console.error("Lỗi khi gửi file:", err);
            alert("Upload thất bại.");
        }
    };

    return (
        <>
            <div className='table-container'>
                <table className="table my-table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Giá</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allData.length == 0 ?
                            <tr><td>Không có sản phẩm nào</td></tr>
                            :
                            allData.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td>{product.ProductName}</td>
                                        <td>{product.Description}</td>
                                        <td>{product.ImageUrl}</td>
                                        <td>{product.Price} VNĐ</td>
                                        <td><button className='button-1' onClick={() => handleDelProduct(product.ProductID)}>Xóa</button></td>
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
                    <div className="form-group">
                        <label for="exampleFormControlFile1" style={{ marginRight: '20px' }}>Chọn file danh sách sản phẩm cần thêm mới</label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={handleFileChange} />
                        <button className='button-3' onClick={handleUpload}>Xác nhận</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProductManage;
