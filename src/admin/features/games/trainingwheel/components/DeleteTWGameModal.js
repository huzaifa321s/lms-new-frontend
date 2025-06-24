import React from 'react'

const DeleteTWGameModal = ({ deleteGame, closeModal, ModalId }) => {
    return (
        <dialog id={ModalId} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Are you sure you want to delete this question?</h3>
                <div className="modal-action">
                    <button className="btn gradiant-btn" onClick={() => deleteGame()}>Confirm</button>
                    <button className="btn" onClick={() => closeModal('DeleteTWGameModal')}>Cancel</button>
                </div>
            </div>
        </dialog>
    )
}

export default DeleteTWGameModal