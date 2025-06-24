import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'

const ViewTWGameDetailModal = ({ closeModal, ModalId, gameId }) => {

    const [gameObj, setGameObj] = useState(null);



    const getTWGame = useCallback(async () => {
        try {
            let response = await axios.get(`/teacher/game/training-wheel-game/get-game/${gameId}`);
            response = response.data;

            if (response.success) {
                const game = response.data;
                setGameObj(game);
            }

        } catch (error) {
            const errorMessage = error.response.data.message;
            console.error(errorMessage);
        }
    }, [gameId])




    useEffect(() => {
        if (gameId) getTWGame();

        return () => setGameObj(null);
    }, [gameId, getTWGame])


    return (
        <dialog id={ModalId} className="modal">
            {gameObj && <div className="modal-box">

                <h3 className="font-semibold text-2xl">{gameObj.question}</h3>
                <h3 className="text-lg mt-4">{gameObj.answer}</h3>
                <ul className='list-disc mx-6 mt-4'>
                    {gameObj.answer_in_chunks.map((option, i) => {
                        return <li key={i}>{option}</li>
                    })}
                </ul>
                <div className="modal-action">
                    <button className="btn" onClick={() => closeModal('ViewTWGameDetailModal')}>Close</button>
                </div>

            </div>}
        </dialog>
    )
}

export default ViewTWGameDetailModal