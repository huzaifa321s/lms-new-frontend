import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Show } from '../../../../shared/utils/Show';
import DeleteTWGameModal from './components/DeleteTWGameModal';
import ViewTWGameDetailModal from './components/ViewTWGameDetailModal';

const TrainingWheelGame = () => {

    const navigate = useNavigate();
    const location = useLocation();
    
    const [queryParameters] = useSearchParams();

    const [questions, setQuestions] = useState([]);
    const [questionId, setQuestionId] = useState(null); // for del, update

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(Number(queryParameters.get("page")));
    const [searchInput, setSearchInput] = useState(queryParameters.get("q") || "");


    // Modal
    const openModal = (modalId, data) => {
        if (modalId === 'DeleteTWGameModal') {
            setQuestionId(data);
        }
        if (modalId === 'ViewTWGameDetailModal') {
            setQuestionId(data);
        }

        document.getElementById(modalId).showModal();
    };

    const closeModal = (modalId) => {
        document.getElementById(modalId).close(); // Close the modal
    };

    // Search & Pagination
    const searchQuestions = () => {
        if (searchInput !== "") {
            navigate(`/teacher/training-wheel-game?page=1&q=${searchInput}`)
        } else {
            navigate(`/teacher/training-wheel-game?page=1`)
        }
    };

    const handlePageChange = (page) => {
        if (searchInput !== "") {
            navigate(`/teacher/training-wheel-game?page=${page}&q=${searchInput}`)
        } else {
            navigate(`/teacher/training-wheel-game?page=${page}`)
        }
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const maxButtons = 4;
        const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (startPage > 1) {
            buttons.push(
                <button key="first" className="join-item btn" onClick={() => handlePageChange(1)}>1</button>
            );
            if (startPage > 2) {
                buttons.push(
                    <span key="ellipsis-1" className="btn">...</span>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`join-item btn ${currentPage === i ? 'btn-active' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                buttons.push(
                    <span key="ellipsis-2" className="btn">...</span>
                );
            }
            buttons.push(
                <button key="last" className="join-item btn" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
            );
        }

        return buttons;
    };



    // API methods
    const getQuestions = useCallback(async () => {
        const pageNumber = queryParameters.get("page");
        const searchQuery = queryParameters.get("q");

        let queryStr = `page=${pageNumber}`
        if (searchQuery) {
            queryStr += `&q=${searchQuery}`;
        }

        try {
            let response = await axios.get(`/teacher/game/training-wheel-game/get?${queryStr}`);
            response = response.data;
            if (response.success) {
                
                const { games, totalPages } = response.data;
                setQuestions(games)
                setTotalPages(totalPages)
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    },[queryParameters,axios]);

    const deleteGame = useCallback(async () => {
        try {
            let response = await axios.delete(`/teacher/game/training-wheel-game/delete/${questionId}`);
            response = response.data;
            if (response.success) {
                getQuestions();
            }
        } catch (error) {
            console.log("Error: ", error);
        } finally {
            closeModal('DeleteTWGameModal');
        }
    },[axios,questionId]);

    useEffect(() => {
        getQuestions();
        setCurrentPage(Number(queryParameters.get("page")) || 1);
    }, [location.search]);


    return (
        <div>

            {/* Modal */}
            <DeleteTWGameModal ModalId={"DeleteTWGameModal"} deleteGame={deleteGame} closeModal={closeModal} />
            <ViewTWGameDetailModal ModalId={"ViewTWGameDetailModal"} closeModal={closeModal} gameId={questionId} />

            <div className='mb-4 w-full flex justify-between'>
                <div className='text-2xl font-semibold'>
                    Training Wheel Game
                </div>
                <div className='flex gap-4'>
                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Search" onChange={(e) => setSearchInput(e.target.value)} />
                        <kbd className="kbd kbd-sm" onClick={() => searchQuestions()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </kbd>
                    </label>
                    <button className="btn btn-active" onClick={() => navigate('/teacher/training-wheel-game/create')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className='card  w-full bg-base-100 shadow-xl h-[80vh]'>
                <div className="card-body" style={{ position: "relative" }}>
                    <div className="overflow-x-auto w-full">
                        <Show>
                            <Show.When isTrue={questions.length > 0}>
                                <table className="table w-full">
                                    <thead>
                                        <tr >
                                            <th>Questions</th>
                                            <th>Category</th>
                                            <th>Difficulty levels</th>
                                            <th className='text-right pr-20'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            questions.map((l, k) => {
                                                return (
                                                    <tr key={k}>
                                                        <td>{l.question}</td>
                                                        <td>{l.category?.name}</td>
                                                        <td className='flex gap-1'>
                                                            {l.difficulties.map((d, i) => {
                                                                let color;
                                                                if (d === 'beginner') color = 'text-white bg-lime-600';
                                                                else if (d === 'intermediate') color = 'text-white bg-amber-600';
                                                                else if (d === 'expert') color = 'text-white bg-red-600';

                                                                return <div key={i} className={`badge ${color} p-2 badge-xs capitalize`}>{d}</div>
                                                            })}
                                                        </td>
                                                        <td className='text-right'>
                                                            <button className='btn btn-ghost btn-xs' onClick={() => openModal('ViewTWGameDetailModal', l._id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                </svg>

                                                            </button>
                                                            <button className='btn btn-ghost btn-xs' onClick={() => navigate(`/teacher/training-wheel-game/edit/${l._id}`)}  >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                                </svg>
                                                            </button>
                                                            <button className='btn btn-ghost btn-xs' onClick={() => openModal('DeleteTWGameModal', l._id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </Show.When>
                            <Show.Else>
                                <div>
                                    No Training Wheel Game Found!
                                </div>
                            </Show.Else>
                        </Show>
                    </div>
                </div>




                <div className='flex justify-center w-11/12' style={{ position: "absolute", bottom: "20px" }}>
                    <div className="join">
                        {currentPage > 1 && (
                            <button className="join-item btn text-white-slate-300" onClick={() => handlePageChange(currentPage - 1)}>«</button>
                        )}
                        {renderPaginationButtons()}
                        {currentPage < totalPages && (
                            <button className="join-item btn text-white-slate-300" onClick={() => handlePageChange(currentPage + 1)}>»</button>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TrainingWheelGame