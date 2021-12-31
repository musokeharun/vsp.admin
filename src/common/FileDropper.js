import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import cloud from "../assets/cloud-upload.svg";
import classNames from "classnames";

const FileDropper = ({onDropEvent}) => {

    const onDropAccepted = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            onDropEvent(file.name, file);
            //console.log(file.name, file);
            // const reader = new FileReader()
            // reader.onabort = () => console.log('file reading was aborted')
            // reader.onerror = () => console.log('file reading has failed')
            // reader.onload = () => {
            //     const binaryStr = reader.result
            //     console.log(reader, file, binaryStr)
            // }
            // reader.readAsArrayBuffer(file);
        })
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDropAccepted: onDropAccepted,
        autoProcessQueue: false
    });

    return (
        <div className={classNames("card card-body p-0 my-md-2 my-1 bg-transparent", {"bg-gray-100": isDragActive})}>
            <div {...getRootProps({className: "dropzone"})}
                 className="dropzone dropzone-single p-0 dz-clickable border-primary">
                <div className="dz-preview dz-preview-single"/>
                <input {...getInputProps()} />
                <div className="dz-message" data-dz-message="data-dz-message">
                    <div className="dz-message-text mx-auto text-center">
                        <img className="mx-auto" src={cloud} width="25" alt=""/>
                        <span className={"fw-bolder text-black h4"}>Drop the file here</span>
                        <div className={"container"}>
                            <p className={"text-muted text-center my-md-2 my-1"}>OR</p>
                            <button className={"btn btn-outline-google-plus "}>
                                Explore Files
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileDropper;
