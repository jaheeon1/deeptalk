import { useSelector, useDispatch } from "react-redux";
import { PencilSVG, TrashSVG } from "@/icons";
import {
	deleteStudent,
	fetchStudents,
	setRegisterModalOpen,
	setSelectedStudent,
} from "@/modules";
import { useEffect } from "react";

export function AuthTable() {
	const state = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		const loginedStudent = JSON.parse(localStorage.getItem("loginedStudent"));
		dispatch(fetchStudents(loginedStudent));
	}, [dispatch]);

	return (
		<table className="table">
			<thead className="table__head">
				<tr>
					<th>userid</th>
					<th>password</th>
					<th>name</th>
				</tr>
			</thead>

			<tbody className="table__body">
				{(state)?state.userList.map(({ _id, userid, password, name }) => (
					<tr key={_id}>
						<td>{userid}</td>
						<td>{password}</td>
						<td>{name}</td>
						<td>
							<button
								className="btn btn__compact btn__edit"
								onClick={() => {
									dispatch(setSelectedStudent(_id));
									dispatch(setRegisterModalOpen(true));
								}}
							>
								<PencilSVG />
							</button>
							<button
								className="btn btn__compact btn__delete"
								onClick={() => {
									dispatch(deleteStudent(_id));
								}}
							>
								<TrashSVG />
							</button>
						</td>
					</tr>
				)):''}
			</tbody>
		</table>
	);
}
