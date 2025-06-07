import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap';
import { IoLogoGoogle } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";

const Register = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    // User infor
    const [Username, setUserName] = useState('');
    const [PasswordHash, setPasswordHash] = useState('');
    const [FullName, setFullName] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Address, setAddress] = useState('');
    const [Dob, setDob] = useState({ day: '', month: '', year: '' });
    const [Role, setRole] = useState('');


    // Xu li rieng ngay sinh
    const handleChange = (e, field) => {
        setDob({
            ...Dob,
            [field]: e.target.value,
        });
    };

    // Xu li dang ky tai khoan
    const handleRegister = async (e) => {
        e.preventDefault();
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        // console.log(backendUrl);
        console.log({ Username, PasswordHash, FullName, Email, Phone, Address, Role });
        try {
            let responseLogin = await axios.post(`${backendUrl}/auth/register`, { Username, PasswordHash, FullName, Email, Phone, Address, Role });
            console.log(responseLogin.data);
            window.alert('Đăng ký tài khoản thành công!');
            window.location.reload();

        } catch (error) {
            console.log(error);
            window.alert('Lỗi khi đăng ký tài khoản!');
        } finally {
            // Clear input
            setUserName('');
            setPasswordHash('');
            setFullName('');
            setEmail('');
            setPhone('');
            setAddress('');
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/images/register-background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1,
                }}></div>
            <div className="bg-white p-4 rounded-0 shadow-sm" style={{ maxWidth: '600px', width: '100%' }}>
                <h1 className="text-center m-0" style={{ color: 'black', fontWeight: 'bold' }}>Register Info</h1>
                <Form className="p-5 mx-auto w-100">
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Full Name *</Form.Label>
                        <Form.Control type="text" placeholder="Enter full name" className="rounded-0"
                            value={FullName}
                            onChange={(e) => setFullName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Phone Number *</Form.Label>
                        <Form.Control type="text" placeholder="Enter phone number" className="rounded-0"
                            value={Phone}
                            onChange={(e) => setPhone(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Address *</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" className="rounded-0"
                            value={Address}
                            onChange={(e) => setAddress(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" className="rounded-0"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>User Name *</Form.Label>
                        <Form.Control type="text" placeholder="Enter user name" className="rounded-0"
                            value={Username}
                            onChange={(e) => setUserName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Password *</Form.Label>
                        <div className="input-group">
                            <Form.Control
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Password"
                                className="rounded-0"
                                value={PasswordHash}
                                onChange={(e) => setPasswordHash(e.target.value)}
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="rounded-0"
                            >
                                {passwordVisible ? 'Hide' : 'Show'}
                            </Button>
                        </div>
                        <Form.Text className="text-muted">
                            Must be 10 or more characters
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Date of Birth *</Form.Label>
                        <div className="d-flex gap-2">
                            <Form.Select className="rounded-0"
                                value={Dob.day}
                                onChange={(e) => handleChange(e, 'day')}>
                                <option>D</option>
                                {[...Array(31)].map((_, i) => (
                                    <option key={i}>{i + 1}</option>
                                ))}
                            </Form.Select>
                            <Form.Select className="rounded-0"
                                value={Dob.month}
                                onChange={(e) => handleChange(e, 'month')}>
                                <option>M</option>
                                {[
                                    'January', 'February', 'March', 'April', 'May', 'June',
                                    'July', 'August', 'September', 'October', 'November', 'December',
                                ].map((month, i) => (
                                    <option key={i}>{month}</option>
                                ))}
                            </Form.Select>
                            <Form.Select className="rounded-0"
                                value={Dob.year}
                                onChange={(e) => handleChange(e, 'year')}>
                                <option>Y</option>
                                {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                    <option key={year}>{year}</option>
                                ))}
                            </Form.Select>
                        </div>
                        <Form.Text className="text-muted">
                            You need to be 16 or over to use this site
                        </Form.Text>
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                        <Button variant="primary" type="submit" className="rounded-0" onClick={(e) => handleRegister(e)}>
                            Register
                        </Button>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <p>or register with:</p>
                    </div>

                    <div className="d-flex justify-content-center mt-3 gap-4">
                        <Button className="d-flex justify-content-center"><IoLogoGoogle /></Button>
                        <Button className="d-flex justify-content-center"><FaFacebookSquare /></Button>
                    </div>
                </Form>
            </div>
        </div>

    )
}

export default Register
