import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { SiGooglemaps } from "react-icons/si";

const AddressInfor = ({ addressInfor }) => {
  const [Address, setAddress] = useState('');
  const [isAddressValid, setIsAddressValid] = useState(null);
  const [showTip, setShowTip] = useState(false);

  // console.log(addressInfor);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // console.log(backendUrl);
    try {
      let resUpdate = await axios.post(`${backendUrl}/user/changeAddress`, { Address }, { withCredentials: true });
      // console.log(resUpdate.data);
      window.alert('Cập nhật thành công!');
      window.location.reload();

    } catch (error) {
      console.log(error);
      window.alert('Lỗi khi cập nhật tài khoản!');
    }
  }

  const handleAddressValid = (e) => {
    setAddress(e.target.value);
    setIsAddressValid(e.target.value.length > 0); // Kiểm tra nếu có giá trị
  };

  // Cập nhật state khi props.accountInfor thay đổi
  useEffect(() => {
    if (addressInfor) {
      setAddress(addressInfor || '');

      setIsAddressValid(true || false);
    }

  }, [addressInfor]);

  return (
    <div className="container mt-5">
      <i><u>C</u>hỉnh sửa địa chỉ nhận hàng</i>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row g-3">

          <div className="col-12 mb-4">
            <div className="w-50 mx-auto">
              <label className="form-label">Địa chỉ</label>
              <div className="input-group mb-3">

                <input
                  type="text"
                  className={`form-control ${isAddressValid ? 'is-valid' : 'is-invalid'} rounded-0`}
                  id="validationServer01"
                  value={Address}
                  onChange={(e) => { handleAddressValid(e) }}
                  onMouseEnter={() => setShowTip(true)}
                  onMouseLeave={() => setShowTip(false)}
                  required
                />

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => window.open('https://accounts.google.com/ServiceLogin?hl=vi&service=local&lp=1', '_blank')}
                >
                  <SiGooglemaps />
                </button>

                {showTip ? <i style={{ color: 'blue' }}>*Tip: Nhấn nút bên cạnh để mở google maps, sau đó copy địa chỉ trên google maps và quay lại paste vào đây.</i> : null}

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

export default AddressInfor
