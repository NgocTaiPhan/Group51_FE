import React, {useState} from 'react';
import {Button, Modal} from 'antd';

export default function Popup({btnText, title, content}: { btnText: any, title: any, content: any }) {
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button className="btn btn-custom" onClick={showModal}>
                {btnText}
            </Button>
            <Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
                <div>{content}</div>
            </Modal>
        </>
    );
}

