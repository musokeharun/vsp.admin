import React from 'react';
import classNames from "classnames";

const Progress = ({completed = false, width = "5"}) => {
    return (
        <div className="progress mb-3 rounded-3" style={{height: "10px"}}>
            <div
                className={classNames("progress-bar border-end border-white border-2", {
                    "bg-progress-gradient progress-bar-striped progress-bar-animated": !completed,
                    "bg-success": completed
                })}
                role="progressbar" style={{width: `${width}%`, transition: "width 0.9s ease"}} aria-valuenow={width}
                aria-valuemin="0"
                aria-valuemax="100"
            />
        </div>
    );
};

export default Progress;
