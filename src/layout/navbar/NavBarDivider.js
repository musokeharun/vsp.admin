import React from 'react';

const NavBarDivider = ({title}) => {
    return (
        <div className="row navbar-vertical-label-wrapper mt-3 mb-2">
            <div className="col-auto navbar-vertical-label">{title}</div>
            <div className="col ps-0">
                <hr className="mb-0 navbar-vertical-divider"/>
            </div>
        </div>
    );
};

export default NavBarDivider;
