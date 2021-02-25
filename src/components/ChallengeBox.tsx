import { useContext } from 'react';
import styles from '../styles/components/ChallengeBox.module.css'
import {ChallengesContext} from '../context/ChallengesContext';

export default function ChallengeBox() {
    const hasActiveChallenge = true;
    const {activeChallenge, finishChallenge} = useContext(ChallengesContext)
    
    return (
        <section className={styles.ChallengeBoxContainer}>
            {!activeChallenge ? 
            (
                <>
                    <h1>Finalize um ciclo para receber desafios</h1>
                    <p className={styles.levelUp}>
                        <img src="icons/level-up.svg" alt="Level Up"  />
                        Avance de nível completando desafios.
                    </p>
                </>
            )
            :
            (
                <>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <div className={styles.mainContent} >
                        <h1>
                            <img src={`icons/${activeChallenge.type}.svg`} alt="novo desafio" />
                            Novo Desafio!
                        </h1>
                        <p>{activeChallenge.description}</p>
                    </div>   
                    <footer>
                        <button 
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={()=>{finishChallenge(false)}}
                        >
                            Falhei
                        </button>

                        <button 
                            type="button"
                            className={styles.challengeSucceededButton}
                            onClick={()=>{finishChallenge(true)}}
                        >
                            Concluí
                        </button>

                    </footer>
                </>
            )
            }
            

        </section>
    )
}