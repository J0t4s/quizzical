import {useState, useEffect} from 'react'
import { nanoid } from 'nanoid/non-secure'

function Questions(props) {
    const [isChecked, setIsChecked] = useState(false)
    function checkAnswer() {
        setIsChecked(prevIsChecked => !prevIsChecked)
        props.start
    }
    let score = 0
    const quiz = props.quizData.map(quizEl => {
        function shuffleAnswer() {
            const answerCorrect = {
                value: quizEl.correct_answer.replace(/&quot;/g, '"')
                .replace(/&eacute;/g, 'é')
                .replace(/&micro;/g, 'µ')
                .replace(/&#039;/gi,`'`)
                .replace(/&ouml;/gi, `ö`)
                .replace(/&amp;/g, `&`),
                isCorrect: true,
                isHeld: false,
                id: nanoid(10)
            }
            const answerIncorrectArr = quizEl.incorrect_answers.map(option => {
                return {
                    value: option.replace(/&quot;/g, '"')
                    .replace(/&eacute;/g, 'é')
                    .replace(/&micro;/g, 'µ')
                    .replace(/&#039;/gi,`'`)
                    .replace(/&ouml;/gi, `ö`)
                    .replace(/&amp;/g, `&`),
                    isCorrect: false,
                    isHeld: false,
                    id: nanoid(10)
                }
            })
            const arr= [answerCorrect, ...answerIncorrectArr]
            let newPos
            let temp
            for(let i = arr.length - 1; i > 0; i--) {
                newPos = Math.floor(Math.random() * (i + 1))
                temp = arr[i]
                arr[i] = arr[newPos]
                arr[newPos] = temp
            }

            return arr
        }
        const shuffleAnswerArr = shuffleAnswer()
        const [answerArr, setAnswerArr] = useState(shuffleAnswerArr)
        function choseAnswer(id) {
            if(isChecked === false) {
                const held = answerArr.every(answer => answer.isHeld === false)
                if(held) {
                    setAnswerArr(prevAnswerArr =>prevAnswerArr.map(answer => {

                        return (
                            answer.id === id ?
                            {...answer, isHeld: !answer.isHeld} :
                            answer
                        )
                    }))
                }else {
                    setAnswerArr(prevAnswerArr =>prevAnswerArr.map(answer => {
                        answer.isHeld = false

                        return (
                            answer.id === id ?
                            {...answer, isHeld: !answer.isHeld} :
                            answer
                        )
                    }))
                }
            }else{

                return
            }
        }
        const answerEl = answerArr.map(answer => {
            let styles
            if(isChecked === false) {
                styles = {
                    backgroundColor: answer.isHeld ? "#D6DBF5" : "#F5F7FB"
                }
            }else{
                if(answer.isCorrect ) {
                    styles = {
                        backgroundColor: "#94D7A2"
                    }
                }else if(answer.isHeld && !answer.isCorrect){
                    styles = {
                        backgroundColor: "#F8BCBC", opacity: 0.5
                    }
                    score++
                }else{
                    styles = {
                        backgroundColor: "#F5F7FB", opacity: 0.5
                    }
                }
            }

            return (
            <p 
                key={nanoid(10)}
                style={styles} 
                className='options' 
                onClick={() => choseAnswer(answer.id)}
            >
                {answer.value}
            </p>
        )
        })

        return (
          <div className='question' key={quizEl.correct_answer}>
                <h3>{quizEl.question.replace(/&quot;/g, '"')
                        .replace(/&eacute;/g, 'é')
                        .replace(/&micro;/g, 'µ')
                        .replace(/&#039;/gi,`'`)
                        .replace(/&ouml;/gi, `ö`)
                        .replace(/&amp;/g, `&`)
                    }
                </h3>
                {answerEl}
          </div>
        )
    }) 


    return (
        <>
            {quiz}
                {isChecked ? 
                    <div className='play__again'>
                        <p className='play__again-text'>You scored {score}/5 correct answers</p>
                        <button
                            className='play__again-btn'
                            onClick={props.playAgain} 
                        >
                            Play again
                        </button>
                    </div>
                :
                <button 
                    className='btn'
                    onClick={checkAnswer}
                >
                    Check answers   
                </button> }
        </>
    )
}

export default Questions
