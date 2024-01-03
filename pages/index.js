import HomePage from '@/components/HomePage'
import Launchpad from '@/components/Launchpad'
import { Inter } from '@next/font/google'
import Head from 'next/head'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Wizard Finance</title>
        <link rel="shortcut icon" href="/assets/Images/WizardFlying.gif" />
      </Head>
      <HomePage/>
    </>
  )
}
