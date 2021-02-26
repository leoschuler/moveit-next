import { createContext , useState, ReactNode, useEffect} from 'react';
import challengeList from '../challenges.json';
import Cookies from 'js-cookie';


interface ChallengesProviderProps {
    children: ReactNode;
    level:number,
    currentExperience:number,
    challengesCompleted:number,
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
    startNewChallenge: () => void;
    activeChallenge: Challenge;    
    finishChallenge: (success:boolean) => void;
    level: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider ({ children, ...rest }:ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted ,  setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge , setActiveChallenge] = useState(null);

    const levelProgress = {
        level:level, //nivel atual
        start: Math.floor(100 * Math.pow(level-1,1.5)), //xp inicial do nivel
        end: Math.floor(100 * Math.pow(level,1.5)), //xp do proximo nivel
        current: currentExperience, //xp atual
     }


     useEffect( ()  => {
         Cookies.set('level', String(level));
         Cookies.set('currentExperience', String(currentExperience));
         Cookies.set('challengesCompleted', String(challengesCompleted));
     }, [level, currentExperience, challengesCompleted] );


    useEffect( ()  => {
        Notification.requestPermission();
    }, [] );

    function startNewChallenge () {
        console.log('new Challenge');
        const challengeIndex = Math.round( Math.random() * challengeList.length );
        const curChallenge = challengeList[challengeIndex] 
        setActiveChallenge( curChallenge );
        
        new Audio('/notification.mp3').play();

        if( Notification.permission === "granted" ) {
            new Notification('Novo Desafio! 🎉 ', {
                body: `Valendo ${curChallenge.amount}xp!`
            })
        }
        
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
                level,
            }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}