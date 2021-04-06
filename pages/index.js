import Head from 'next/head'
import Sidebar from "../components/Sidebar";
import Login from "./login"


export default function Home () {
  return (
    <div className="container">
      <Login />
      <Head>
        <title>Whatsapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />
    </div>
  )
}
