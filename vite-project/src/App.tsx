import {useState} from 'react'
import './App.css'
import {BookCarRental} from "./organisms/BookCarRental/BookCarRental.tsx";
import {Challenges} from "./organisms/Challenges/Challenges.tsx";

function App() {
    const [count, setCount] = useState(0)

    const startTimer = () => {
        setInterval(() => {
            setCount(prevCount => prevCount + 1)
        }, 1000)
    }

    return (
        [
            <h1 key='heading'>Vite + React</h1>,
            <div key='card-div' className="card">
                <p>Count is {count}</p>
                <button onClick={startTimer}>
                    Start Timer
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>,

            <BookCarRental key={'book-car-rental'}/>, <Challenges/>
        ]
    )
}

export default App
