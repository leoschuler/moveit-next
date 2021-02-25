import {useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'


export default function Countdown() {
    const [time, setTime] = useState(0.5*60);
    const [isActive, setActive] = useState( false );
    const [hasFinished, setHasFinished] = useState( false );
    const { activeChallenge, startNewChallenge } = useContext(ChallengesContext);
    const minutes = Math.floor( time / 60 );
    const seconds = time % 60;

    let countdownTimeout: NodeJS.Timeout;
    function toogleCountdown() {
        setActive(!isActive);
    }

    useEffect( () => {
        
        if( isActive && time > 0) {
           countdownTimeout = setTimeout( () => { setTime( time - 1)} , 100)
        } else if (isActive && time <= 0 )
        {            
            clearTimeout(countdownTimeout)
            setActive(false);            
            startNewChallenge();

        } else if( !isActive ) {
            setTime(0.5*60);
            clearTimeout(countdownTimeout)
        }
    }, [isActive,time,activeChallenge])

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
        {activeChallenge ?
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