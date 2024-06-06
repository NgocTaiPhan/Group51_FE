import React from 'react';
import {Input, DatePicker} from "antd";
import 'bootstrap/dist/css/bootstrap.min.css';
import './InforUser.scss';
import Popup from '../Popup/Popup';
import ForgotPass from "../Header/components/ForgotPass/ForgotPass";


export function UserInfor() {
    return (
        <>
            <div className="container-xl px-4 mt-4">

                <div className="row">
                    <div className="col-xl-4">
                        <div className="card mb-4 mb-xl-0">
                            <div className="card-header">Điều hướng</div>

                        </div>
                    </div>
                    <div className="col-xl-8">
                        <div className="card mb-4">
                            <div className="card-header">Thông tin người dùng</div>
                            <div className="card-body">

                                <form>
                                    {/* Form Group (username)*/}
                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputUsername">
                                            Tên đăng nhập
                                        </label>
                                        <Input disabled defaultValue="Phan Ngọc Tài" className="form-control"
                                               id="inputUsername"/>
                                    </div>
                                    {/* Form Row*/}
                                    <div className="row gx-3 mb-3">
                                        {/* Form Group (first name)*/}
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputFirstName">
                                                Họ và tên
                                            </label>
                                            <Input disabled defaultValue="Phan Ngọc Tài" className="form-control"
                                                   id="inputFirstName"/>
                                        </div>
                                        {/* Form Group (last name)*/}
                                        <div className="col-md-6">
                                            <label className="small mb-1" htmlFor="inputEmail">
                                                Email
                                            </label>
                                            <Input disabled defaultValue="email@gmail.com" className="form-control"
                                                   id="inputEmail"/>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="small mb-1" htmlFor="inputEmailAddress">
                                            Địa chỉ
                                        </label>
                                        <Input disabled
                                               defaultValue="ấp Gò Dỗ, xã Bình Hòa Tây, huyện Mộc Hóa, tỉnh Long An"
                                               className="form-control"
                                               id="inputEmail"/>
                                    </div>

                                    {/* Form Row*/}
                                    <div className="row gx-3 mb-3">
                                        {/* Form Group (phone number)*/}
                                        <div className="col-md-6">
                                            <label className="small mb-1"
                                                   htmlFor="inputPhone">
                                                Số điện thoại
                                            </label>
                                            <Input
                                                disabled defaultValue="0345098986"
                                                className="form-control"
                                                id="inputEmail"
                                                type="number"/>
                                        </div>
                                        {/* Form Group (birthday)*/}
                                        <div className="col-md-6">
                                            <label className="small mb-1"
                                                   htmlFor="inputBirthday">
                                                Ngày sinh
                                            </label>
                                            <Input
                                                value='1999-01-01'
                                                disabled
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="btngroup">
                                        <div className="btn-changeinfor">

                                            <Popup  btnText="Thay đổi thông tin" title="Thay đổi thông tin" content={
                                                <FillUserInfor/>
                                            }></Popup>
                                        </div>
                                        <div className="btn-forgotpass">

                                            <Popup btnText="Đổi mật khẩu" title="Đổi mật khẩu" content={
                                                <ForgotPass/>
                                            }></Popup>
                                        </div>
                                    </div>


                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
        ;
}

export function FillUserInfor() {
    return (
        <>
            <div className="container"></div>
            <form>
                {/* Form Group (username)*/}
                <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername">
                        Tên đăng nhập
                    </label>
                    <Input defaultValue="Phan Ngọc Tài" className="form-control"
                           id="inputUsername"/>
                </div>
                {/* Form Row*/}
                <div className="row gx-3 mb-3">
                    {/* Form Group (first name)*/}
                    <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputFirstName">
                            Họ và tên
                        </label>
                        <Input defaultValue="Phan Ngọc Tài" className="form-control"
                               id="inputFirstName"/>
                    </div>
                    {/* Form Group (last name)*/}
                    <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputEmail">
                            Email
                        </label>
                        <Input defaultValue="email@gmail.com" className="form-control"
                               id="inputEmail"/>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">
                        Địa chỉ
                    </label>
                    <Input
                        defaultValue="ấp Gò Dỗ, xã Bình Hòa Tây, huyện Mộc Hóa, tỉnh Long An"
                        className="form-control"
                        id="inputEmail"/>
                </div>

                {/* Form Row*/}
                <div className="row gx-3 mb-3">
                    {/* Form Group (phone number)*/}
                    <div className="col-md-6">
                        <label className="small mb-1"
                               htmlFor="inputPhone">
                            Số điện thoại
                        </label>
                        <Input
                            defaultValue="0345098986"
                            className="form-control"
                            id="inputEmail"
                            type="number"/>
                    </div>
                    {/* Form Group (birthday)*/}
                    <div className="col-md-6">
                        <label className="small mb-1"
                               htmlFor="inputBirthday">
                            Ngày sinh
                        </label>
                        <DatePicker className="form-control"/>
                    </div>
                </div>


            </form>


        </>

    );
}