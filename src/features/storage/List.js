import React from 'react';

const StorageList = ({name = "Movie File"}) => {
    return (
        <>
            <div className="card mb-3">
                <div className="bg-holder d-none d-lg-block bg-card"/>
                <div className="card-body position-relative">
                    <div className="row">
                        <div className="col-lg-8">
                            <h3 className="mb-0">Stored Files</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StorageList;
