import React, {Fragment} from 'react';
import classNames from "classnames";
import {v1} from "uuid";

const CheckBox = ({options, handleChange, name, type = "radio", current, row = true}) => {
    // console.log("Checked", current)

    let _name = v1();

    return (
        <div className={classNames("d-flex justify-content-center p-0 m-0", {"flex-column": !row})}>
            {
                options &&
                options.length &&
                options.map(({label, value}, index) =>
                    <Fragment key={index}>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                   type={type} name={name || _name}
                                   onChange={e => {
                                       e.preventDefault();
                                       handleChange(e.currentTarget.value)
                                   }}
                                   value={value || label}
                                   checked={current === value || current === label}
                            />
                            <label className="form-check-label">
                                {label || value}
                            </label>
                        </div>
                    </Fragment>
                )
            }
        </div>
    );
};

export default CheckBox;
