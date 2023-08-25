import { useEffect, useState } from 'react'
import styles from '../../styles/FirstTask.module.scss'
import MouseTracker from '../../components/mouseTracker'

const Task = (props:any) => {
  const { onComplete, SVG, cell, target, instruction, button_type, SVGBlurred, setResponse, currentTask, setTaskComplete } = props
  
  const [blur, setBlur] = useState(true)
  const [progress, setProgress] = useState(0)
  const [targetFound, setTargetFound] = useState(false)
  const [startTime, setStartTime] = useState(0) 
  const [showFeedback, setShowFeedback] = useState(false)
  const [foundTargets, setFoundTargets] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [circleX, setCircleX] = useState(0);
  const [circleY, setCircleY] = useState(0);
 

    useEffect(() => {
      const interactiveRects = document.querySelectorAll('[data-interactive="true"]')
      if(!blur) {
        interactiveRects.forEach(rect => {
          rect.setAttribute('style', 'cursor: pointer')
          rect.addEventListener('click', handleTarget)
        })
      }
      setButtonDisabled(false)
      return () => {
        interactiveRects.forEach(rect => {
          rect.removeEventListener('click', handleBlur)
          rect.removeEventListener('click', handleTarget)
        })
      }
    }, [blur])

    useEffect(() => {
        setBlur(true)
        setProgress(0)
        setTargetFound(false)
        setShowFeedback(false)
      }, [SVG])

    useEffect(() => {
      let timeoutId:  NodeJS.Timeout | undefined
      if (targetFound) {
        timeoutId = setTimeout(() => {
          setShowFeedback(true)
        }, 1000)
      }

      return () => clearTimeout(timeoutId)
    }, [targetFound])

    const handleBlur = (e) => {
      setBlur(!blur)
    }

    const handleProgress = (e) => {
      setProgress(progress + 1)
      if(progress == 1) { 
        setButtonDisabled(true);
        setStartTime(Date.now()) 
      }
    }
 
    const handleTarget = (e) => {
        const svgElement = document.querySelector('svg')
        const interactiveRects = document.querySelectorAll('[data-interactive="true"]')
        interactiveRects.forEach(rect => {
          rect.removeEventListener('onmousedown', handleBlur)
          rect.removeEventListener('onmousedown', handleTarget)
        })
    
        if (svgElement) {
          let pt = svgElement.createSVGPoint()
          pt.x = e.clientX 
          pt.y = e.clientY
          let svgP = pt.matrixTransform(svgElement.getScreenCTM().inverse())
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
          handleProgress(e)
        }}>
          Understood
        </button> : 
        ''}
     </div>
    </div>  
    <div className={styles.svgContainer}>
      {showFeedback ? 
        <>
          <SVG/>
          <svg className={styles.overlaySvg} width="1185" height="433" viewBox="0 0 1185 433" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink">
            <circle cx={circleX + 1} cy={circleY} r="16.5" fill="#F20000" fill-opacity="0.21" stroke="#9F0909"/>
            <circle cx={circleX + 1} cy={circleY} r="10.5" fill="#F20000" fill-opacity="0.21" stroke="#9F0909"/>
            <circle cx={circleX + 1} cy={circleY} r="4.5" fill="#F20000" fill-opacity="0.21" stroke="#9F0909"/>
          </svg>
        </>
      : blur ? <SVGBlurred /> : <SVG />}
      {
      progress == 1 ? <button disabled={buttonDisabled} className={styles.revealButton} onClick={(e) => {
        handleBlur(e); handleProgress(e)
      }}>
        Reveal
      </button> : ''}
    </div>
    </>
  )
}

export default Task
