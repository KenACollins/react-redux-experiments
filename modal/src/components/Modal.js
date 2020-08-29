import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ title, content, actions }) => {
    const [isModalOpen, setModalOpen] = useState(true);

    if (isModalOpen) {
        return ReactDOM.createPortal(
            <div onClick={() => setModalOpen(false)} className="ui dimmer modals visible active">
                <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
                    <div className="header">{title}</div>
                    <div className="content">{content}</div>
                    <div className="actions">{actions}</div>
                </div>
            </div>,
            document.getElementById('modal')
        );
    }
    else {
        return null;
    }

};

export default Modal;