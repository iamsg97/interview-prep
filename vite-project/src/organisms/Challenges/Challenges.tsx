import { useEffect, useState } from 'react'

export const Challenges = () => {
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        if (!isRunning) return
        const id = setInterval(() => {
            setSeconds(prevState => prevState + 1)
        }, 1000)
        return () => clearInterval(id)
    }, [isRunning, seconds])

    return (
        <div>
            <h1>Challenges</h1>
            <h2>Elapsed: {seconds} seconds</h2>
            <button
                style={{ marginRight: '10px' }}
                onClick={() => setIsRunning(true)}
            >
                Start
            </button>
            <button
                style={{ marginRight: '10px' }}
                onClick={() => setIsRunning(false)}
            >
                Pause
            </button>
            <button
                onClick={() => {
                    setSeconds(0)
                    setIsRunning(false)
                }}
            >
                Reset
            </button>
        </div>
    )
}
