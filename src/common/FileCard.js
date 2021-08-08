import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleRight, faFolder} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

const FileCard = ({title}) => {
    return (
        <div className="card card-sm card-hover-shadow h-100">
            <div className="card-body py-2">
                <div className="d-flex align-items-center justify-content-around h-100">
                    <i className="text-body">
                        <FontAwesomeIcon icon={faFolder}/>
                    </i>
                    <h6 className="card-title fs--1 text-truncate align-middle">{_.replace(title, "/", "").replace("_", " ")}</h6>
                    <div className={"ml-auto float-end"}>
                        <FontAwesomeIcon icon={faArrowAltCircleRight}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileCard;
