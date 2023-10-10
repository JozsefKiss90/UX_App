import styles from '../../styles/FirstTask.module.scss'
import Practice from './svg/practice.svg'
import Practice_2 from './svg/practice_2.svg'
import PracticeBlur from './svg/practice_blur.svg'
import Practice_3 from './svg/practice_3.svg'
import { useEffect, useState } from 'react'

const Instruction = ({ progress, setProgress } : any) => {

  const handleProgress = () => {
    setProgress(progress + 1);
  };
  
  const [showFeedbackPractice, setShowFeedbackPractice] = useState(false);
  const [circleXPractice, setCircleXPractice] = useState(0); 
  const [circleYPractice, setCircleYPractice] = useState(0); 

  const handlePracticeClick = (e:any) => {
   
    setShowFeedbackPractice(true);
    const svgElement = document.querySelector('svg') as SVGSVGElement | null;
    if (svgElement) {
      let pt = svgElement.createSVGPoint()
      pt.x = e.clientX 
      pt.y = e.clientY
      let svgP = pt.matrixTransform(svgElement.getScreenCTM()?.inverse());
      setCircleXPractice(svgP.x);
      setCircleYPractice(svgP.y);
    }
    setTimeout(() => {
      setShowFeedbackPractice(false);
      handleProgress();
    }, 2000);
  };

  return (
    <div>
      {progress == 0 ?
        <div className={styles.instuctionBox}>
          <h2>
            This is a super-short experiment, which takes 2-3 minutes of your precious time.
          </h2>
          <button className={styles.centeredButton} onClick={(e) => {
            handleProgress();
          }}>
            Next
          </button>
        </div>
        : progress == 1 ? 
        <div className={styles.instuctionBox_2}>
          <h2>
            Our goal is to make Google Sheets better.
          </h2>
          <button className={styles.centeredButton} onClick={(e) => {
            handleProgress();
          }}>
            Next
          </button>
        </div>
        : progress == 2 ? 
        <div className={styles.instuctionBox_2}>
          <h2>
            We will simulate very basics tasks in Google Sheets.
          </h2>
          <button className={styles.centeredButton} onClick={(e) => {
            handleProgress();
          }}>
            Next
          </button>
        </div>
        : progress == 3 ? 
        <div className={styles.instuctionBox_2}>
          <h2>
            Your task will be to change a number in a selected row using Google Sheets buttons.
          </h2>
          <button className={styles.centeredButton_2} onClick={(e) => {
            handleProgress();
          }}>
            Practice
          </button>
        </div>
         : progress == 4 ? 
         <div className={styles.instuctionBox_2}>
           <button className={styles.revealButton} onClick={(e) => {
             handleProgress();
           }}>
             Next
           </button>
           <PracticeBlur/> 
         </div>
          : progress == 5 ? 
          <div className={styles.instuctionBox_2}>
            <button className={styles.revealButton} onClick={(e) => {
              handleProgress();
            }}>
              Reveal
            </button>
            <Practice_2/> 
          </div>
        : progress == 6 ? 
        <div className={styles.instuctionBox_2}>
            <button className={styles.pacticeButton_2} onClick={(e) => {
              handleProgress();
            }}>
              Next
            </button>
            <Practice/> 
          </div>
        : 
        progress === 7 ? (
        <div style={{position: 'relative', cursor: 'pointer'}}>
            <Practice_3 onClick={(e:any) => {
              handlePracticeClick(e);
            }} />
            {showFeedbackPractice && (
              <svg className={styles.overlaySvg} width="1405" height="720" viewBox="0 0 1405 720" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx={circleXPractice + 1} cy={circleYPractice} r="16.5" fill="#F20000" fill-opacity="0.21" stroke="#9F0909"/>
                <circle cx={circleXPractice + 1} cy={circleYPractice} r="10.5" fill="#F20000" fill-opacity="0.21" stroke="#9F0909"/>
                <circle cx={circleXPractice + 1} cy={circleYPractice} r="4.5" fill="#F20000" fill-opacity="0.21" stroke="#9F0909"/>
              </svg>
            )}
          </div>
        ) : progress === 8 ? (
          <div className={styles.instuctionBox_2}>
            <h2>Answer as fast as you can!</h2>
            <button className={styles.centeredButton} onClick={handleProgress}>
              Start
            </button>
          </div>
        ) : ""
      }
    </div>
  );
}; 

export default Instruction; 
