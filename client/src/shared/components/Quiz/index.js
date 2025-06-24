import './Quiz.css'
import dummyMcqs from './dummyMcqs'
import { Show } from '../../utils/Show';
import React, { useState } from 'react'

const Quiz = () => {

    const [index, setIndex] = useState(0);
    const [mcq, setMcq] = useState(dummyMcqs[index]);


    const [score, setScore] = useState(0);
    const [game, setGame] = useState(true);
    const [lock, setLock] = useState(false);


    // Validate answer
    const checkAns = (e, ans) => {
        if (!lock) {
            if (mcq.answer === ans) {
                e.target.classList.add('bg-green-100');
                setScore(score => score + 1);
            } else {
                e.target.classList.add('bg-red-100');
                document.querySelectorAll('.option').forEach(option => {
                    if (option.innerText === mcq.answer) {
                        option.classList.add('bg-green-100');
                    }
                });
            }
            setLock(true);
        }
    }

    // Next Question
    const next = () => {
        if (index < dummyMcqs.length - 1) {
            setIndex(index => index + 1);
            setMcq(dummyMcqs[index + 1]);

            // Reset everything for new question.
            setLock(false);
            document.querySelectorAll('.option').forEach(option => {
                option.classList.remove('bg-green-100');
                option.classList.remove('bg-red-100');
            });
            
        } else {
            setGame(false);
        }
    }




    return (
        <>


        
            <Show>
                <Show.When isTrue={game}>
                    <div className='m-10 container w-96'>
                        <h1 className='flex justify-center text-4xl font-bold'>Quiz</h1>
                        <p className='font-semibold text-lg mt-4 min-h-full'>Q. {index + 1} {mcq.question} </p>
                        <ul className=''>
                            <li className='option' onClick={(e) => checkAns(e, mcq.option1)} >{mcq.option1}</li>
                            <li className='option' onClick={(e) => checkAns(e, mcq.option2)} >{mcq.option2}</li>
                            <li className='option' onClick={(e) => checkAns(e, mcq.option3)} >{mcq.option3}</li>
                            <li className='option' onClick={(e) => checkAns(e, mcq.option4)} >{mcq.option4}</li>
                        </ul>
                        <button className='btn gradiant-btn w-full' onClick={() => next()}>Next</button>
                        <div className='flex justify-center w-full py-4'>{index + 1} out of {dummyMcqs.length} questions</div>
                    </div>
                </Show.When>
                <Show.Else>
                    Your final score is {score}
                </Show.Else>
            </Show>
        </>
    )
}

export default Quiz