import { useSelector, useDispatch } from "react-redux";
import { PencilSVG, TrashSVG } from "@/icons";
import {
	deleteTalk,
	fetchTalks,
	setTalkModalOpen,
	setSelectedTalk,
} from "@/modules";
import { useEffect } from "react";

export function TalkTable() {
	const state = useSelector((state) => state.talk);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTalks());
	}, [dispatch]);

	return (<div className="talkScreen">
        <div></div>
    </div>
	);
}
