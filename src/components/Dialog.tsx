import styles from '../styles/components/Dialog.module.css'
import { ChallengesContext } from '../context/ChallengesContext'
import { useContext, useEffect, useRef, useState } from 'react';


export default function Dialog ( ) {
    const {level} = useContext(ChallengesContext);
    const [ isOpen, setOpen ] = useState( false )
    const isFirstRun = useRef(true);
    
    function close() {
        setOpen(false);
    } 
    useEffect( () => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
          }
        setOpen(true);    

    }, [level])
    
    return isOpen? 
    (
        
        <dialog open className={styles.dialogContainer}>
            <section>
                <hgroup>
                    <h1>{level}</h1>
                    <h2>Parabens!</h2>
                </hgroup>
                <p>Você alcançou um novo nível</p>
                <button onClick={close} className={styles.closeButton}>
                    <img src="/icons/close.svg" />
                </button>
            </section>
        </dialog>
    ) : null
}