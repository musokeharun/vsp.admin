import React from 'react';
import logo from "../assets/logo.png";
import {Link} from "react-router-dom";
import NavBarLink from "./navbar/NavBarLink";
import {faDatabase, faUpload} from "@fortawesome/free-solid-svg-icons";
import TopBarLink from "./topbar/TopBarLink";

const TopBar = () => {
    return (
        <nav className="navbar navbar-light navbar-glass navbar-top navbar-expand-xxl">
            <button className="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button"
                    data-bs-toggle="collapse" data-bs-target="#navbarStandard" aria-controls="navbarStandard"
                    aria-expanded="false" aria-label="Toggle Navigation"><span className="navbar-toggle-icon">
                <span className="toggle-line"/></span>
            </button>
            <Link className="navbar-brand me-1 me-sm-3" to={"/"}>
                <div className="d-flex align-items-center">
                    <img className="me-2" src={logo} alt="Logo" width="40"/>
                    <span className="font-sans-serif">Admin</span>
                </div>
            </Link>
            <div className="collapse navbar-collapse scrollbar d-md-none">
                <ul className="navbar-nav">
                    <li className={"nav-item"}>
                        <NavBarLink link={"/"} title={"DashBoard"} icon={faDatabase}/>
                    </li>
                </ul>
            </div>
            <ul className="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
                <li className={"nav-item me-3"}>
                    <TopBarLink link={"/uploads"} icon={faUpload}/>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link pe-0" id="navbarDropdownUser" href="#"
                       role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                       aria-expanded="false">
                        <div className="avatar avatar-xl">
                            <img className="rounded-circle" src={logo} alt="User"/>
                        </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end py-0" aria-labelledby="navbarDropdownUser">
                        <div className="bg-white dark__bg-1000 rounded-2 py-2">
                            <Link className="dropdown-item" to={"/profile"}>Profile &amp; account</Link>
                            <div className="dropdown-divider"/>
                            <Link className="dropdown-item" to={"/settings"}>Settings</Link>
                            <Link className="dropdown-item" to={"/logout"}>Logout</Link>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default TopBar;
