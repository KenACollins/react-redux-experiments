// This modal dialog allows a user to click outside of the dialog to remove it. That behavior is not always wanted.
// Sometimes you want to force the user to take action and not allow a way to get rid of the dialog.
// The e.stopPropagation() prevents a click inside modal dialog from bubbling up to a click handler that might exist higher.
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