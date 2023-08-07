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
          <h2>
            This is a super-short experiment, which takes 50-120 seconds of your precious time.
          </h2>
          <button className={styles.centeredButton} onClick={(e) => {
            handleProgress(e);
          }}>
            Next
          </button>
        </>
        : progress == 1 ? 
        <>
          <h2>
            Our goal is to make Google Sheets better.
          </h2>
          <button className={styles.centeredButton} onClick={(e) => {
            handleProgress(e);
          }}>
            Next
          </button>
        </>
        : progress == 2 ? 
        <>
          <h2>
            We will simulate very basics tasks in Google Sheets
          </h2>
          <button className={styles.centeredButton} onClick={(e) => {
            handleProgress(e);
          }}>
            Next
          </button>
        </>
        : progress == 3 ? 
        <>
          <h2>
            Answer as fast as you can
          </h2>
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
