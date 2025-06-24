function LevelCard({ level, setStep, selectedLevel, setSelectedLevel }) {
    return (
        <>

            <div
                onClick={() => setSelectedLevel(level.title)}
                className={`card card-compact bg-base-100 ${selectedLevel === level.title ? 'shadow-xl' : 'shadow'}`}
            >
                <figure className="px-10 pt-10">
                    <img src={`/${level.title}-level-game.png`} alt="Game Level" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title capitalize">{level.title} level</h2>
                    <ul className="text-gray-700 text-left flex flex-col gap-4 mt-3">
                        {
                            level.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </span>
                                    <span>{f}</span>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="card-actions">
                        <button
                            onClick={() => setStep('game')}
                            disabled={selectedLevel !== level.title}
                            className="btn gradiant-btn mt-4 px-12"
                        >
                            Let's Begin
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}


export default LevelCard;