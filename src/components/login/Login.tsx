import React, { useState } from 'react';
import "./login.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    faFacebook,
    faGooglePlusG,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login() {
    const [startDate, setStartDate] = useState<Date | null>(null);

    return (
        <div className="container">
            <div className="content">
                <div className="login">
                    <label><h3>Đăng nhập</h3></label>
                    <table>
                        <tbody>
                        <tr className="userName">
                            <td><label>Tên đăng nhập:</label></td>
                            <td><input value="" /></td>
                        </tr>
                        <tr className="pass">
                            <td><label>Mật khẩu:</label></td>
                            <td><input value="" /></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className="slectet">
                                    <label>Đăng nhập với</label>
                                    <div className="icon_footer">
                                        <FontAwesomeIcon className="icon" icon={faFacebook} />
                                        <FontAwesomeIcon className="icon" icon={faGooglePlusG} />
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="btn">
                            <td colSpan={2}>
                                <button type="submit">Đăng nhập</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="register">
                    <label><h3>Đăng kí</h3></label>
                    <div className="contents">
                        <table>
                            <tbody>
                            <tr className="username">
                                <td><label>Tên đăng nhập:</label></td>
                                <td><input type="text" value="" /></td>
                            </tr>
                            <tr className="pass">
                                <td><label>Mật khẩu:</label></td>
                                <td><input value="" /></td>
                            </tr>
                            <tr className="email">
                                <td><label>Email:</label></td>
                                <td><input value="" /></td>
                            </tr>
                            <tr className="phone">
                                <td><label>Số điện thoại:</label></td>
                                <td><input value="" /></td>
                            </tr>
                            <tr className="date">
                                <td><label>Ngày sinh:</label></td>
                                <td>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date: Date) => setStartDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Chọn ngày"
                                    />
                                </td>
                            </tr>
                            <tr className="sex">
                                <td><label>Giới tính:</label></td>
                                <td><input value="" /></td>
                            </tr>
                            <tr className="address">
                                <td><label>Địa chỉ:</label></td>
                                <td><input value="" /></td>
                            </tr>
                            <tr className="btn">
                                <td colSpan={2}>
                                    <button type="submit">Đăng kí</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
