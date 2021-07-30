import React from 'react';
import logo from "../assets/logo.png";
import {Link} from "react-router-dom";
import NavBarLink from "./navbar/NavBarLink";
import {
    faCalendarAlt,
    faCashRegister,
    faCloudDownloadAlt,
    faCloudUploadAlt,
    faCommentAlt,
    faCubes,
    faDatabase, faFileContract, faFilter, faVideo
} from "@fortawesome/free-solid-svg-icons";
import NavBarDivider from "./navbar/NavBarDivider";

const NavBar = () => {
    return (
        <nav className="navbar navbar-light navbar-vertical navbar-expand-xl">
            <div className="d-flex align-items-center">
                <div className="toggle-icon-wrapper">
                    <button className="btn navbar-toggler-humburger-icon navbar-vertical-toggle"
                            data-bs-toggle="tooltip" data-bs-placement="left" title="Toggle Navigation">
                        <span className="navbar-toggle-icon"><span className="toggle-line"/></span>
                    </button>
                </div>
                <Link className="navbar-brand" to="">
                    <div className="d-flex align-items-center py-3">
                        <img className="me-2" src={logo} alt="Logo" width="40"/>
                        <span className="font-sans-serif">Admin</span>
                    </div>
                </Link>
            </div>
            <div className="collapse navbar-collapse" id="navbarStandard">
                <div className="navbar-vertical-content scrollbar">
                    <ul className="navbar-nav flex-column mb-3" id="navbarVerticalNav">
                        <li className="nav-item">
                            <NavBarDivider title={"Overview"}/>
                        </li>
                        <li className="nav-item">
                            <NavBarLink link={"/dashboard"} icon={faCubes} title={"DashBoard"}/>
                        </li>

                        <li className="nav-item">
                            <NavBarDivider title={"App"}/>
                        </li>

                        <li className="nav-item">
                            <NavBarLink link={"/app/chat"} icon={faCommentAlt} title={"Chat"}/>
                        </li>

                        <li className="nav-item">
                            <NavBarLink link={"/app/payments"} icon={faCashRegister}
                                        title={"Payments & Subscriptions"}/>
                        </li>

                        <li className="nav-item">
                            <NavBarLink link={"/app/events"} icon={faCalendarAlt} title={"Events"}/>
                        </li>

                        <li className="nav-item">
                            <NavBarDivider title={"Content"}/>
                        </li>

                        <li className="nav-item">
                            <NavBarLink link={"/content/categories"} icon={faFilter} title={"Categories"}/>
                        </li>

                        <li className="nav-item">
                            <NavBarLink link={"/content/genres"} icon={faFileContract} title={"Genres"}/>
                        </li>
                        <li className="nav-item">
                            <NavBarLink link={"/content/movies"} icon={faVideo} title={"Movies"}/>
                        </li>

                        <li className="nav-item">
                            <NavBarDivider title={"Storage"}/>
                        </li>
                        <li className="nav-item">
                            <NavBarLink link={"/storage/all"} icon={faDatabase} title={"All"}/>
                        </li>
                        <li className="nav-item">
                            <NavBarLink link={"/storage/upload"} icon={faCloudUploadAlt} title={"Upload"}/>
                        </li>
                        <li className="nav-item">
                            <NavBarLink link={"/storage/download"} icon={faCloudDownloadAlt} title={"Download"}/>
                        </li>
                    </ul>
                    <div className="settings mb-3">
                        <div className="card alert p-0 shadow-none" role="alert">
                            <div className="card-body text-center">
                                <div className="d-grid" title={"New Movie"}>
                                    <Link className={"btn btn-sm btn-outline-primary"} to={"/content/upload"}>
                                        Upload
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
