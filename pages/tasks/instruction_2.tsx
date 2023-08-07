import styles from '../../styles/FirstTask.module.scss'

const Instruction2 = ({ progress, setProgress } : any) => {

  const handleProgress = (e) => {
    setProgress(progress + 1);
  };

  return (
     <>
          <h2>
            Please answer a few questions about your experience with google sheets.
          </h2>
          <button className={styles.centeredButton} onClick={(e) => {
            handleProgress(e);
          }}>
            Next
          </button>
        </>
  );
};

export default Instruction2;
