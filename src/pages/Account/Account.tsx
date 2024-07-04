import React, {useState} from 'react';
import './Account.scss';
import {UserInfor} from '../../components/InforUserForm/InforUser';
import SideBar from "../../components/InforUserForm/SideBar/SideBar";


export default function Account() {

    return (
        <>

            <div className="container mx-auto">
                <div className="flex justify-center items-center">
                    <SideBar/>
                    <UserInfor/>
                </div>
            </div>
        </>
    );
};

