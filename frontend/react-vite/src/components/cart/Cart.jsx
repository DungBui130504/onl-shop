import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/cart/cart.css';
import CartTemplate from './CartTemplate';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Cart = ({ cartData }) => {
    const payOption = ["Trả trước", "Trả sau"];
    const [pay, setPay] = useState(payOption[0]);

    const [money, setMoney] = useState([]);

    const [address, setAddress] = useState('???');

    const [orderCode, setOrderCode] = useState("");

    const handleMoney = (item) => {
        setMoney(prev => [...prev, item]);
        // console.log(money);
    }

    const handleRemoveMoney = (valueToRemove) => {
        setMoney(prev => prev.filter(item => item !== valueToRemove));
    };


    const handleSelect = (eventKey) => {
        // console.log(eventKey);
        setPay(eventKey);
    };

    const moneyAmount = (money) => {
        let amount = 0;
        money.forEach(value => {
            amount += value;
        })

        return amount;
    }

    const handlePay = async () => {
        if (pay == "Trả sau") {
            window.alert('Đăng ký mua hàng thành công vui lòng thanh toán khi nhân được hàng !');
        } else {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const res = await axios.post(`${backendUrl}/pay/create-payment`, {
                    orderCode,
                    amount: moneyAmount(money),
                    description: `Thanh toán đơn hàng`,
                    cancelUrl: "http://localhost:5173/home",
                    returnUrl: "http://localhost:5173/home",
                }, { withCredentials: true });
                // console.log(res);
                window.location.href = res.data.checkoutUrl;
                return;
            } catch (error) {
                alert("Lỗi tạo payment link");
                console.error(error);
            }
        }
    }

    // Lay dia chi
    useEffect(() => {
        const getAddress = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            try {
                const res = await axios.get(`${backendUrl}/user/user`, { withCredentials: true });

                setAddress(res.data[0].Address);

            } catch (err) {
                console.log("Chưa đăng nhập hoặc token hết hạn");
            }
        };

        getAddress();
    }, []);

    useEffect(() => {
        const code = cartData.map(item => item.ProductID).join("-");
        setOrderCode(code);
    }, [cartData]); // Cập nhật khi cartData thay đổi

    return (
        <>
            {cartData.length !== 0 ?
                <div style={{ minWidth: '90vw', minHeight: '65vh', marginTop: '15vh', marginBottom: '10vh' }}>

                    <h3 style={{ padding: '20px' }}>Giỏ hàng của bạn</h3>

                    <table className="table table-hover cart-table">
                        <colgroup>
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '35%' }} />
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '10%' }} />
                        </colgroup>
                        <tbody>

                            {
                                cartData.map((item, index) => {
                                    return (
                                        <CartTemplate item={item} index={index} handleMoney={handleMoney} handleRemoveMoney={handleRemoveMoney} />
                                    )
                                })
                            }

                        </tbody>
                    </table>

                    <div className='pay-infor' style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        paddingTop: '20px'
                    }}>
                        <h3>Tổng tiền: {
                            moneyAmount(money)
                        } VNĐ</h3>
                        <p>Địa chỉ nhận hàng: {address}</p>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px'
                        }}>Loại giao dịch:
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={pay}
                                onSelect={handleSelect}
                                variant="primary"
                            >
                                <Dropdown.Item eventKey={payOption[0]}>Trả trước</Dropdown.Item>
                                <Dropdown.Item eventKey={payOption[1]}>Trả sau</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <button className='button-6' onClick={handlePay}>Mua hàng</button>
                    </div>
                </div >
                :
                <div className='container-fluid' style={{
                    backgroundImage: 'url(/images/no-data.gif)',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    minHeight: '80vh',
                    width: '25vw',
                    textAlign: 'center'
                }}></div>
            }
        </>
    )
}

export default Cart
