import { useState, useEffect } from 'react'
import Questions from './assets/components/Questions'
import Start from './assets/components/Start'
import blob2 from './assets/img/blob-2.svg'
import blob1 from './assets/img/blob.svg'
import './index.css'

function App() {
  const [HasStarted, setHasStarted] = useState(false)
  const [reFetch, setReFetch] = useState(false)
  const [quizData, setQuizData] = useState({})

  function start() {
      setHasStarted(PrevStarted => !PrevStarted)
  }

  useEffect(() => {
      fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => setQuizData(data.results))
  }, [reFetch])

  function playAgain() {
    setHasStarted(PrevStarted => PrevStarted === false)
    setReFetch(prevFetch => !prevFetch)
  }

  return (
    <>
        <img src={blob2} alt="" className='blob-2'/>
      <main>
        {HasStarted === false && <Start start={start}/>}
        {HasStarted && <Questions
          quizData={quizData}
          start={start}
          playAgain={playAgain}
        
        />}
        <div className='img-wraper'>
        <img src={blob1} alt="" className='blob-1'/>
        </div >
      </main>
    </>
  )
}

export default App
