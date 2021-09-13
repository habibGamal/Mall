import Head from 'next/head'
import Cards from '../components/cards/Cards'
import DashboardControlPanel from '../components/control-panel/DashboardControlPanel'

export default function Home() {
  return (
    <>
        <Head>
            <title>Dashboard</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Cards />
        <DashboardControlPanel />
    </>
  )
}
