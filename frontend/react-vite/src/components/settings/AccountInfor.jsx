import React, { useState, useEffect } from 'react'
import axios from 'axios';

const AccountInfor = ({ accountInfor }) => {
  const { username, passwordHash } = accountInfor;

  const [Username, setUserName] = useState('');
  const [PasswordHash, setPasswordHash] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isUsernameValid, setIsUserNameValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);


  // console.log(accountInfor);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // console.log(backendUrl);
    // console.log(Username, PasswordHash);
    try {
      let resUpdate = await axios.post(`${backendUrl}/user/changeAccountInfor`, { Username, PasswordHash }, { withCredentials: true });
      // console.log(resUpdate.data);
      window.alert('Cập nhật thành công!');
      window.location.reload();

    } catch (error) {
      console.log(error);
      window.alert('Lỗi khi cập nhật tài khoản!');
    }
  }

  // Kiem tra valid username
  const handleValidUsername = (e) => {
    setUserName(e.target.value);
    setIsUserNameValid(e.target.value.length > 0);
  }

  // Kiem tra valid password
  const handleValidPassword = (e) => {
    setPasswordHash(e.target.value);
    setIsPasswordValid(e.target.value.length > 0);
  }

  // Cập nhật state khi props.accountInfor thay đổi
  useEffect(() => {
    if (accountInfor) {
      setUserName(accountInfor.username || '');
      setPasswordHash(accountInfor.passwordHash || '');

      setIsPasswordValid(true || false);
      setIsUserNameValid(true || false);
    }

  }, [accountInfor]);

  return (
    <div className="container mt-5">
      <i> <u>C</u>hỉnh sửa thông tin tài khoản</i>
      <form onSubmit={handleSubmit} className='mt-4 '>
        <div className="row g-3">

          <div className="col-12 mb-4">
            <div className="w-50 mx-auto">
              <label className="form-label">Tài Khoản</label>
              <div className="input-group mb-3">

                <input
                  type="text"
                  className={`form-control ${isUsernameValid ? 'is-valid' : 'is-invalid'} rounded-0`}
                  id="validationServer01"
                  value={Username}
                  onChange={(e) => { handleValidUsername(e) }}
                  required
                />

                <div className="valid-feedback">
                  Looks good!
                </div>

              </div>
            </div>
          </div>

          <div className="col-12 mb-4">
            <div className="w-50 mx-auto">
              <label className="form-label">Tài Khoản</label>
              <div className="input-group mb-3">

                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className={`form-control ${isPasswordValid ? 'is-valid' : 'is-invalid'} rounded-0`}
                  id="validationServer01"
                  value={PasswordHash}
                  onChange={(e) => { handleValidPassword(e) }}
                  required
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? 'Ẩn' : 'Hiện'}
                </button>

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

export default AccountInfor
