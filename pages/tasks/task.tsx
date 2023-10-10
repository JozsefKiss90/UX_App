import { useEffect, useState } from 'react'
import styles from '../../styles/FirstTask.module.scss'
import SVG1_new from '../tasks/svg/task_A1_0.svg';
import SVG2_new from '../tasks/svg/task_A2_1.svg';
import SVG3_new from '../tasks/svg/task_A3_2.svg';
import SVG4_new from '../tasks/svg/task_A4_3.svg';
import SVG1_old from '../tasks/svg/task_1_old.svg';
import SVG2_old from '../tasks/svg/task_2_old.svg';
import SVG3_old from '../tasks/svg/task_3_old.svg';
import SVG4_old from '../tasks/svg/task_4_old.svg';
import SVGBlurred3 from '../tasks/svg/blurred_no_select_2.svg'; 
import {tasksData} from '../../data/data'

type tasksData = {
  taskId: number;
  instruction: 'increase' | 'decrease';
  cell: string; 
  target: string;
  button_type: 'new' | 'old';
};


const Task = (props:any) => {
  const { onComplete, designState, setResponse, currentTask, setTaskComplete } = props
  
  const [blur, setBlur] = useState(true)
  const [progress, setProgress] = useState(0)
  const [targetFound, setTargetFound] = useState(false)
  const [startTime, setStartTime] = useState(0) 
  const [showFeedback, setShowFeedback] = useState(false)
  const [foundTargets, setFoundTargets] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [circleX, setCircleX] = useState(0);
  const [circleY, setCircleY] = useState(0);

  const tasks = [
    designState?.variant === 'A' ? SVG1_old : SVG1_new, SVG3_new, SVG4_new, SVG3_old,
    designState?.variant === 'A' ? SVG1_new : SVG1_old, SVG2_old, SVG4_old, SVG3_new,
    SVG2_old, SVG2_new, SVG3_old, SVG2_new
];

  const SVGBlurred = SVGBlurred3
  const CurrentSvg : any= tasks[currentTask]

  const tasksData : tasksData[]= [
    {
      taskId: 1,
      instruction: 'increase',
      cell: 'A1',
      target:'A2',
      button_type: designState?.variant === 'A' ? 'old' : 'new'
    },
    {
      taskId: 2,
      instruction: 'decrease',
      cell: 'A3',
      target:'A2',
      button_type: 'new'
    },
    {
      taskId: 3,
      instruction: 'decrease',
      cell: 'A4',
      target:'A3',
      button_type: 'new'
    },
    {
      taskId: 4,
      instruction: 'increase',
      cell: 'A3',
      target:'A4',
      button_type: 'old'
    },
    {
      taskId: 5,
      instruction: 'increase',
      cell: 'A1',
      target:'A2',
      button_type: designState?.variant === 'A' ? 'new' : 'old'
    },
    {
      taskId: 6,
      instruction: 'increase',
      cell: 'A2',
      target:'A3',
      button_type: 'old'
    },
    {
      taskId: 7,
      instruction: 'decrease',
      cell: 'A4',
      target:'A3',
      button_type: 'old'
    },
    {
      taskId: 8,
      instruction: 'increase',
      cell: 'A3',
      target:'A4',
      button_type: 'new'
    },
    {
      taskId: 9,
      instruction: 'decrease',
      cell: 'A2',
      target:'A1',
      button_type: 'old'
    },
    {
      taskId: 10,
      instruction: 'increase',
      cell: 'A2',
      target:'A3',
      button_type: 'new' 
    },
    {
      taskId: 11,
      instruction: 'decrease',
      cell: 'A3',
      target:'A2',
      button_type: 'old'
    },
    {
      taskId: 12,
      instruction: 'decrease',
      cell: 'A2',
      target:'A1',
      button_type: 'new'
    }
];

    useEffect(() => {
      const interactiveRects = document.querySelectorAll('[data-interactive="true"]')
      if(!blur) {
        interactiveRects.forEach(rect => {
          rect.setAttribute('style', 'cursor: pointer')
          rect.addEventListener('mousedown', handleTarget)
        })
      }
      setButtonDisabled(false)
      return () => {
        interactiveRects.forEach(rect => {
          rect.removeEventListener('mousedown', handleBlur)
          rect.removeEventListener('mousedown', handleTarget)
        })
      }
    }, [blur])

    useEffect(() => {
        setBlur(true)
        setProgress(0)
        setTargetFound(false)
        setShowFeedback(false)
      }, [tasks[currentTask]])

    useEffect(() => {
      let timeoutId:  NodeJS.Timeout | undefined
      if (targetFound) {
        timeoutId = setTimeout(() => {
          setShowFeedback(true)
        }, 1000)
      }

      return () => clearTimeout(timeoutId)
    }, [targetFound])

    const handleBlur = () => {
      setBlur(!blur)
    }
   
    const handleProgress = () => {
      setProgress(progress + 1)
      if(progress == 1) { 
        setButtonDisabled(true);
        setStartTime(Date.now()) 
      }
    }
 
    const handleTarget = (e:any) => {
      const svgElement = document.querySelector('svg') as SVGSVGElement | null;
      const interactiveRects = document.querySelectorAll('[data-interactive="true"]')
        interactiveRects.forEach(rect => {
          rect.removeEventListener('mousedown', handleBlur);
          rect.removeEventListener('mousedown', handleTarget);          
        })
    
        if (svgElement) {
          let pt = svgElement.createSVGPoint()
          pt.x = e.clientX 
          pt.y = e.clientY
          let svgP = pt.matrixTransform(svgElement.getScreenCTM()?.inverse());
          const elapsed = Date.now() - startTime 
          setTargetFound(true)
          setResponse((prevResponse : any) => ({ 
            ...prevResponse,
            [currentTask]: {
              taskId: tasksData[currentTask].taskId,
              cx: svgP.x,
              cy: svgP.y,
              response_time: elapsed,
              instruction: tasksData[currentTask].instruction,
              button_type: tasksData[currentTask].button_type
            },
          }))
          setCircleX(svgP.x);
          setCircleY(svgP.y);
        }
        console.log(foundTargets)
        setFoundTargets(foundTargets + 1)
          if(foundTargets == 11) {
            setTaskComplete(true)
          }
        setTimeout(() => {
          if (onComplete) {
            onComplete()
          }
        }, 1000) 
      }
      

  return (
    <>
    <div className={styles.instruction}>
      <h1  style={{fontWeight:'normal', fontSize:'1.6rem', position:'relative', top:'10px', color: 'rgb(90, 90, 90)'}}>
        Task {`${currentTask + 1}`} / 12
      </h1>
      <div className={styles.instructionWrapper}>
      {progress == 0 ?
        <h1 style={{color:'black', fontWeight:'bold'}}>
            &nbsp;
        </h1> 
        :
        <h1 style={{color:'black'}}>
          Make <span style={{fontWeight:'bold'}}>{`${tasksData[currentTask]?.cell}`}  (selected) </span>
          similar to <span style={{fontWeight:'bold'}}>{`${tasksData[currentTask]?.target}`}</span> with one click  
        </h1>
      }
      </div>     
    </div>   
    <div className={styles.svgButtonContainer}>
        <div className={styles.svgWrapper}>
        {showFeedback ?    
          <>   
            <CurrentSvg/> 
            <svg className={styles.overlaySvg} width="1185" height="433" viewBox="0 0 1185 433" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx={circleX + 1} cy={circleY} r="16.5" fill="#F20000" fill-opacity="0.21" stroke="#9F0909"/>
              <circle cx={circleX + 1} cy={circleY} r="10.5" fill="#F20000" fill-opacity="0.21" stroke="#9F0909"/>
              <circle cx={circleX + 1} cy={circleY} r="4.5" fill="#F20000" fill-opacity="0.21" stroke="#9F0909"/>
            </svg>
          </> 
        : blur ? <SVGBlurred /> : <CurrentSvg />
        } 
        {progress == 0 && 
            <button className={styles.topButton} onClick={handleProgress}>
                Proceed
            </button>
        }
         {
        progress == 1 ? <button disabled={buttonDisabled} className={styles.revealButton} onClick={() => {
          handleBlur(); handleProgress()
        }}> 
          Reveal
        </button> : ''}
        {  
        progress == 2 ? <button disabled={buttonDisabled} className={styles.revealButtonHidden} onClick={() => {
          handleBlur(); handleProgress()
        }}>  
          Reveal
        </button> : ''}
        </div>
      </div>
    </>
  )
}

export default Task

async function toggleTaskState() {
  let options = {
    method :'POST',
    headers : {'Content-type' :'application/json'},
    body : null,
  }
  try {
    let response = await fetch('/api/task_state', options);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
 
export async function getServerSideProps({ req } : any){

  let designState = await toggleTaskState();
  return {
    props: { designState }
  }
} 