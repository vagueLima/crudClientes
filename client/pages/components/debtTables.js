import { Table, Form, Button } from "react-bootstrap";

function dataFormatada(rawDate) {
	var data = new Date(rawDate),
		dia = data.getDate().toString(),
		diaF = dia.length == 1 ? "0" + dia : dia,
		mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
		mesF = mes.length == 1 ? "0" + mes : mes,
		anoF = data.getFullYear();
	return diaF + "/" + mesF + "/" + anoF;
}

export default function DebtTable(debts) {
	console.log(debts);
	return (
		<tr>
			<td colSpan="3">
				<Table size="sm">
					<thead>
						<tr>
							<th>#</th>
							<th> Descricao</th>
							<th> Valor</th>
							<th> Data</th>
						</tr>
					</thead>

					<tbody>
						{debts.map((debt, i) => {
							return (
								<tr key={i}>
									<td>{i + 1}</td>
									<td>{debt.description}</td>
									<td>{debt.value}</td>
									<td>{dataFormatada(debt.date)}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</td>
		</tr>
	);
}
