import { useEffect, useState } from 'react';
import Image from "next/image";
import MySvg from './task_2.svg';
import MySvgFeedback from './task_2_feedback.svg';
import MySvgBlurred from './task_2_blur.svg';
import styles from '../../styles/FirstTask.module.scss'
import MouseTracker from '../../components/mouseTracker'

const ThirdTask = (props : any) => {

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
      console.log('Element found:', e.target);
      console.log('Target coordinates:', e.clientX, e.clientY);  // Log the coordinates
      const elapsed = Date.now() - startTime; // Calculate the elapsed time
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

export default ThirdTask;
