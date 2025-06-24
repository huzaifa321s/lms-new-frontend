import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ErrorText from '../../../components/Typography/ErrorText';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Show } from '../../../../shared/utils/Show';
import { createNewSentenceArray } from '../../../utils/helperFunctions';


const TrainingWheelGameForm = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const TEMPLATE_OBJ = {
        question: "",
        answer: "",
        category: "",
        levels: ['beginner']
    };

    const [gameObj, setGameObj] = useState(TEMPLATE_OBJ);
    const [gameCategories, setGameCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGameObj({ ...gameObj, [name]: value });
    }

    const handleCheckboxes = (e) => {
        const { name, checked } = e.target;
        let levelArr = [...gameObj.levels];
        if (!levelArr.includes(name) && checked) {
            levelArr.push(name);
        } else {
            levelArr = levelArr.filter(l => l !== name);
        }
        console.log("Level Array: ", levelArr)
        setGameObj({ ...gameObj, levels: levelArr })
    }


    // API methods
    const addQuestion = useCallback(async (action = 'add') => {
        const { question, answer, category, levels } = gameObj;

        // Validate
        if (question.trim() === "") {
            return setErrorMessage("Question is required!")
        }
        else if (answer.trim() === "") {
            return setErrorMessage("Answer is required!");
        }
        else if (answer.split(" ").length < 6) {
            return setErrorMessage("We'll break answer into 6 words, so sentence should have atleast 6 words");
        }
        else if (category.trim() === "") {
            return setErrorMessage("Category is required!")
        }
        else if (levels.length === 0) {
            return setErrorMessage("At least provide one level!")
        }

        let answerArr = answer.split(" ");
        if (answerArr.length !== 6) {
            answerArr = createNewSentenceArray(answerArr);
        }

        const reqBody = { question, answer, answer_in_chunks: answerArr, category, levels };

        try {
            let response = await axios.post("/teacher/game/training-wheel-game/create", reqBody);
            response = response.data;
            if (response.success) {
                toast.success(response.message);
                // Add
                if (action === 'add') {
                    navigate('/teacher/training-wheel-game');
                }
                // Add and New
                if (action === 'add-and-new') {
                    setGameObj(TEMPLATE_OBJ);
                }

            };
        } catch (error) {
            const errorResponse = error.response.data;
            toast.error(errorResponse.message);
        }
    },[gameObj,axios,toast]);

    const updateQuestion = useCallback(async () => {
        const { question, answer, category, levels } = gameObj;

        // Validate
        if (question.trim() === "") {
            return setErrorMessage("Question is required!")
        }
        else if (answer.trim() === "") {
            return setErrorMessage("Answer is required!");
        }
        else if (answer.split(" ").length < 6) {
            return setErrorMessage("We'll break answer into 6 words, so sentence should have atleast 6 words");
        }
        else if (category.trim() === "") {
            return setErrorMessage("Category is required!")
        }
        else if (levels.length === 0) {
            return setErrorMessage("At least provide one level!")
        }

        let answerArr = answer.split(" ");
        if (answerArr.length !== 6) {
            answerArr = createNewSentenceArray(answerArr);
        }

        const reqBody = { question, answer, answer_in_chunks: answerArr, category, levels };

        try {
            let response = await axios.put(`/teacher/game/training-wheel-game/update/${id}`, reqBody);
            response = response.data;
            if (response.success) {
                toast.success(response.message);
                navigate('/teacher/training-wheel-game');
            };
        } catch (error) {
            const errorResponse = error.response.data;
            toast.error(errorResponse.message);
        }
    },[gameObj,axios,id,toast]);

    const getTWGame = useCallback(async () => {
        try {
            let response = await axios.get(`/teacher/game/training-wheel-game/get-game/${id}`);
            response = response.data;

            if (response.success) {
                let game = response.data;

                const cArr = game.answer_in_chunks;
                game = {
                    question: game.question,
                    answer: game.answer,
                    chunk_1: cArr[0], chunk_2: cArr[1], chunk_3: cArr[2],
                    chunk_4: cArr[3], chunk_5: cArr[4], chunk_6: cArr[5],
                    category: game.category,
                    levels: game.difficulties,
                }
                setGameObj(game);
            }

        } catch (error) {
            const errorMessage = error.response.data.message;
            console.error(errorMessage);
        }
    }, [axios,id]);

    const getGameCategories = useCallback(async () => {
        try {
            let response = await axios.get("/teacher/game-category/getAll");
            response = response.data;
            if (response.success) {
                setGameCategories(response.data)
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    },[axios]);


    useEffect(() => {
        if (id) getTWGame();
        getGameCategories();
    }, [id, getTWGame])

    return (
        <div>
            <div className='mb-4 w-full flex justify-between'>
                <div className='text-2xl font-semibold flex items-center gap-2'>
                    {id ? "Update Question" : "Add Question"}
                </div>
                <button className='btn' onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>
            </div>

            <div className='card w-full p-6 bg-base-100 shadow-xl mt-2'>

                <div className="mb-3 flex gap-4">
                    <div className="form-control w-full">
                        <label className="label label-text text-base-content"> Question </label>
                        <textarea
                            type="text"
                            className="textarea textarea-bordered textarea-sm w-full"
                            name='question'
                            value={gameObj.question}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-3 flex gap-4">
                    <div className="form-control w-full">
                        <label className="label label-text text-base-content"> Answer (We'll break answer into 6 words, so sentence should have atleast 6 words)</label>
                        <textarea
                            type="text"
                            className="textarea textarea-bordered text-sm textarea-lg w-full"
                            name='answer'
                            value={gameObj.answer}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <div className="mb-3 flex justify-between items-center">
                        <div className="mb-3 flex gap-2">
                            <div className="mr-6 form-control">
                                <label className="label label-text text-base-content"> Category </label>
                                <select
                                    className="select select-bordered w-full" value={gameObj.category}
                                    onChange={(e) => {
                                        setGameObj(prevState => ({
                                            ...prevState,
                                            category: e.target.value,
                                        }))
                                    }}
                                >
                                    <option> Select category </option>
                                    {gameCategories.length > 0 && gameCategories.map((category) => (
                                        <option key={category._id} value={category._id}> {category.name} </option>
                                    ))}
                                </select>
                            </div>


                            <div>
                                <div className='flex gap-3 mt-2'>
                                    In which level this question may appear?
                                </div>
                                <div className='flex gap-3 my-2'>
                                    <div className="form-control">
                                        <label className="label cursor-pointer flex gap-2">
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                name='beginner'
                                                checked={gameObj.levels.includes('beginner')}
                                                onChange={handleCheckboxes}
                                            />
                                            <span className="label-text">Beginner</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer flex gap-2">
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                name='intermediate'
                                                checked={gameObj.levels.includes('intermediate')}
                                                onChange={handleCheckboxes}
                                            />
                                            <span className="label-text">Intermediate</span>
                                        </label>
                                    </div>
                                    <div className="form-control">
                                        <label className="label cursor-pointer flex gap-2">
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                name='expert'
                                                checked={gameObj.levels.includes('expert')}
                                                onChange={handleCheckboxes}
                                            />
                                            <span className="label-text">Expert</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>

                        <Show>
                            <Show.When isTrue={!id}>
                                <div className='flex gap-2'>
                                    <button className={"btn gradiant-btn my-2"} onClick={() => addQuestion('add')}>
                                        Add
                                    </button>
                                    <button className={"btn gradiant-btn my-2"} onClick={() => addQuestion('add-and-new')}>
                                        Add and New
                                    </button>
                                </div>
                            </Show.When>

                            <Show.Else>
                                <button className={"btn gradiant-btn my-2"} onClick={() => updateQuestion()}>
                                    Save Changes
                                </button>
                            </Show.Else>
                        </Show>
                    </div>

                </div>
            </div>







        </div>
    )
}

export default TrainingWheelGameForm