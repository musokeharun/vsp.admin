import React from 'react';
import Icon from "../../common/Icon";
import {Link} from "react-router-dom";

const TopBarLink = ({link, icon, badge = 0}) => {
    return (
        <Link
            className="nav-link px-0 notification-indicator notification-indicator-warning notification-indicator-fill rounded-circle"
            to={link}>
            <span data-fa-transform="shrink-7" style={{fontSize: "33px"}}>
                <Icon icon={icon}/>
                <span className="notification-indicator-number">{badge}</span>
            </span>
        </Link>
    );
};

export default TopBarLink;
