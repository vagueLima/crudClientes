import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useResource } from "react-request-hook";
import { useEffect } from "react";

export default function Home() {
	const [clients, getClients] = useResource(() => ({
		url: `/client`,
		method: "GET",
	}));

	useEffect(() => getClients(), []);
	useEffect(() => {
		console.log(clients);
	}, [clients]);

	return (
		<div className={styles.container}>
			<Head>
				<title>Clientes</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h2 className={styles.title}>List</h2>
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
	);
}
