import Head from 'next/head'
// import styles from '@/styles/Home.module.css'
import Dashboard from "@/pages/dashboard";
import SideMenu from "@/app/components/SideMenu";
import scss from "./Home.module.scss";
import Habits from './dashboard/habits';

export default function Home() {

    return (
        <>
            <Head>
                <title>Habit Tracker</title>
                <meta name="description" content="Habit Tracker" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={scss.main}>
                {
                    <>
                        <Dashboard />
                    </>
                }
            </main>
        </>
    )
}