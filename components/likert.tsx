// components/Frame54.js
import Checkbox from './checkbox';
import classes from './Frame54.module.css';
import resets from './_resets.module.css';
import { useEffect, useState, useRef } from 'react';
import { useCheckboxContext } from '../context/checkboxcontext';
import Feedback from '../pages/tasks/feedback';
import { useLikertProgressContext } from '../context/likertProgressContext';
import { useRouter } from 'next/router';
import zIndex from '@mui/material/styles/zIndex';

type LikertTextType = {
  [key: number]: {
    question: string;
    ranking: (string | JSX.Element)[];
  };
};

interface LikertProps {
  likertText: LikertTextType;
}

function Likert({likertText}: LikertProps) {

  const router = useRouter();
    
  const checkboxClasses = [
    classes.lickert5,
    classes.lickert4,
    classes.lickert3, 
    classes.lickert2,
    classes.lickert1,
  ];

  const { checkboxStates, handleCheckboxChange } = useCheckboxContext();
  const {likertProgress, setLikertProgress} = useLikertProgressContext();
  const [enableButton, setEnableButton] = useState(false)
  const [likertAnswers, setLikertAnswers] = useState({});

  console.log('CHECKBOX STATES: ' + checkboxStates);


  useEffect(() => {
    if (likertProgress === 5) {
      router.push('/tasks/thankyou'); // Navigate to the Thankyou page
    }
  }, [likertProgress]);

  useEffect(() => {
   if(checkboxStates[likertProgress]) {
    if (checkboxStates[likertProgress].some(checkbox => checkbox)) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
   }
   if(likertProgress == 4) {
    setEnableButton(true)
   }
  }, [checkboxStates, likertProgress]);
  
  useEffect(() => {
    let trueIndex : number;
    if (checkboxStates[likertProgress]) {
      trueIndex = checkboxStates[likertProgress].findIndex(answer => answer === true);
      setLikertAnswers(prevState => ({
        ...prevState,
        [likertProgress]: trueIndex !== -1 ? trueIndex + 1 : undefined,
      }));
    }
  }, [checkboxStates, likertProgress]);
  

  const handleLikertProgress = () => {
    if (enableButton) {
      setLikertProgress(likertProgress + 1);
      setEnableButton(false);
      console.log(checkboxStates);
    }
  };

  const handleBackProgress = () => {
    setLikertProgress(likertProgress - 1);
  };
  const numberClasses = [
    classes._1,
    classes._2,
    classes._3,
    classes._4,
    classes._5,
  ];

  return (
    <>
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      {likertProgress < 4 ? 
      <div>
        <div className={classes.pleaseIndicateYourLevelOfExper}>
          {likertText[likertProgress].question}
        </div>
        <button className={enableButton ? classes.buttonEnabled : classes.buttonDisabled} onClick={()=>{handleLikertProgress()}}>
          <div className={enableButton ? classes.nextEnabled : classes.nextDisabled}>Next&gt;</div>
        </button>
        {likertProgress > 0 ? 
          <button className={classes.backButtonEnabled} onClick={()=>{handleBackProgress()}}>
            <div  className={classes.backButton}>&lt;Back</div>
        </button>
        : ""
      }
      {/* 
      <div className={likertProgress === 3 ? classes.neverUsed_2 : classes.neverUsed}>
        <div className={likertProgress === 2 ?  classes.textBlock_2 : classes.textBlock}>{likertText[likertProgress].ranking[0]}</div>
        {likertProgress === 2 ? 
        <div style={{ position: "relative", right : "0" }}>
          (=SUM(), A1+B1)
        </div> : ""}
      </div>
      <div className={likertProgress === 2 ?  classes.iUseItAlmostEveryDay_2 : likertProgress === 3 ?  classes.iUseItAlmostEveryDay_2 : classes.iUseItAlmostEveryDay}>
        <div className={classes.textBlock}>{likertText[likertProgress].ranking[1]}</div>
        {likertProgress === 2 ? 
        <div style={{ position: "relative", left : "10px", top:'3px', zIndex:"5" }}>
          (macros, VBA)
        </div> : ""}
      </div>
 */
      }
      <div className={classes.download2}></div>
      <div className={classes.frame58} style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{display:'flex', flexDirection:"column", justifyContent:'center'}}>
          <div style={{display:'flex', textAlign:'center', flexDirection:'column',  fontSize:'1.2rem',
           alignSelf:"center", position:'relative', marginRight:'10px', bottom: likertProgress === 2 ? '0' : '6px'}}>{likertText[likertProgress].ranking[0]}
            {likertProgress === 2 ? 
            <div style={{color:"rgb(92, 92, 92)"}}>
              (=SUM(), A1+B1)
            </div> : ""}
          
          </div>
          </div>
        {checkboxClasses.map((checkboxClass, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <div style={{display:'flex', flexDirection:"column", justifyItems:'center', alignItems:"center"}}>
              <Checkbox 
                className={classes.commonCheckbox}
                isChecked={checkboxStates[likertProgress][index]}
                onChange={() => handleCheckboxChange(likertProgress, index)}
              />
              <div style={{position:"relative", right:"10px"}} className={`${checkboxStates[likertProgress][index] ? classes.bold : ''}`}>
                {index + 1}
              </div>
           </div>
          </div>
        ))}
        <div style={{display:'flex', flexDirection:"column", justifyContent:'center'}}>
          <div style={{display:'flex', textAlign:'center', flexDirection:'column', fontSize:'1.2rem',
           alignSelf:"center", position:'relative', marginRight:'10px', bottom: likertProgress === 2 ? '0' : '6px'}}>
            {likertText[likertProgress].ranking[1]}
            {likertProgress === 2 ? 
              <div style={{color:"rgb(92, 92, 92)"}}>
                (macros, VBA)
              </div> : ""}
            </div>
        </div>
      </div>
      </div>
      : likertProgress === 4 ? (
        <>
          <Feedback/>
          <button className={enableButton ? classes.buttonEnabled : classes.buttonDisabled} onClick={()=>{handleLikertProgress()}}>
            <div className={enableButton ? classes.nextEnabled : classes.nextDisabled}>Next</div>
          </button>
          {likertProgress > 0 && (
            <button className={classes.backButtonEnabled} onClick={handleBackProgress}>
              <div className={classes.backButton}>&lt;Back</div>
            </button>
          )}
        </>
      )  : null
      }
  </div>
    </>
  )
}

export default Likert;
