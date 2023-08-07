// pages/experience.js
import Likert from '../../components/likert';
import { CheckboxProvider } from '../../components/likert';
import resets from '../../components/_resets.module.css';
import { useState } from 'react';

function Experience() {

  const [likertProgress, setLikertProgress] = useState(0)

  const likertText = {
      0 : {
        question : " Please indicate your level of experience with Microsoft Excel",
        ranking : ["Never used",  <>I use it almost <br /> every day</>]
      },
      1 : {
        question : "Please indicate your level of experience with Google Sheets",
        ranking : ["Never used",  <>I use it almost <br /> every day</>]
      },
      2 : {
        question : "On a scale of 1 to 5, please rate your proficiency level in spreadsheet apps.(eg.: or .)",
        ranking : ["Beginner", "Expert"]
      }
  }

  return (
    <div className={`${resets.storybrainResets}`}>
      <Likert likertProgress ={likertProgress} setLikertProgress = {setLikertProgress} likertText = {likertText}/>
    </div>
  );
}

export default Experience;
