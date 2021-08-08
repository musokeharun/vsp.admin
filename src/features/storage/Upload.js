import React, {useState} from 'react';
import {Link} from "react-router-dom";
import FileDropper from "../../common/FileDropper";
import UploadBar from "./upload/UploadBar";
import {v1} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {add, remove, selectUploads} from "./upload/UploadSlice";
import Input from "../../common/Input";

const StorageUpload = ({}) => {
    const uploads = useSelector(selectUploads);
    const dispatch = useDispatch();
    const [path, setPath] = useState("");

    console.log("Uploads", uploads, "Path", path);

    let onHandleDropEvent = (name, file) => {
        console.log("Drop Event")
        const newUpload = {
            name,
            file,
            id: v1()
        }
        console.log(uploads, newUpload);
        dispatch(add(newUpload))
        console.log(uploads, newUpload);
    };

    const onHandleDelete = (id) => {
        dispatch(remove(id))
    };

    return (
        <>
            <div className="card mb-1">
                <div className="bg-holder d-none d-lg-block bg-card"/>
                <div className="card-body position-relative">
                    <div className="row">
                        <div className="col-lg-8">
                            <h3 className="mb-0">Upload to Storage</h3>
                        </div>
                        <div className={"col-lg-4 d-none d-lg-block"}>
                            <Link to={"/storage/all"} className={"btn btn-primary d-block w-100"}>
                                View Files
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <>
                <FileDropper onDropEvent={onHandleDropEvent}/>
            </>

            <Input name={"path"} label={"Path"} onChange={e => setPath(e.currentTarget.value)}/>

            {
                uploads.map(
                    ({name, file, id}) => (
                        <UploadBar path={path}
                                   key={id}
                                   id={id}
                                   name={name}
                                   file={file}
                                   onDelete={id => onHandleDelete(id)}/>
                    )
                )
            }

        </>
    );
};

export default StorageUpload;