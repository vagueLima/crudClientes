import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useResource } from "react-request-hook";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
export default function Home() {
	const [clientRequest, getClients] = useResource(() => ({
		url: `/client`,
		method: "GET",
	}));
	const [clients, setClientes] = useState([]);
	useEffect(() => getClients(), []);
	useEffect(() => {
		clientRequest.data ? setClientes(clientRequest.data.clients) : [];
		console.log(clients);
	}, [clientRequest]);

	return (
		<div className={styles.container}>
			<Head>
				<title>Clientes</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h2 className={styles.title}>Lista de Inadimplentes</h2>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Primeiro Nome</th>
							<th>Último Nome</th>
							<th>Débito Total</th>
						</tr>
					</thead>
					<tbody>
						{clients.map((client, i) => {
							return (
								<tr>
									<td>{i + 1}</td>
									<td>{client.firstName}</td>
									<td>{client.lastName}</td>
									<td>{client.totalDebt}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
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
