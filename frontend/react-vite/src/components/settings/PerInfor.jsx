import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const PerInfor = ({ infor }) => {
  const { name, email, phone } = infor;
  const [FullName, setFullName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [isValidFullName, setIsValidFullName] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isValidPhone, setIsValidPhone] = useState(null);

  // console.log(name, email, phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // console.log(backendUrl);
    // console.log({ FullName, Email, Phone });
    try {
      let resUpdate = await axios.post(`${backendUrl}/user/changeUserInfor`, { FullName, Email, Phone }, { withCredentials: true });
      console.log(resUpdate.data);
      window.alert('Cập nhật thành công!');
      window.location.reload();

    } catch (error) {
      console.log(error);
      window.alert('Lỗi khi cập nhật tài khoản!');
    }
  };

  // Kiem tra valid fullname
  const handleValidFullName = (e) => {
    setFullName(e.target.value);
    setIsValidFullName(e.target.value.length > 0);
  }

  // Kiem tra valid email
  const handleValidEmail = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(e.target.value.length > 0);
  }

  // Kiem tra valid phone
  const handleValidPhone = (e) => {
    setPhone(e.target.value);
    setIsValidPhone(e.target.value.length > 0);
  }

  // Cập nhật state khi props.infor thay đổi
  useEffect(() => {
    if (infor) {
      setFullName(infor.name || '');
      setEmail(infor.email || '');
      setPhone(infor.phone || '');

      setIsValidFullName(true || false);
      setIsValidEmail(true || false);
      setIsValidPhone(true || false)
    }

  }, [infor]);

  return (
    <div className="container mt-5">
      <i> <u>C</u>hỉnh sửa thông tin người dùng</i>
      <form onSubmit={handleSubmit} className='mt-4'>
        <div className="row g-3">

          <div className="col-12">
            <div className="w-50 mx-auto">
              <label className="form-label">Họ tên</label>
              <div className="input-group mb-3">

                <input
                  type="text"
                  className={`form-control ${isValidFullName ? 'is-valid' : 'is-invalid'} rounded-0`}
                  id="validationServer01"
                  value={FullName}
                  onChange={(e) => { handleValidFullName(e) }}
                  required
                />

                <div className="valid-feedback">
                  Looks good!
                </div>

              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="w-50 mx-auto">
              <label className="form-label">Email</label>
              <div className="input-group mb-3">

                <input
                  type="text"
                  className={`form-control ${isValidEmail ? 'is-valid' : 'is-invalid'} rounded-0`}
                  id="validationServer01"
                  value={Email}
                  onChange={(e) => { handleValidEmail(e) }}
                  required
                />

                <div className="valid-feedback">
                  Looks good!
                </div>

              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="w-50 mx-auto">
              <label className="form-label">Số điện thoại</label>
              <div className="input-group mb-3">

                <input
                  type="text"
                  className={`form-control ${isValidPhone ? 'is-valid' : 'is-invalid'} rounded-0`}
                  id="validationServer01"
                  value={Phone}
                  onChange={(e) => { handleValidPhone(e) }}
                  required
                />

                <div className="valid-feedback">
                  Looks good!
                </div>

              </div>
            </div>
          </div>

          <div className="col-12 d-flex justify-content-end mt-3">
            <button type="submit" className="btn btn-primary mx-auto mt-3 mb-5">
              Lưu thay đổi
            </button>
          </div>
        </div>
      </form>
    </div>

  )
}

export default PerInfor
