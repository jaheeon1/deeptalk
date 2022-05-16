import { useSelector, useDispatch } from "react-redux";
import { PencilSVG, TrashSVG } from "@/icons";
import {
	deleteTeacher,
	fetchTeachers,
	setTeacherModalOpen,
	setSelectedTeacher,
} from "@/modules";
import { useEffect } from "react";

export function TeacherSwipe() {
	const state = useSelector((state) => {
		console.log(state.teacher);
		return state.teacher;
	});
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTeachers());
	}, [dispatch]);

	return (
        <>
            <div>선생님 목록</div>
            <table className="table">
                <thead className="table__head">
                    <tr>
                        <th>이름</th>
                    </tr>
                </thead>

                <tbody className="table__body">
                    {state.teacherList.map(({ _id, name}) => (
                        <tr key={_id}>
                            <td>{name}</td>
                            <td>
                                <button
                                    className="btn btn__compact btn__edit"
                                    onClick={() => {
                                        dispatch(setSelectedTeacher(_id));
                                        dispatch(setTeacherModalOpen(true));
                                    }}
                                >
                                    <PencilSVG />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
	);
}
