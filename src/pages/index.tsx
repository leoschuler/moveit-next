
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import HomeStyles from  '../styles/components/Home.module.css'
import Countdown from '../components/Countdown';
import Head from 'next/head';
import ChallengeBox from '../components/ChallengeBox';
import Dialog from '../components/Dialog';
import { GetServerSideProps } from 'next';

import {ChallengesProvider} from '../context/ChallengesContext'
import { CountdownProvider } from '../context/CountdownContext'
interface HomeProps {
  level:number,
  currentExperience:number,
  challengesCompleted:number,
}

export default function Home(props:HomeProps) {
  console.log(props)
  return (
    <ChallengesProvider {...props}>
      <CountdownProvider>

        <div className="container">
          <Dialog />

        <Head>
          <title>Início | move.it</title>
        </Head>
          <ExperienceBar />
          <main className={HomeStyles.home}>
            <section>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </section>
            
            <ChallengeBox />
            
          </main>
        </div>

      </CountdownProvider>
    </ChallengesProvider>

  )
}

// roda no server-side
export const getServerSideProps:GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props:{
      level:Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted:Number(challengesCompleted),
    }
  }
} 