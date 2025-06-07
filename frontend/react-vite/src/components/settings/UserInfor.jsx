import React, { useState, useEffect } from 'react'
import Nav from './nav'
import '../../css/user-infor/user-infor.css'
import PerInfor from './PerInfor'
import AccountInfor from './AccountInfor'
import AddressInfor from './AddressInfor'
import axios from 'axios'

const UserInfor = () => {
    const [tab, setTab] = useState(0);
    const [userInfor, setUserInfor] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [accountInfor, setAccountInfor] = useState({
        username: '',
        passwordHash: ''
    });
    const [addressInfor, setAddressInfor] = useState('')

    useEffect(() => {
        const getUserInfor = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            try {
                let resUpdate = await axios.get(`${backendUrl}/user/user`, { withCredentials: true });
                const {
                    Username,
                    PasswordHash,
                    FullName,
                    Email,
                    Phone,
                    Address
                } = resUpdate.data[0];
                setUserInfor((prev) => ({
                    ...prev,
                    name: FullName,
                    email: Email,
                    phone: Phone,
                }));
                setAccountInfor((prev) => ({
                    ...prev,
                    username: Username,
                    passwordHash: PasswordHash
                }));
                setAddressInfor(Address);
                // window.location.reload();
            }
            catch (error) {
                console.log(error);
                window.alert('Lỗi khi lấy thông tin tài khoản!');
            }
        }

        getUserInfor();

    }, []);

    const handleSetTab = (index) => {
        setTab(index);
    }
    return (
        <div className="d-flex flex-column align-items-center gap-5" style={{ backgroundImage: 'url(/images/register-background.jpg)', minHeight: '100vh', paddingTop: '130px' }}>
            <Nav tabIndex={handleSetTab} name={userInfor.name} />
            <div className='full-width-div'>
                {tab === 0 && <PerInfor infor={userInfor} />}
                {tab === 1 && <AccountInfor accountInfor={accountInfor} />}
                {tab === 2 && <AddressInfor addressInfor={addressInfor} />}
            </div>
        </div>
    )
}

export default UserInfor
