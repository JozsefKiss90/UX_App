import { useEffect, useState } from 'react';
import styles from '../../styles/FirstTask.module.scss'
import MouseTracker from '../../components/mouseTracker'

const Task = (props:any) => {
  const { onComplete, SVG, SVGBlurred, SVGFeedback, response, setResponse, currentTask } = props;
  
  const [blur, setBlur] = useState(true);
  const [progress, setProgress] = useState(0);
  const [targetFound, setTargetFound] = useState(false);
  const [startTime, setStartTime] = useState(0); 
  const [showFeedback, setShowFeedback] = useState(false);
  const [coordinate_X, setCoordinate_X] = useState(0)
  const [coordinate_Y, setCoordinate_Y] = useState(0)  

    useEffect(() => {
      const interactiveRects = document.querySelectorAll('[data-interactive="true"]');
      interactiveRects.forEach(rect => {
        rect.setAttribute('style', 'cursor: pointer;');
        rect.addEventListener('click', handleTarget)
      })

      

      return () => {
        interactiveRects.forEach(rect => {
          rect.removeEventListener('click', handleBlur);
          rect.removeEventListener('click', handleTarget);
        });
      };
    }, [blur,targetFound]);

    useEffect(() => {
        setBlur(true);
        setProgress(0);
        setTargetFound(false);
        setShowFeedback(false);
      }, [SVG]);

    useEffect(() => {
      let timeoutId:  NodeJS.Timeout | undefined;
      if (targetFound) {
        timeoutId = setTimeout(() => {
          setShowFeedback(true);
        }, 1000);
      }

      return () => clearTimeout(timeoutId);
    }, [targetFound]);

    const handleBlur = (e) => {
      setBlur(!blur);
    };

    const handleProgress = (e) => {
      setProgress(progress + 1);
      if(progress == 1) { // The user clicked "Understood"
        setStartTime(Date.now()); // Record the current time
      }
    };

    const handleTarget = (e) => {
        const svgElement = document.querySelector('svg');
        
        console.log('Element found:', e.target);
        
        if (svgElement) {
          let pt = svgElement.createSVGPoint();
          pt.x = e.clientX;
          pt.y = e.clientY;
          let svgP = pt.matrixTransform(svgElement.getScreenCTM().inverse());
          console.log('Target coordinates:', svgP.x, svgP.y);  // Log the coordinates
        
          const elapsed = Date.now() - startTime; // Calculate the elapsed time
          console.log('Time to find the target:', elapsed);
          setTargetFound(true);
          setResponse((prevResponse : any) => ({
            ...prevResponse,
            [currentTask]: {
              cx: svgP.x,
              cy: svgP.y,
            },
          }));
        }
        
        setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
        }, 1000); 
      };
      

  return (
    <div className={styles.svgContainer}>
      <MouseTracker/>
      {showFeedback ? <SVGFeedback /> : blur ? <SVGBlurred /> : <SVG />}
      {progress == 0 ? <button className={styles.centeredButton} onClick={(e) => {
        handleProgress(e);
      }}>
        Understood
      </button> : 
      progress == 1 ? <button className={styles.centeredButton} onClick={(e) => {
        handleBlur(e); handleProgress(e);
      }}>
        Reveal
      </button> : ''}
    </div>
  );
};

export default Task;
