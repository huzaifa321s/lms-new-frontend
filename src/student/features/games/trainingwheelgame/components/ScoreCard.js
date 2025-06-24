import Confetti from 'react-confetti'
import React, { useEffect, useState } from 'react'

const ScoreCard = ({ scoreCard, setStep }) => {

  const { totalQuestions, score } = scoreCard;
  const [partyPooper, setPartyPooper] = useState(false);

  useEffect(() => {
    const scorePercent = (score / totalQuestions) * 100;

    if (scorePercent >= 75) {
      setPartyPooper(true);
    }
  }, [])



  return (
    <div className='min-h-[70vh] w-full flex justify-center items-center'>
      {partyPooper && <Confetti width={1500} height={1000} recycle={false} />}

      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-bold'>You've scored {scoreCard.score} points.</h1>
        <p className='text-2xl mt-2'>Total {scoreCard.totalQuestions} questions attempt.</p>
        <button className='btn gradiant-btn mt-4' onClick={() => setStep('game')}>Play Again</button>
      </div>
    </div>
  )
}

export default ScoreCard;