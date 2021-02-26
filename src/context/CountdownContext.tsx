import { createContext, ReactNode, useState , useContext, useEffect } from  "react";
import { ChallengesContext } from '../context/ChallengesContext';

interface ChallengesProviderProps {
    children: ReactNode;
}

interface CoundownContextData {
    time: number;
    isActive: boolean;
    hasFinished: boolean;
    toogleCountdown: () => void;
}



export const CountdownContext = createContext({} as CoundownContextData);

export function CountdownProvider({ children }) {
    const [time, setTime] = useState(0.5*60);
    const [isActive, setActive] = useState( false );
    const [hasFinished, setHasFinished] = useState( false );
    const { activeChallenge, startNewChallenge } = useContext(ChallengesContext);
    let countdownTimeout: NodeJS.Timeout;
    function toogleCountdown() {
        setActive(!isActive);
    }

    useEffect( () => {
        setHasFinished( !!activeChallenge );
    }, [activeChallenge])

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
    }, [isActive,time])

    return (
        <CountdownContext.Provider
         value ={{
             time,
             isActive,
             hasFinished,
             toogleCountdown,
         }}
        >
            {children}
        </CountdownContext.Provider>
    )
}