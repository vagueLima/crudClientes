import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useResource } from "react-request-hook";
import { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import DebtTable from "./components/debtTables";
import { dataFormatada } from "../generalUse";

export default function Home() {
	const [clientRequest, getClients] = useResource(() => ({
		url: `/client`,
		method: "GET",
	}));
	const [clients, setClientes] = useState([]);
	const [sortMode, setSortMode] = useState("");
	const [filter, setFilter] = useState("");

	useEffect(() => getClients(), []);
	useEffect(() => sortClients(), [sortMode]);
	useEffect(() => filterClients(), [filter]);
	useEffect(() => {
		clientRequest.data ? setClientes(getRawClientList()) : [];
		console.log(clients);
	}, [clientRequest]);

	const getRawClientList = () => {
		if (!clientRequest.data) return [];
		return clientRequest.data.clients.map((client) => ({
			name: `${client.firstName} ${client.lastName}`,
			debts: client.debts,
			totalDebt: client.totalDebt,
			since: client.debts[0].date,
			toggleDebts: false,
		}));
	};
	const ascending = (a, b) => {
		if (a[sortMode] > b[sortMode]) {
			return 1;
		} else {
			return -1;
		}
	};

	const sortClients = () => {
		const sortedClientes = clients.sort(ascending);
		setClientes([...sortedClientes]);
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

	const filterClients = () => {
		if (sortMode == "") {
			setClientes(
				getRawClientList().filter((client) =>
					client.name.toLowerCase().includes(filter.toLowerCase())
				)
			);
		} else {
			const sortedClientes = getRawClientList()
				.filter((client) =>
					client.name.toLowerCase().includes(filter.toLowerCase())
				)
				.sort(ascending);
			setClientes([...sortedClientes]);
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Clientes</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="mainList">
				<h2 className={styles.title}>Lista de Inadimplentes</h2>
				<Form>
					<Form.Control
						type="text"
						placeholder="Buscar"
						value={filter}
						onChange={(el) => setFilter(el.target.value)}
					/>
				</Form>

				<Table className="clientsTable" bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th className="sortHeader" onClick={() => setSortMode("name")}>
								Nome do Cliente ↕{" "}
							</th>
							<th
								className="sortHeader"
								onClick={() => setSortMode("totalDebt")}
							>
								Valor ↕
							</th>
							<th className="sortHeader" onClick={() => setSortMode("since")}>
								Desde ↕
							</th>
						</tr>
					</thead>
					<tbody>
						{clients.map((client, i) => {
							return (
								<React.Fragment>
									<tr
										className="clientRow"
										key={i}
										onClick={() => {
											toggleDebts(i);
										}}
									>
										<td>{i + 1}</td>
										<td>{client.name}</td>
										<td>R$ {client.totalDebt}.00</td>
										<td>{dataFormatada(client.since)}</td>
									</tr>
									{client.toggleDebts ? DebtTable(client.debts) : ""}
								</React.Fragment>
							);
						})}
					</tbody>
				</Table>
				<footer className={styles.footer}>
					<a
						href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						Por Lucas Lima
					</a>
				</footer>
			</main>
		</div>
	);
}
