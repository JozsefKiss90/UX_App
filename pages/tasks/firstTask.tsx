import { useEffect, useState } from 'react';
import Image from "next/image";
import MySvg from './task_1.svg';
import MySvgFeedback from './task_1_feedback.svg';
import MySvgBlurred from './task_1_blur.svg';
import styles from '../../styles/FirstTask.module.scss'
import MouseTracker from '../../components/mouseTracker'
 
const FirstTask = (props : any) => {

  const [blur, setBlur] = useState(true);
  const [progress, setProgress] = useState(0);
  const [targetFound, setTargetFound] = useState(false);
  const [startTime, setStartTime] = useState(0); 
  const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
      const interactiveRects = document.querySelectorAll('[data-interactive="true"]');
      interactiveRects.forEach(rect => {
        rect.setAttribute('style', 'cursor: pointer;');
        rect.addEventListener('click', handleTarget)
      })

      const svgElement = document.querySelector('svg');
      if (svgElement) {
          svgElement.addEventListener('mousemove', (e) => {
            let pt = svgElement.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            let svgP = pt.matrixTransform(svgElement.getScreenCTM().inverse());
            //console.log(svgP.x, svgP.y);
          });
      }

      return () => {
        interactiveRects.forEach(rect => {
          rect.removeEventListener('click', handleBlur);
          rect.removeEventListener('click', handleTarget);
        });
      };
    }, [blur,targetFound]);

    useEffect(() => {
      let timeoutId:  NodeJS.Timeout | undefined;
      if (targetFound) {
        timeoutId = setTimeout(() => {
          setShowFeedback(true);
        }, 1000);
      }

      return () => clearTimeout(timeoutId);
    }, [targetFound]);
    

    const handleBlur = () => {
      setBlur(!blur);
    };

    const handleProgress = () => {
      setProgress(progress + 1);
      if(progress == 1) { 
        setStartTime(Date.now());
      }
    };

    const handleTarget = (e: any) => {
      console.log('Element found:', e.target);
      console.log('Target coordinates:', e.clientX, e.clientY);  
      const elapsed = Date.now() - startTime;
      console.log('Time to find the target:', elapsed);
      setTargetFound(true);
      setTimeout(() => {
        if (props.onComplete) {
          props.onComplete();
        }
      }, 1000); 
    };

    return (
      <div className={styles.svgContainer}>
        <MouseTracker/>
        {showFeedback ? <MySvgFeedback /> : blur ? <MySvgBlurred /> : <MySvg />}
        {progress == 0 ? <button className={styles.centeredButton} onClick={() => {
          handleProgress();
        }}>
          Understood
        </button> : 
        progress == 1 ? <button className={styles.centeredButton} onClick={() => {
          handleBlur(); handleProgress();
        }}>
          Reveal
        </button> : ''}
      </div>
    );
  };

export default FirstTask;
