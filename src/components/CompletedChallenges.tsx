import {useContext} from 'react';
import styles from '../styles/components/CompletedChallenges.module.css'
import { ChallengesContext } from '../context/ChallengesContext';

export default function Profile() {
    const {challengesCompleted} = useContext(ChallengesContext);

    return (
        <div className={styles.completedChallenges}>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}