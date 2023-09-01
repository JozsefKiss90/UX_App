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
import SVGBlurred3 from '../tasks/svg/task_3_blur.svg'; 

const Task = (props:any) => {
  const { onComplete, cell, target, instruction, button_type, setResponse, currentTask, setTaskComplete } = props
  
  const [blur, setBlur] = useState(true)
  const [progress, setProgress] = useState(0)
  const [targetFound, setTargetFound] = useState(false)
  const [startTime, setStartTime] = useState(0) 
  const [showFeedback, setShowFeedback] = useState(false)
  const [foundTargets, setFoundTargets] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [circleX, setCircleX] = useState(0);
  const [circleY, setCircleY] = useState(0);
  const tasks = [SVG1_new, SVG2_new, SVG3_new, SVG4_new, SVG1_old, SVG2_old, SVG3_old, SVG4_old]
  const SVGBlurred = SVGBlurred3
    const CurrentSvg : any= tasks[currentTask]

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
              cx: svgP.x,
              cy: svgP.y,
              response_time: elapsed,
              instruction: instruction,
              button_type: button_type
            },
          }))
          setCircleX(svgP.x);
          setCircleY(svgP.y);
        }
        setFoundTargets(foundTargets + 1)
          if(foundTargets == 3) {
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
        Task {`${currentTask + 1}`}
      </h1>
     <div style={{display:'flex', flexDirection:"row", alignItems:'center'}}>
        <h1>
        Make {`${cell}`} (selected) similar to {`${target}`} with one click  
        </h1>
        {progress == 0 ? <button className={styles.topButton} style={{}} onClick={(e) => {
          handleProgress()
        }}>
          Understood
        </button> : 
        ''}
     </div>
    </div>  
    <div className={styles.svgContainer}>
      {showFeedback ? 
        <>
          <CurrentSvg/>
          <svg className={styles.overlaySvg} width="1185" height="433" viewBox="0 0 1185 433" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx={circleX + 1} cy={circleY} r="16.5" fill="#F20000" fill-opacity="0.21" stroke="#9F0909"/>
            <circle cx={circleX + 1} cy={circleY} r="10.5" fill="#F20000" fill-opacity="0.21" stroke="#9F0909"/>
            <circle cx={circleX + 1} cy={circleY} r="4.5" fill="#F20000" fill-opacity="0.21" stroke="#9F0909"/>
          </svg>
        </>
      : blur ? <SVGBlurred /> : <CurrentSvg />}
      {
      progress == 1 ? <button disabled={buttonDisabled} className={styles.revealButton} onClick={(e) => {
        handleBlur(); handleProgress()
      }}>
        Reveal
      </button> : ''}
    </div>
    </>
  )
}

export default Task
