import { useSelector, useDispatch } from "react-redux";
import { PencilSVG, TrashSVG } from "@/icons";
import {
	deleteTeacher,
	fetchTeachers,
	setTeacherModalOpen,
	setSelectedTeacher,
    syncTeachers
} from "@/modules";
import { useEffect } from "react";

export function TeacherTable() {
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
            <button
                className="btn btn__primary btn__icon"
                key="100"
                onClick={() => {
                    dispatch(syncTeachers());
                }}
            >
                <span>선생님 동기화</span>
            </button>
            <table className="table">
                <thead className="table__head">
                    <tr>
                        <th>이름</th>
                        <th>이미지</th>
                    </tr>
                </thead>

                <tbody className="table__body">
                    {state.teacherList.map(({ _id, provincial_office, regional_office, region, school_code, school_name, school_level_code, establishment_classification, exclusion, meal_cost }) => (
                        <tr key={_id}>
                            <td>{name}</td>
                            <td>{imgPath}</td>
                            <td>
                                <button
                                    className="btn btn__compact btn__edit"
                                    onClick={() => {
                                        dispatch(setSelectedTeacher(_id));
                                        dispatch(setTeacherModalOpen(true));
                                    }}
                                >
                                    <PencilSVG />
                                    ]\
                                </button>
                                <button
                                    className="btn btn__compact btn__delete"
                                    onClick={() => {
                                        dispatch(deleteTeacher(_id));
                                    }}
                                >
                                    <TrashSVG />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
	);
}
