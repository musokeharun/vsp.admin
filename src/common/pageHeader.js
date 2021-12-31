import React from 'react';

const PageHeader = ({btn, title, btnHandler}) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="row flex-between-center">
                    <div className="col-md">
                        <h5 className="mb-2 mb-md-0">{title}</h5>
                    </div>
                    <div className="col-auto">
                        {
                            !!btn && (
                                <button onClick={e => btnHandler(e)} className="btn btn-falcon-primary btn-sm"
                                        role="button">
                                    {btn}
                                </button>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
