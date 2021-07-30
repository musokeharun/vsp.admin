import React from 'react';
import {NavLink} from "react-router-dom";
import Icon from "../../common/Icon";

const NavBarLink = ({icon, title, link}) => {
    return (
        <NavLink className="nav-link" to={link} role="button">
            <div className="d-flex align-items-center">
                <span className="nav-link-icon">
                 <Icon icon={icon}/>
                </span>
                <span className="nav-link-text ps-1">{title}</span></div>
        </NavLink>
    );
};

export default NavBarLink;
