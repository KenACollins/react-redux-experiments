import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active">
            <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
                <div className="header">Modal Header</div>
                <div className="content">
                    I am a modal dialog.
                </div>
                <div className="actions">
                    <div className="ui button primary">Delete</div>
                    <div className="ui button">Cancel</div>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    );
};

export default Modal;