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
import React from "react";



export function TeacherTable() {
	const state = useSelector((state) => {
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
                    alert('성공적으로 업데이트 되었습니다.')
                }}
            >
                <span>AI 상담 서비스 업데이트</span>
            </button>
        </>
	);
}
