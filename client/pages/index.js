import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Clientes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Clientes Inadimplentes
        </h1>

        <p className={styles.description}>
          criado com next.js
        </p>

        <div className={styles.grid}>
          <a href="/list" className={styles.card}>
            <h3>Listar Clientes</h3>
            <p>Listagem dos Clientes Inadimplentes</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
        Por Lucas Lima
        </a>
      </footer>
    </div>
  )
}
