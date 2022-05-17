import { useSelector, useDispatch } from "react-redux";
import {
    setSelectedVideoLog,
    fetchVideoLogs
} from "@/modules";
import { useEffect } from "react";

export function VideoLogTable() {
    const state = useSelector((state) => {
        return state.videoLog
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchVideoLogs());
    }, [dispatch]);

    return (
        <div>
            {state.videoLogList.map(({ _id, teacher_name, step, video_path }) => (
                <div key={_id} onClick={() => {
                    dispatch(setSelectedVideoLog(true));
                }}>
                    <video width="350" controls>
                        <source src={video_path} type="video/mp4" />
                    </video>
                    <span>{teacher_name} 선생님과 대화주제</span>
                </div>
            ))}
        </div>
    );
}
