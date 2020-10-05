import { Table, Form, Button } from "react-bootstrap";
import { dataFormatada } from "../../generalUse";

export default function DebtTable(debts) {
	if (debts.length > 0) {
		return (
			<tr>
				<td colSpan="4">
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
										<td>R$ {debt.value}.00</td>
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
	return null;
}
