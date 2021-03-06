import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>System kontroli dostępu</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        {/* import bootstrap */}
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"></link>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <p>System kontroli dostępu</p>
        </h1>

        <p className={styles.description}>
          Zadanie projektowe
        </p>

        <div className={styles.grid}>
          <a href="http://localhost:3000/logowanie" className={styles.card}>
            <h2>Logowanie &rarr;</h2>
            <p>Kliknij aby się zalogować do systemu</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <code className={styles.code}>Autorzy: Patryk Jaseniuk & Grzegorz Adamczyk</code>
      </footer>
    </div>
  )
}
