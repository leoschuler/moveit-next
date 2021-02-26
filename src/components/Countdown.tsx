import { useContext } from 'react';
import { CountdownContext } from '../context/CountdownContext';

import styles from '../styles/components/Countdown.module.css'


export default function Countdown() {
    const { time, isActive, hasFinished, toogleCountdown } = useContext(CountdownContext);

    const minutes = Math.floor( time / 60 );
    const seconds = time % 60;


    return (
        <>
        <time className={styles.countdownContainer}>
            <span className={styles.timerGroup}>
                {String(minutes).padStart(2,'0').split("").map((digito,i)=>(<span key={i}>{digito}</span>))}                
            </span>
            <span className={styles.separator}>:</span>
            <span className={styles.timerGroup}>
                {String(seconds).padStart(2,'0').split("").map((digito,i)=>(<span key={i}>{digito}</span>))}
            </span>
        </time>
        {hasFinished ?
        (
             <button className={styles.countdownButton} disabled> ciclo finalizado </button> 
        ) 
        :
        (
            <>
            <button className={`${styles.countdownButton} ${isActive?styles.active:styles.inactive}`} onClick={toogleCountdown}>{isActive?"Abandonar Ciclo":"Iniciar um ciclo"}</button>
            </>
        )}
        </>
    )
}