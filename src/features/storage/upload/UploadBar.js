import React, {useEffect, useState} from 'react';
import Icon from "../../../common/Icon";
import {faFileVideo, faPause, faPlayCircle, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Progress from "../../../common/progress";
import Upload from 'gcs-browser-upload'
import {getExtensionFromFileName, getReadableSizeFromBytes} from "../../../utils/utils";
import _ from "lodash";
import Http, {API_URL} from "../../../services/http";
import {toast} from "react-toastify";
import CheckBox from "../../../common/CheckBox";

const UploadBar = ({name = "Movie File", onDelete, id, file, path}) => {

    const [paused, setPaused] = useState(true);
    const [upName, setName] = useState("");
    const [started, setStarted] = useState(false);
    const [loaded, setLoaded] = useState(0);

    const total = file.size;
    let upload;

    const handleNameChange = (name) => {
        if (upload && started) {
            toast("Could not change title value, upload in progress.", {type: "info"});
        } else {
            setName(name);
        }
    }

    const getResumeUrl = async (path, title, total) => {
        let body = {
            path,
            title,
            total
        };
        try {
            let {data} = await Http.post(API_URL + "upload/resume/get", body);
            return data;
        } catch (e) {
            toast("Could not get link", {
                type: "error"
            })
            return {};
        }

    }

    const onStart = async () => {

        if (!upName || !path || !file || !file.size || !file.name) {
            toast("Could not start upload,check file details.", {type: "error"});
            return;
        }

        let title = `${upName}.${getExtensionFromFileName(file.name)}`;
        console.log(file, `Started ${title}`);

        const {url, token} = await getResumeUrl(_.replace(path, " ", "_"), title, file.size);
        if (!url || !token) return

        upload = new Upload({
            id: token,
            url,
            file,
            onChunkUpload: (info) => {
                let loaded = info.uploadedBytes;
                setLoaded(loaded)
                let body = {
                    token,
                    loaded
                }
                Http.post(API_URL + "upload/resume/update", body)
                    .then(e => console.log("Loaded to Server"))
                    .catch(e => console.log("Error loading to server"));
                console.log('Chunk uploaded', info)
            },chunkSize : 6553600
        })
        try {
            let url = await upload.start()
            let body = {
                token,
                completed: 1,
                loaded: total
            }
            await Http.post(API_URL + "upload/resume/update", body);
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
            setPaused(true)
        }
    }

    const onPlay = () => {
        if (upload) {
            upload.unpause()
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
        console.log("Size", file.size);
    }, [])

    const onActionClick = async () => {
        if (!started) {
            await onStart();
        } else if (paused)
            onPlay();
        else onPause();
    }

    let options = [{label: "1080p"}, {label: "720p"}, {label: "480p"}, {label: "360p"}, {label: "srt"}];

    let loadedPercentage = Math.ceil((loaded / total) * 100);
    return (
        <div className="card card-body h-100 mb-3" title={`${path}/${upName}`} data-toggle={"tooltip"}>
            <div className="row align-items-center">
                <div className={"col-1 d-flex text-center align-items-center"}>
                    <Icon icon={faFileVideo} className={"fa-3x text-primary"}/>
                </div>
                <div className={"col"}>
                    <div className={"w-100"}>
                        <span className="h5 mb-3 text-800">{_.truncate(name, {length: 50})}</span>
                        <span className={"h6 ml-auto text-500 float-end"}>
                            {`${loadedPercentage} % of ${getReadableSizeFromBytes(file ? _.parseInt(file.size) : 0)}`}
                        </span>
                        <Progress width={loadedPercentage} completed={loaded >= total}/>
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
            <CheckBox
                options={options}
                current={upName}
                name={id}
                handleChange={e => handleNameChange(e)}
            />
        </div>
    );
};

export default UploadBar;
