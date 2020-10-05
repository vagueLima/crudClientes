import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useResource } from "react-request-hook";
import { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import DebtTable from "./components/debtTables";

export default function Home() {
	const [clientRequest, getClients] = useResource(() => ({
		url: `/client`,
		method: "GET",
	}));
	const [clients, setClientes] = useState([]);
	const [sortMode, setSortMode] = useState("");
	const [filter, setFilter] = useState("");
	useEffect(() => getClients(), []);
	useEffect(() => {
		clientRequest.data
			? setClientes(
					clientRequest.data.clients.map((client) => ({
						name: `${client.firstName} ${client.lastName}`,
						debts: client.debts,
						totalDebt: client.totalDebt,
						toggleDebts: false,
					}))
			  )
			: [];
		console.log(clients);
	}, [clientRequest]);

	const ascending = (a, b) => {
		if (a[sortMode] > b[sortMode]) {
			return 1;
		} else {
			return -1;
		}
	};
	useEffect(() => {
		const sortedClientes = clients.sort(ascending);
		setClientes([...sortedClientes]);
		console.log(clients);
	}, [sortMode]);

	const sortByName = (firstOrLast) => {
		if (firstOrLast === "name") {
			setSortMode("name");
		} else if (firstOrLast === "totalDebt") {
			setSortMode("totalDebt");
		}
	};
	const toggleDebts = (index) => {
		const newClients = clients.map((client, i) => {
			if (i == index) {
				return { ...client, toggleDebts: !client.toggleDebts };
			}
			return client;
		});
		console.log(newClients);
		setClientes([...newClients]);
	};
	const filterClients = (evt) => {
		evt.preventDefault();
		console.log(filter);
	};
	return (
		<div className={styles.container}>
			<Head>
				<title>Clientes</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h2 className={styles.title}>Lista de Inadimplentes</h2>
				<Form>
					<Form.Control
						type="text"
						placeholder="Filtro"
						onKeyPress={(el) => setFilter(el.target.value)}
					/>
					<Button variant="primary" type="submit" onClick={filterClients}>
						Buscar
					</Button>
				</Form>

				<Table bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th onClick={() => sortByName("name")}>Nome do Cliente</th>
							<th onClick={() => sortByName("totalDebt")}>Débito Total</th>
						</tr>
					</thead>
					<tbody>
						{clients.map((client, i) => {
							return (
								<React.Fragment>
									<tr
										key={i}
										onClick={() => {
											toggleDebts(i);
										}}
									>
										<td>{i + 1}</td>
										<td>{client.name}</td>
										<td>{client.totalDebt}</td>
									</tr>
									{client.toggleDebts ? DebtTable(client.debts) : ""}
								</React.Fragment>
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
