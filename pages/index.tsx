import Instruction from './tasks/instruction'
import Instruction2 from './tasks/instruction_2';
import { useEffect, useState } from 'react'
import Task from './tasks/task'
import SVG1 from './tasks/svg/task_1.svg';
import SVGFeedback1 from './tasks/svg/task_1_feedback.svg';
import SVGBlurred1 from './tasks/svg/task_1_blur.svg';
import SVG2 from './tasks/svg/task_2.svg';
import SVGFeedback2 from './tasks/svg/task_2_feedback.svg';
import SVGBlurred2 from './tasks/svg/task_2_blur.svg';
import { useCheckboxContext } from '../context/checkboxcontext';
import Experience from './tasks/experience';

export default function Home() {

  const [instructionProgress, setInstructionProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const [responsData, setResponseData] = useState({})
  const [taskComplete, setTaskComplete] = useState(false)
  const { likertAnswers, setLikertAnswers } = useCheckboxContext();
  console.log(instructionProgress)
  const tasks = [
    {
      SVG: SVG1,
      SVGBlurred: SVGBlurred1,
      SVGFeedback: SVGFeedback1,
    },
    {
      SVG: SVG2,
      SVGBlurred: SVGBlurred2,
      SVGFeedback: SVGFeedback2,
    },
    {
      SVG: SVG1,
      SVGBlurred: SVGBlurred1,
      SVGFeedback: SVGFeedback1,
    },
    {
      SVG: SVG2,
      SVGBlurred: SVGBlurred2,
      SVGFeedback: SVGFeedback2,
    }
  ];
  console.log(taskComplete)
  const handleTaskComplete = () => {
    setTimeout(() => {
      setCurrentTask((prevTask) => prevTask + 1);
    }, 1000);  
  }
  console.log(likertAnswers)
  useEffect(() => {
    console.log('RESPONSE: '+JSON.stringify(responsData));
    console.log(taskComplete)
    if(taskComplete) {
      let data =  {
        task: "Task description",
        coordinates: responsData,
        email: "example@example.com",
        likert: likertAnswers
      }
      let options = {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body: JSON.stringify(data)
      }
      console.log(options)
      if (taskComplete && Object.keys(likertAnswers).length === 3) {
        fetch('/api/user_data', options)
          .then(res => {
            console.log(res.status)
            return res.json()
          })
          .then(data => {
            console.log(data)
          })
          .catch(err => {
            console.log(err)
          });
      }
      
    }
}, [responsData, taskComplete, likertAnswers]);
  
  return (
    <div>
    {
      instructionProgress < 4 ? 
        <Instruction progress={instructionProgress} setProgress={setInstructionProgress} />
      : instructionProgress == 4 && currentTask < tasks.length ? 
        <Task {...tasks[currentTask]} currentTask={currentTask} setResponse={setResponseData} response={responsData} onComplete={handleTaskComplete} setTaskComplete={setTaskComplete}/>
      : taskComplete && instructionProgress == 4 ? 
        <Instruction2 progress={instructionProgress} setProgress={setInstructionProgress}/>
      : instructionProgress == 5 ? 
        <Experience/>
      : null
    }
  </div>
  )
}

