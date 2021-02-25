
import styles from '../styles/components/Profile.module.css'
import { ChallengesContext } from '../context/ChallengesContext'
import { useContext } from 'react';

export default function Profile() {
    const {levelProgress} = useContext(ChallengesContext);
    
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/leoschuler.png"  alt="Leonardo Schuler"/>
            <hgroup>
                <h1>Leonardo Schuler</h1>
                <h2>Level {levelProgress.level}</h2>
            </hgroup>

        </div>
    )
}