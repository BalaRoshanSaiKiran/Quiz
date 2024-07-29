import { useEffect, useState } from "react"

import useSound from "use-sound"
import play from "../assets/play.mp3"
import win from "../assets/win.mp3"
import wrong from "../assets/wrong.mp3"

export default function Trivia({
    data,
    setStop,
    questionNumber,
    setQuestionNumber
}) {
    const [question,setQuestion]=useState(null)
    const [selectedAnswer,setselectedAnswer]=useState(null)
    const [className,setClassName]=useState("answer")

    const [letsPlay]=useSound(play)
    const [correctAnswer]=useSound(win)
    const [wrongAnswer]=useSound(wrong)

    useEffect(()=>{
      letsPlay()
    },[])

    useEffect(()=>{
        setQuestion(data[questionNumber-1])
    },[data,questionNumber])


    const delay=(duration,callback)=>{
      setTimeout(()=>{
        callback()
      },duration)
    }

    const handleClick=(a)=>{
      setselectedAnswer(a)
      setClassName("answer active")
      delay(3000,()=>setClassName(a.correct?"answer correct":"answer wrong"))
      delay(5000,()=>{
        if(a.correct){
          setQuestionNumber((prev)=>prev+1)
          setselectedAnswer(null)
          correctAnswer()
        }else{
          setStop(true)
          wrongAnswer()
        }
      })

    }

  return (
    <div className="Trivia">
        <div className="question">{question?.question}</div>
        <div className="answers">
        {question?.answer.map((a)=>(
          <div className={selectedAnswer===a?className:"answer"} 
            onClick={()=>handleClick(a)}
          >
            {a.text}
          </div>
          ))}
        </div>
    </div>
  )
}
