import React, { useCallback, useEffect, useState } from 'react'
import Game from './components/Game';
import ScoreCard from './components/ScoreCard';
import StartGame from './components/StartGame';

const TrainingWheelGame = () => {

  const [step, setStep] = useState('start-game');
  const [selectedLevel, setSelectedLevel] = useState('intermediate');
  const [scoreCard, setScoreCard] = useState({ score: 0, questionCount: 0 });

  // Show score card.
  const handleScoreCard = (totalQuestions, score = 0) => {
    setScoreCard({ totalQuestions, score, difficultyLevel: selectedLevel });
    setStep('score-card');
  };


  return (
    <div>

      <div className='mb-4 w-full flex justify-between'>
        <div className='text-2xl font-semibold flex items-center gap-2'>
          Training Wheel Game
        </div>
      </div>

      <div className='card w-full bg-base-100 shadow-xl lg:min-h-[80vh]'>
        <div className="card-body" style={{ position: "relative" }}>
          {step === 'start-game' && <StartGame setStep={setStep} selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} />}
          {step === 'game' && <Game selectedLevel={selectedLevel} setStep={setStep} handleScoreCard={handleScoreCard} />}
          {step === 'score-card' && <ScoreCard scoreCard={scoreCard} setStep={setStep} />}
        </div>
      </div>



    </div>
  )
}

export default TrainingWheelGame