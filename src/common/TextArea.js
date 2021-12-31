import React from "react";

const TextArea = ({name, label, error, ...rest}) => {
    return (
        <div className="form-group mb-3">
            {label && <label htmlFor={name}>{label}</label>}
            <textarea {...rest} name={name} id={name} className="form-control"/>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default TextArea;