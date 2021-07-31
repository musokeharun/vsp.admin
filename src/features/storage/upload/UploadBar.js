import React, {useEffect, useState} from 'react';
import Icon from "../../../common/Icon";
import {faFileVideo, faPause, faPlayCircle, faTimesCircle, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Progress from "../../../common/progress";
import Upload from 'gcs-browser-upload'
import {getReadableSizeFromBytes, getSizeUnits} from "../../../utils/utils";
import _ from "lodash";

const UploadBar = ({name = "Movie File", onDelete, id, file}) => {

    const [info, setInfo] = useState({});
    const [paused, setPaused] = useState(true);
    const [upName, setName] = useState("");

    let onActionClick, upload;

    const onStart = async () => {
        let prompt = window.prompt();
        if (!prompt) return;
        setName(prompt);
        console.log(file, `Started ${prompt}`);

        return;
        const url = "";
        upload = new Upload({
            id: 'foo',
            url,
            file,
            onChunkUpload: (info) => {
                setInfo(info);
                console.log('Chunk uploaded', info)
            }
        })
        try {
            let url = await upload.start()
            console.log('Upload complete!')
        } catch (e) {
            console.log('Upload failed!', e)
        } finally {
            upload = null
        }
    }

    const onPause = () => {
        if (upload) {
            upload.pause()
            onActionClick = onPlay;
            setPaused(true)
        }
    }

    const onPlay = () => {
        if (upload) {
            upload.unpause()
            onActionClick = onPause;
            setPaused(false)
        }
    }

    const handleDelete = () => {
        if (upload) {
            upload.pause();
            upload = null;
        }
        onDelete(id);
    }

    useEffect(() => {
        setPaused(true)
        onActionClick = onStart;
        console.log(file.size, onActionClick);
    }, [])

    return (
        <div className="card card-body h-100 mb-3">
            <div className="row align-items-center">
                <div className={"col-1 d-flex text-center align-items-center"}>
                    <Icon icon={faFileVideo} className={"fa-3x text-primary"}/>
                </div>
                <div className={"col"}>
                    <div className={"w-100"}>
                        <span className="h5 mb-3 text-800">{_.truncate(name, {length: 50})}</span>
                        <span
                            className={"h6 ml-auto text-500 float-end"}>{`0 % of ${getReadableSizeFromBytes(file ? _.parseInt(file.size) : 0)}`}</span>
                        <Progress/>
                        <span className="h5 text-800">{_.truncate(upName, {length: 50})}</span>
                    </div>
                </div>
                <div className={"col-1 d-flex justify-content-center align-items-center m-0"}>
                    <button data-bs-toggle="tooltip" data-bs-placement="bottom" className={"btn px-1"}
                            title={paused ? "Resume" : "Pause"}
                            onClick={() => onActionClick()}>
                        <Icon icon={paused ? faPlayCircle : faPause} className={"close"}/>
                    </button>
                    <button data-bs-toggle="tooltip" data-bs-placement="bottom" className={"btn p-0"} title={"Clear"}
                            onClick={() => handleDelete()}>
                        <Icon icon={faTrashAlt} className={"close text-danger"}/>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default UploadBar;
