import Instruction from './tasks/instruction'
import Instruction2 from './tasks/instruction_2';
import {useEffect, useState, useRef, FunctionComponent } from 'react'
import Task from './tasks/task'
/*import SVG3_new from './tasks/svg/task_A3_2.svg';
import SVG4_new from './tasks/svg/task_A4_3.svg';
import SVG1_old from './tasks/svg/task_1_old.svg';
import SVG2_old from './tasks/svg/task_2_old.svg';
import SVG3_old from './tasks/svg/task_3_old.svg';
import SVG4_old from './tasks/svg/task_4_old.svg';*/
import { useCheckboxContext } from '../context/checkboxcontext';
import Experience from './tasks/experience';
import { useLikertProgressContext } from '../context/likertProgressContext'; 
import React from 'react';

type Data = {
  task: string;
  coordinates: any;
  likert: { [key: number]: number };
  email?: string;
  feedback?: string;
};

type TaskType = {
  SVG: FunctionComponent<React.SVGProps<SVGSVGElement>>;
  SVGBlurred: FunctionComponent<React.SVGProps<SVGSVGElement>>;
  instruction: 'increase' | 'decrease';
  cell: string;
  target: string;
  button_type: 'new' | 'old';
};

export default function Home() {

  const [isMobile, setIsMobile] = useState(false);
  const [instructionProgress, setInstructionProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const [responsData, setResponseData] = useState({})
  const [taskComplete, setTaskComplete] = useState(false)
  const { likertAnswers} = useCheckboxContext();
  const {likertProgress, feedback, email } = useLikertProgressContext()
  const svgRefs : any = useRef({});
  const [svgsLoaded, setSvgsLoaded] = useState(false);

  useEffect(() => {
    const loadSVGs = async () => {
      const SVG1_new = await import('./tasks/svg/task_A1_0.svg');
      const SVG2_new = await import('./tasks/svg/task_A2_1.svg');
      const SVGBlurred3 = await import('./tasks/svg/task_3_blur.svg');
      svgRefs.current = {
        SVG1_new: SVG1_new.default,
        SVG2_new: SVG2_new.default,
        SVGBlurred3: SVGBlurred3.default
      };
  
      setSvgsLoaded(true);  
    };
  
    loadSVGs();
  }, []);
  

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const tasks : TaskType[] =  svgsLoaded ? [
    {
      SVG: svgRefs.current.SVG1_new,
      SVGBlurred: svgRefs.current.SVGBlurred3,
      instruction: 'increase',
      cell: 'A1',
      target:'A2',
      button_type: 'new'
    },
    {
      SVG: svgRefs.current.SVG2_new,
      SVGBlurred: svgRefs.current.SVGBlurred3,
      instruction: 'increase',
      cell: 'A2',
      target:'A3',
      button_type: 'new'
    }
  ] : [];

  const handleTaskComplete = () => {
    setTimeout(() => {
      setCurrentTask((prevTask) => prevTask + 1);
    }, 1000);  
  }

  useEffect(() => {
    if(taskComplete) {
      let data : Data = {
        task: "Task description",
        coordinates: responsData,
        likert: likertAnswers
      };
      
      if (email) {
        data.email = email;
      }
       
      if (feedback) { 
        data.feedback = feedback;
      }
      let options = {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body: JSON.stringify(data)
      }
      console.log(options)
      if (taskComplete && likertProgress === 5) {
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
  }, [responsData, taskComplete, feedback, email, likertProgress]);

    if(isMobile) {
    return (
      <h1 style={{margin:'100px auto auto auto', textAlign:'center'}}>
        You can complete the experiment only on desktop.
      </h1>
    );
  }

  if (!svgsLoaded) {
    return <div>Loading...</div>;  
  }
  

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
    <div>
    {
      instructionProgress < 4 ? 
        <Instruction progress={instructionProgress} setProgress={setInstructionProgress} />
      : instructionProgress == 4 && currentTask < tasks.length ? 
        <Task {...tasks[currentTask]} currentTask={currentTask} setResponse={setResponseData} response={responsData}
         onComplete={handleTaskComplete} setTaskComplete={setTaskComplete}/>
      : taskComplete && instructionProgress == 4 ? 
        <Instruction2 progress={instructionProgress} setProgress={setInstructionProgress}/>
      : instructionProgress == 5 ? 
        <Experience/>
      : null
    }
  </div>
  </React.Suspense>  
  )
}

