import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Show } from "../../../../../shared/utils/Show"
// import QuestionBox from './QuestionBox/QuestionBox';
import QuestionBox from './QuestionBox/QuestionBox';
import Timer from './Timer';


const Game = ({ handleScoreCard, selectedLevel }) => {

    const [score, setScore] = useState(0);

    const [index, setIndex] = useState(0);
    const [ques, setQues] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [showSubmitBtn, setShowSubmitBtn] = useState(false);

    const [isTimerRunning, setIsTimerRunning] = useState(true);

    // Input we take from student!
    const [rNo1, setRno1] = useState(null);
    const [rNo2, setRno2] = useState(null);
    const [rNo3, setRno3] = useState(null);
    const [rNo4, setRno4] = useState(null);
    const [rNo5, setRno5] = useState(null);
    const [rNo6, setRno6] = useState(null);


    // Handle Questions.
    const next = () => {
        const nextIndex = index + 1;
        const nextQuestion = ques[nextIndex];
        if (nextIndex < ques.length) {
            // Handle index & question.
            setIndex(nextIndex);
            setCurrentQuestion(nextQuestion);
            // Restart timer.
            setIsTimerRunning(true);
        } else {
            setShowSubmitBtn(true);
        }
    };


    const validate = useCallback(async ({ timeup = false, errorMessage = "Incorrect answer!" }) => {
        // Chunked answer.
        const answeredChunksArr = [rNo1, rNo2, rNo3, rNo4, rNo5, rNo6];
        // Normalize answer (remove extra whitespaces and lowercase the letters.)
        const chunkedAnswerStr = answeredChunksArr.join(' ').replace(/\s+/g, ' ').trim().toLowerCase();
        const normalizedAnswer = currentQuestion.answer.replace(/\s+/g, ' ').trim().toLowerCase();

        if (chunkedAnswerStr === normalizedAnswer && !timeup) {
            setIsTimerRunning(false); // Pause timer.
            await Swal.fire({
                icon: 'success',
                title: 'Correct answer!',
            });
            // Increment score.
            setScore((prev) => prev + 1);
            if (index === ques.length - 1) {
                setShowSubmitBtn(true);
            } else {
                next();
            }
        } else {
            setIsTimerRunning(false); // Pause timer.
            await Swal.fire({
                icon: 'error',
                title: errorMessage,
            });
            next();
        }
    },[rNo1,rNo2,rNo3,rNo4,rNo5,rNo5,rNo6,ques]);




    // API methods:
    const getQuestions = useCallback(async () => {
        try {
            let response = await axios.get(`/student/game/training-wheel-game/get?level=${selectedLevel}`, {
                skipInterceptors: true // Custom flag to skip the interceptor.
            });
            response = response.data;
            if (response.success) {
                setQues(response.data);
                setCurrentQuestion(response.data[0]);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    },[axios,selectedLevel])

    const submit = useCallback(async () => {
        try {
            let response = await axios.post("/student/game/training-wheel-game/submit", {
                score,
                difficultyLevel: selectedLevel
            });

            response = response.data;
            if (response.success) {
                handleScoreCard(ques.length, score);
            }
        } catch (error) {
            if (error.message) {
                toast.error(error.message);
            } else {
                toast.error(error.response.data.message)
            }
        }
    },[axios,selectedLevel,score,ques,toast])



    // Ask before the Hard reload.
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            const confirmationMessage = 'Are you sure you want to leave this page?';
            e.returnValue = confirmationMessage; // Standard for most browsers
            return confirmationMessage; // For some older browsers
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <>

            <Show>
                <Show.When isTrue={currentQuestion !== null}>
                    <div className='flex justify-between mb-16 items-center'>
                        <div className='sm:text-[1.1rem] md:text-[1.3rem]'>{index + 1 + ')'} {currentQuestion?.question}</div>
                        <div className='flex justify-center ml-10'>
                            {index + 1} out of {ques.length}
                        </div>
                    </div>

                    <div className="min-h-[40vh] grid grid-cols-2 sm:grid-cols-3 sm:text-[0.8rem] md:grid-cols-3 sm:text-[0.1rem] lg:grid-cols-6 xl:grid-cols-6 gap-4">
                        <div className='flex justify-evenly items-center '>
                            <QuestionBox words={currentQuestion?.answer_in_chunks} handleSelection={setRno1} />
                            <div className='h-[200px] w-[2px] bg-gray-400 ml-4 sm:mx-3'></div>
                        </div>
                        <div className='flex justify-evenly items-center '>
                            <QuestionBox words={currentQuestion?.answer_in_chunks} handleSelection={setRno2} />
                            <div className='h-[200px] w-[2px] bg-gray-400 ml-4 sm:mx-3 hidden sm:flex'></div>
                        </div>
                        <div className='flex justify-evenly items-center '>
                            <QuestionBox words={currentQuestion?.answer_in_chunks} handleSelection={setRno3} />
                            <div className='h-[200px] w-[2px] bg-gray-400 ml-4 sm:mx-3 flex sm:hidden md:hidden lg:flex'></div>
                        </div>
                        <div className='flex justify-evenly items-center '>
                            <QuestionBox words={currentQuestion?.answer_in_chunks} handleSelection={setRno4} />
                            <div className='h-[200px] w-[2px] bg-gray-400 ml-4 sm:mx-3 hidden sm:flex'></div>
                        </div>
                        <div className='flex justify-evenly items-center '>
                            <QuestionBox words={currentQuestion?.answer_in_chunks} handleSelection={setRno5} />
                            <div className='h-[200px] w-[2px] bg-gray-400 ml-4 sm:mx-3'></div>
                        </div>
                        <div className='flex justify-evenly items-center '>
                            <QuestionBox words={currentQuestion?.answer_in_chunks} handleSelection={setRno6} />
                        </div>
                    </div>


                    {/* <div className='flex justify-center items-center min-h-[40vh] bg-primary mb-20'>
                        <div className='flex flex-wrap gap-2'>
                            <Swipp words={currentQuestion?.answer_in_chunks} handleSelection={setRno1} />
                            <div className='h-[200px] w-[2px] bg-gray-400 mx-2'></div>
                            <Swipp words={currentQuestion?.answer_in_chunks} handleSelection={setRno2} />
                            <div className='h-[200px] w-[2px] bg-gray-400 mx-2'></div>
                            <Swipp words={currentQuestion?.answer_in_chunks} handleSelection={setRno3} />
                            <div className='h-[200px] w-[2px] bg-gray-400 mx-2'></div>
                            <Swipp words={currentQuestion?.answer_in_chunks} handleSelection={setRno4} />
                            <div className='h-[200px] w-[2px] bg-gray-400 mx-2'></div>
                            <Swipp words={currentQuestion?.answer_in_chunks} handleSelection={setRno5} />
                            <div className='h-[200px] w-[2px] bg-gray-400 mx-2'></div>
                            <Swipp words={currentQuestion?.answer_in_chunks} handleSelection={setRno6} />
                        </div>
                    </div> 


                    {/* 
                        bg-yellow-100
                        bg-blue-100
                        bg-green-100
                        bg-red-100
                        bg-purple-100
                        bg-green-100
                    */}

                    <div className='flex mt-12'>
                        <Timer
                            level={selectedLevel}
                            validate={validate}
                            index={index}
                            isRunning={isTimerRunning}
                        />

                        <Show>
                            <Show.When isTrue={showSubmitBtn}>
                                <button onClick={submit} className='btn gradiant-btn float-right'>
                                    Submit Result
                                </button>

                            </Show.When>
                            <Show.Else>
                                <button onClick={validate} className='btn gradiant-btn float-right'>
                                    Next
                                </button>
                            </Show.Else>
                        </Show>
                    </div>


                </Show.When>

                <Show.Else>
                    <div className='min-h-[70vh] w-full flex justify-center items-center'>
                        <img src="/question-animation.gif" className="h-[400px] w-[400px]" alt="dashwind-logo" />
                    </div>
                </Show.Else>
            </Show>
        </>


    )
}

export default Game;