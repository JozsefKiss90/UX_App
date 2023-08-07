// components/Frame54.js
import Checkbox from './checkbox';
import classes from './Frame54.module.css';
import resets from './_resets.module.css';
import { useEffect, useState, useRef } from 'react';
import { useCheckboxContext } from '../context/checkboxcontext';

function Likert({likertProgress, setLikertProgress, likertText}) {
    
  const checkboxClasses = [
    classes.lickert5,
    classes.lickert4,
    classes.lickert3,
    classes.lickert2,
    classes.lickert1,
  ];

  const { checkboxStates, handleCheckboxChange } = useCheckboxContext();
  const [enableButton, setEnableButton] = useState(false)

  useEffect(() => {
    if (checkboxStates[likertProgress].some(checkbox => checkbox)) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
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
  <div className={`${resets.storybrainResets} ${classes.root}`}>
    <div className={classes.pleaseIndicateYourLevelOfExper}>
      {likertText[likertProgress].question}
    </div>
    <button className={enableButton ? classes.buttonEnabled : classes.buttonDisabled} onClick={()=>{handleLikertProgress(enableButton)}}>
      <div className={enableButton ? classes.nextEnabled : classes.nextDisabled}>Next</div>
    </button>
    {likertProgress > 0 ? 
       <button className={classes.backButtonEnabled} onClick={()=>{handleBackProgress()}}>
        <div  className={classes.backButton}>&lt; Back</div>
     </button>
     : ""
    }
    <div className={classes.neverUsed}>
      <div className={classes.textBlock}>{likertText[likertProgress].ranking[0]}</div>
      {likertProgress === 2 ? 
      <div style={{ position: "relative", left : "10px" }}>
        (=SUM(), A1+B1)
      </div> : ""}
    </div>
    <div className={classes.iUseItAlmostEveryDay}>
      <div className={classes.textBlock3}>{likertText[likertProgress].ranking[1]}</div>
      {likertProgress === 2 ? 
      <div style={{ position: "relative", right : "10px" }}>
        (macros, VBA)
      </div> : ""}
    </div>
    <div className={classes.download2}></div>
    <div className={classes.frame58}>
    {checkboxClasses.map((checkboxClass, index) => (
      <div key={index}>
        <Checkbox
          className={checkboxClass}
          isChecked={checkboxStates[likertProgress][index]}
          onChange={() => handleCheckboxChange(likertProgress, index)}
        />
        <div className={`${numberClasses[index]} ${checkboxStates[likertProgress][index] ? classes.bold : ''}`}>
          {index + 1}
        </div>
      </div>
    ))}
      </div>
  </div>
  )
}

export default Likert;
