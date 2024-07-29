import { useEffect, useMemo, useState } from "react";
import "./app.css";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer"

function App() {

  const [questionNumber,setQuestionNumber]=useState(1)
  const [stop,setStop]=useState(false)
  const [earned,setEarned]=useState("$ 0")

  const data=[
    {
      id:1,
      question:"Rolex  is a company that specializes in what type of product?",
      answer:[
        {
          text:"Phones",
          correct:false,
        },
        {
          text:"Watches",
          correct:true,
        },
        {
          text:"TV`s",
          correct:false,
        },
        {
          text:"Bikes",
          correct:false,
        }
      ]
    },
    {
      id:2,
      question:"What is the capital of India?",
      answer:[
        {
          text:"Mumbai",
          correct:false,
        },
        {
          text:"Kolkata",
          correct:false,
        },
        {
          text:"Delhi",
          correct:true,
        },
        {
          text:"Hyderabad",
          correct:false,
        }
      ]
    },
    {
      id:3,
      question:"Hyderabad is a capital of?",
      answer:[
        {
          text:"Telangana",
          correct:true,
        },
        {
          text:"Tamilnadu",
          correct:false,
        },
        {
          text:"Karnataka",
          correct:false,
        },
        {
          text:"AndhraPradesh",
          correct:false,
        }
      ]
    },
    {
      id:4,
      question:"State with high Litracy rate in India?",
      answer:[
        {
          text:"AndhraPradesh",
          correct:false,
        },
        {
          text:"Karnataka",
          correct:false,
        },
        {
          text:"Kerala",
          correct:true,
        },
        {
          text:"Maharastra",
          correct:false,
        }
      ]
    },
    {
      id:5,
      question:"Most populated state in india?",
      answer:[
        {
          text:"AndhraPradesh",
          correct:false,
        },
        {
          text:"MadhyaPradesh",
          correct:false,
        },
        {
          text:"ArunachalPradesh",
          correct:false,
        },
        {
          text:"UttarPradesh",
          correct:true,
        }
      ]
    }
  ]

  const moneyPyramid=useMemo(()=>
    [
      {id:1,amount:"$ 100"},
      {id:2,amount:"$ 200"},
      {id:3,amount:"$ 300"},
      {id:4,amount:"$ 500"},
      {id:5,amount:"$ 1000"},
      {id:6,amount:"$ 2000"},
      {id:7,amount:"$ 4000"},
      {id:8,amount:"$ 8000"},
      {id:9,amount:"$ 16000"},
      {id:10,amount:"$ 32000"},
      {id:11,amount:"$ 64000"},
      {id:12,amount:"$ 125000"},
      {id:13,amount:"$ 250000"},
      {id:14,amount:"$ 500000"},
      {id:15,amount:"$ 1000000"},
      
    ].reverse(),
  [])

  useEffect(()=>{
    questionNumber>1 && setEarned(moneyPyramid.find(m=>m.id===questionNumber-1).amount)
  },[moneyPyramid,questionNumber])


  return (
    <div className="App">
      <div className="main">
        {stop ? <h1 className="endText">You Earned:{earned}</h1>:(
    <>
        <div className="top">
          <div className="timer">
            <Timer
              setStop={setStop}
              questionNumber={questionNumber}

            />
          </div>
        </div>
        <div className="bottom">
          <Trivia 
            data={data} 
            setStop={setStop}
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
          />
        </div>
        </>
        )}
      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((m)=>[
            <li className={questionNumber===m.id?"moneyListItem active":"moneyListItem"}>
            <span className="moneyListItemNumber">{m.id}</span>
            <span className="moneyListItemAmount">{m.amount}</span>
          </li>
          ])}
          
        </ul>
      </div>
    </div>
  );
}

export default App;
