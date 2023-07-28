import Head from 'next/head'
import Image from 'next/image'
//import styles from '../styles/Home.module.scss'
import FirstTask from './tasks/firstTask'
import SecondTask from './tasks/secondTask'
import Instruction from './tasks/instruction'
import { useEffect, useState } from 'react'
import ThirdTask from './tasks/thirdTask'
import Task from './tasks/task'
import SVG1 from './tasks/task_1.svg';
import SVGFeedback1 from './tasks/task_1_feedback.svg';
import SVGBlurred1 from './tasks/task_1_blur.svg';
import SVG2 from './tasks/task_2.svg';
import SVGFeedback2 from './tasks/task_2_feedback.svg';
import SVGBlurred2 from './tasks/task_2_blur.svg';

export default function Home() {

  const [instructionProgress, setInstructionProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const [responsData, setResponseData] = useState({})

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
}, [responsData]);
  
  return (
    <div>
    <Instruction progress={instructionProgress} setProgress={setInstructionProgress} />
    {instructionProgress > 3 && currentTask < tasks.length ? 
      <Task {...tasks[currentTask]} currentTask={currentTask} setResponse={setResponseData} response={responsData} onComplete={handleTaskComplete} />
    : null}
  </div>
  )
}

