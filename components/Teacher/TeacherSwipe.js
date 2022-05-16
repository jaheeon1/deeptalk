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
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    <thead>
      <tr>
        <th>AI 상담선생님</th>
        <th>특징</th>
      </tr>
    </thead>
    <tbody>
      {state.teacherList.map(({ _id, name, expertise, imgPath}) => (
      <tr key={_id} onClick={() => {
        dispatch(setSelectedTeacher(_id));
        dispatch(setTeacherModalOpen(true));
    }}>

    
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={imgPath} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{name}</div>
              <div className="text-sm opacity-50">{expertise}</div>
            </div>
          </div>
        </td>
        <td>
        {expertise}
          <br/>
          <span className="badge badge-ghost badge-sm">{name}</span>
        </td>
         
      </tr>
      ))}
    </tbody>
  </table>
</div>
        </>
	);
}
