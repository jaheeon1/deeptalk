import { useDispatch } from "react-redux";

export function MiddleNav() {
	const dispatch = useDispatch();
	return (
		<div className="middleNav">
			1234
		</div>
	);
	return (
		<middleNav className="middleNav">
			<button
				className="btn btn__primary btn__icon"
				onClick={() => {
					dispatch(setTeacherModalOpen(true));
				}}
			>
				<PersonAddSVG /> <span>선생님추가</span>
			</button>
			<button
				className="btn btn__primary btn__icon"
				onClick={() => {
					dispatch(setTalkModalOpen(true));
				}}
			>
				<PersonAddSVG /> <span>대화하기</span>
			</button>
		</middleNav>
	);
}
