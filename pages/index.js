import Head from 'next/head'
import Sidebar from "../components/Sidebar";
import app from './app';
import Login from "./login"


export default function Home () {
  return (
    <div className="container">
      <app />
      <Login />
      <Head>
        <title>Whatsapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />
    </div>
  )
}
