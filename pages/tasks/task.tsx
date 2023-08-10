import { useEffect, useState } from 'react'
import styles from '../../styles/FirstTask.module.scss'
import MouseTracker from '../../components/mouseTracker'

const Task = (props:any) => {
  const { onComplete, SVG, SVGBlurred, SVGFeedback, setResponse, currentTask, setTaskComplete } = props
  
  const [blur, setBlur] = useState(true)
  const [progress, setProgress] = useState(0)
  const [targetFound, setTargetFound] = useState(false)
  const [startTime, setStartTime] = useState(0) 
  const [showFeedback, setShowFeedback] = useState(false)
  const [foundTargets, setFoundTargets] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(false);

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
          rect.removeEventListener('click', handleBlur)
          rect.removeEventListener('click', handleTarget)
        })
        //console.log('Element found:', e.target)
       // console.log('Found targets:', foundTargets)
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
              response_time: elapsed
            },
          }))
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
    <div className={styles.svgContainer}>
      {showFeedback ? <SVGFeedback /> : blur ? <SVGBlurred /> : <SVG />}
      {progress == 0 ? <button className={styles.centeredButton} onClick={(e) => {
        handleProgress(e)
      }}>
        Understood
      </button> : 
      progress == 1 ? <button disabled={buttonDisabled} className={styles.centeredButton} onClick={(e) => {
        handleBlur(e); handleProgress(e)
      }}>
        Reveal
      </button> : ''}
    </div>
  )
}

export default Task
