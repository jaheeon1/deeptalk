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



<div className="overflow-x-auto w-full">
  <table className="table w-full">
    <thead>
      <tr>
        <th>이름</th>
        <th>직업</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="https://daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          Zemlak, Daniel and Leannon
          <br/>
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
      </tr>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="https://daisyui.com/tailwind-css-component-profile-3@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Brice Swyre</div>
              <div className="text-sm opacity-50">China</div>
            </div>
          </div>
        </td>
        <td>
          Carroll Group
          <br/>
          <span className="badge badge-ghost badge-sm">Tax Accountant</span>
        </td>
      </tr>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="https://daisyui.com/tailwind-css-component-profile-4@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Marjy Ferencz</div>
              <div className="text-sm opacity-50">Russia</div>
            </div>
          </div>
        </td>
        <td>
          Rowe-Schoen
          <br/>
          <span className="badge badge-ghost badge-sm">Office Assistant I</span>
        </td>
      </tr>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="https://daisyui.com/tailwind-css-component-profile-5@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Yancy Tear</div>
              <div className="text-sm opacity-50">Brazil</div>
            </div>
          </div>
        </td>
        <td>
          Wyman-Ledner
          <br/>
          <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span>
        </td>
      </tr>
    </tbody>
  </table>
</div>    
            <table className="table">
                <thead className="table__head">
                    <tr>
                        <th>이름</th>
                        <th>이미지</th>
                    </tr>
                </thead>                
                <tbody className="table__body">
                    {state.teacherList.map(({ _id, name, imgPath}) => (
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
