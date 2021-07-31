import React from 'react';
import classNames from "classnames";

const Progress = ({completed, width = "5"}) => {
    return (
        <div className="progress mb-3 rounded-3" style={{height: "10px"}}>
            <div
                className={classNames("progress-bar bg-progress-gradient border-end border-white border-2")}
                role="progressbar" style={{width: `${width}%`, transition: "width 0.9s ease"}} aria-valuenow={width}
                aria-valuemin="0"
                aria-valuemax="100"
            />
        </div>
    );
};

export default Progress;
