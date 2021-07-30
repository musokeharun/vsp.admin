import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Icon = ({className, icon}) => {
    return (
        <FontAwesomeIcon icon={icon} className={className}/>
    );
};

export default Icon;
