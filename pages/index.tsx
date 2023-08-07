import Instruction from './tasks/instruction'
import { useEffect, useState } from 'react'
import Task from './tasks/task'
import SVG1 from './tasks/svg/task_1.svg';
import SVGFeedback1 from './tasks/svg/task_1_feedback.svg';
import SVGBlurred1 from './tasks/svg/task_1_blur.svg';
import SVG2 from './tasks/svg/task_2.svg';
import SVGFeedback2 from './tasks/svg/task_2_feedback.svg';
import SVGBlurred2 from './tasks/svg/task_2_blur.svg';

export default function Home() {

  const [instructionProgress, setInstructionProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const [responsData, setResponseData] = useState({})
  const [taskComplete, setTaskComplete] = useState(false)
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

  const handleTaskComplete = () => {
    setTimeout(() => {
      setCurrentTask((prevTask) => prevTask + 1);
    }, 1000);  
  }

  useEffect(() => {
    console.log('RESPONSE: '+JSON.stringify(responsData));
    console.log(taskComplete)
    if(taskComplete) {
      let data =  {
        task: "Task description",
        coordinates: responsData,
        email: "example@example.com"
      }
      let options = {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body: JSON.stringify(data)
      }
      console.log(options)
      if (taskComplete) {
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
}, [responsData, taskComplete]);
  
  return (
    <div>
    <Instruction progress={instructionProgress} setProgress={setInstructionProgress} />
    {instructionProgress > 3 && currentTask < tasks.length ? 
      <Task {...tasks[currentTask]} currentTask={currentTask}
       setResponse={setResponseData} response={responsData} onComplete={handleTaskComplete} setTaskComplete={setTaskComplete}/>
    : null}
  </div>
  )
}

