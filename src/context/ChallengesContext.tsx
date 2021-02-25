import { createContext , useState, ReactNode} from 'react';
import challengeList from '../challenges.json';


interface ChallengesProviderProps {
    children: ReactNode;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface levelProgress {
    level: number;
    start: number;
    end: number;
    current:number;
}

interface ChallengesContextData {
    levelProgress: levelProgress;
    currentExperience:number;
    challengesCompleted:number;
    startNewChallenge: () => Challenge;
    activeChallenge: Challenge;    
    finishChallenge: (success:boolean) => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider ({ children }:ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted ,  setChallengesCompleted] = useState(0);
    const [activeChallenge , setActiveChallenge] = useState(null);

    const levelProgress = {
        level:level, //nivel atual
        start: Math.floor(100 * Math.pow(level-1,1.5)), //xp inicial do nivel
        end: Math.floor(100 * Math.pow(level,1.5)), //xp do proximo nivel
        current: currentExperience, //xp atual
     }


    function levelUp( ) {
        setLevel( level + 1 );
    }

    function startNewChallenge () {
        console.log('new Challenge');
        const challengeIndex = Math.round( Math.random() * challengeList.length );
        setActiveChallenge( challengeList[challengeIndex] );
    }

    function finishChallenge( success : boolean) {
        if( activeChallenge ){
            
            if( success ) {
                setChallengesCompleted( challengesCompleted + 1)
                const nextExperience = currentExperience + activeChallenge.amount;
                setCurrentExperience(nextExperience)
                
                if( nextExperience >= levelProgress.end) {
                    setLevel( level + 1)
                }
            }
            setActiveChallenge(null)
        }
    }

    return (
        <ChallengesContext.Provider 
            value={{ 
                levelProgress,            
                currentExperience,
                challengesCompleted,
                startNewChallenge,
                activeChallenge,
                finishChallenge,
            }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}