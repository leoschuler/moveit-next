import styles from '../styles/components/ExperienceBar.module.css'
import { ChallengesContext } from '../context/ChallengesContext'
import { useContext } from 'react';

export default function ExperienceBar ( ) {
    const {levelProgress} = useContext(ChallengesContext);
    console.log(levelProgress)
    const progress = (levelProgress.current - levelProgress.start)*100/(levelProgress.end - levelProgress.start)
    return (
        <header className={styles.experienceBar}>
            <span>{levelProgress.start} xp</span>
            <div>
                <div style={{width:`${progress}%`}}>
                    <span className={styles.currentExperience} style={{left:`${progress}%`}}>{levelProgress.current} xp</span>
                </div>
            </div>
            <span>{levelProgress.end} xp</span>
        </header>
    )
}