import styles from '../../styles/FirstTask.module.scss'
import Practice from './svg/practice.svg'
import Practice_2 from './svg/practice_2.svg'
import PracticeBlur from './svg/practice_blur.svg'
import Practice_3 from './svg/practice_3.svg'

const Instruction = ({ progress, setProgress } : any) => {

  const handleProgress = () => {
    setProgress(progress + 1);
  };
  console.log(progress)
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
            See demo
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
            <button className={styles.pacticeButton} onClick={(e) => {
              handleProgress();
            }}>
              Next
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
        : progress == 7 ? 
        <div className={styles.instuctionBox_2}  onClick={(e) => {
          handleProgress();
        }}>
            
            <Practice_3/> 
          </div>
        : progress == 8 ? 
        <div className={styles.instuctionBox_2}>
          <h2>
            Answer as fast as you can!
          </h2>
          <button className={styles.centeredButton} onClick={(e) => {
            handleProgress();
          }}>
            Start
          </button>
        </div>
        : ''
      }
    </div>
  );
}; 

export default Instruction;
