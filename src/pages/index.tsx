
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import HomeStyles from  '../styles/components/Home.module.css'
import Countdown from '../components/CountDown';
import Head from 'next/head';
import ChallengeBox from '../components/ChallengeBox';

export default function Home() {
  return (
<div className="container">
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
  )
}
