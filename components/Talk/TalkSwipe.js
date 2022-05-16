import { useSelector, useDispatch } from "react-redux";
import { PencilSVG, TrashSVG } from "@/icons";
import {
	deleteTalk,
	fetchTalks,
	setTalkModalOpen,
	setSelectedTalk,
} from "@/modules";
import { useEffect } from "react";

export function TalkSwipe() {
	const state = useSelector((state) => state.talk);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTalks());
	}, [dispatch]);

	return (
        <>
            <div>대화내역</div>
            <table className="table">
                <thead className="table__head">
                    <tr>
                        <th>Full name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody className="table__body">
                    {state.talkList.map(({ _id, name, email, address, phone }) => (
                        <tr key={_id}>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{address}</td>
                            <td>{phone}</td>
                            <td>
                                <button
                                    className="btn btn__compact btn__edit"
                                    onClick={() => {
                                        dispatch(setSelectedTalk(_id));
                                        dispatch(setTalkModalOpen(true));
                                    }}
                                >
                                    <PencilSVG />
                                </button>
                                <button
                                    className="btn btn__compact btn__delete"
                                    onClick={() => {
                                        dispatch(deleteTalk(_id));
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
