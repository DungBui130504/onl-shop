import React, { useEffect, useState } from 'react';
import '../../css/body/adminBody.css';
import axios from 'axios';

const StaffManage = () => {
    const [staffs, setStaffs] = useState([]);
    const [staffChange, setStaffChange] = useState(false);
    const [file, setFile] = useState(null);

    const handleDelStaff = async (id) => {
        // console.log(id);

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        try {
            const delRes = await axios.delete(`${backendUrl}/user/delStaff/${id}`, { withCredentials: true });
            // console.log(delRes.data);
            setStaffChange(!staffChange);
        }
        catch (error) {
            console.log('Cannot del staff');
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
            const res = await axios.post(`${backendUrl}/user/addStaff`, formData, {
                withCredentials: true,
            });
            // console.log(res.data);
            setStaffChange(!staffChange);
            alert("Upload thành công!");
        } catch (err) {
            console.error("Lỗi khi gửi file:", err);
            alert("Upload thất bại.");
        }
    };

    useEffect(() => {
        const getStaffs = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            try {
                const staffs = await axios.get(`${backendUrl}/user/staffs`, { withCredentials: true });
                // console.log(staffs.data);
                setStaffs(staffs.data);

            }
            catch (error) {
                console.log('Cannot get staffs infor');
                throw error;
            }
        }

        getStaffs();
    }, [staffChange]);

    return (
        <>
            <div className='table-container'>
                <table className="table my-table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên nhân viên</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Email</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffs.length == 0 ?
                            <tr><td>Không có nhân viên nào</td></tr>
                            :
                            staffs.map((staff, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td>{staff.FullName}</td>
                                        <td>{staff.Phone}</td>
                                        <td>{staff.Email}</td>
                                        <td><button className='button-1' onClick={() => handleDelStaff(staff.UserID)}>Xóa</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div style={{
                padding: '50px'
            }}>
                <form>
                    <div className="form-group">
                        <label for="exampleFormControlFile1" style={{ marginRight: '20px' }}>Chọn file danh sách nhân viên cần thêm mới</label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={handleFileChange} />
                        <button className='button-3' onClick={handleUpload}>Xác nhận</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default StaffManage
