import React from 'react';
import Select from "react-select";

const AppSelect = ({label, options, name, ...others}) => {
    return (
        <div className={"form-group mb-3"}>
            {label && <label htmlFor={name}>{label}</label>}
            <Select name={name} options={options} {...others} />
        </div>
    );
};

export default AppSelect;
