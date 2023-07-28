import { useEffect, useState } from 'react';
import Image from "next/image";
import MySvg from './task_2.svg';
import MySvgBlurred from './task_2_blur.svg';
import styles from '../../styles/FirstTask.module.scss'
import MouseTracker from '../../components/mouseTracker'

const Instruction = ({ progress, setProgress } : any) => {

  const handleProgress = (e) => {
    setProgress(progress + 1);
  };

  return (
    <div>
      {progress == 0 ?
        <>
          <h3>
            This is a super-short experiment, which takes 50-120 seconds of your precious time.
          </h3>
          <button className={styles.centeredButton} onClick={(e) => {
            handleProgress(e);
          }}>
            Next
          </button>
        </>
        : progress == 1 ? 
        <>
          <h3>
            Our goal is to make Google Sheets better.
          </h3>
          <button className={styles.centeredButton} onClick={(e) => {
            handleProgress(e);
          }}>
            Next
          </button>
        </>
        : progress == 2 ? 
        <>
          <h3>
            We will simulate very basics tasks in Google Sheets
          </h3>
          <button className={styles.centeredButton} onClick={(e) => {
            handleProgress(e);
          }}>
            Next
          </button>
        </>
        : progress == 3 ? 
        <>
          <h3>
            Answer as fast as you can
          </h3>
          <button className={styles.centeredButton} onClick={(e) => {
            handleProgress(e);
          }}>
            Next
          </button>
        </>
        : ''
      }
    </div>
  );
};

export default Instruction;
