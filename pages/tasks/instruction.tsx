import styles from '../../styles/FirstTask.module.scss'

const Instruction = ({ progress, setProgress } : any) => {

  const handleProgress = () => {
    setProgress(progress + 1);
  };

  return (
    <div>
      {progress == 0 ?
        <div className={styles.instuctionBox}>
          <h2>
            This is a super-short experiment, which takes 50-120 seconds of your precious time.
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
            We will simulate very basics tasks in Google Sheets
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
            Answer as fast as you can
          </h2>
          <button className={styles.centeredButton} onClick={(e) => {
            handleProgress();
          }}>
            Next
          </button>
        </div>
        : ''
      }
    </div>
  );
};

export default Instruction;
