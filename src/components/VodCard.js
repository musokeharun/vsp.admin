import React from 'react';

const VodCard = ({title, image, thumbnail, subTitle, category, quality, desc, duration, rating, imdb, year, status}) => {
    return (
        <div className="card bg-dark text-white overflow-hidden light" style={{maxWidth: "30rem"}} title={desc}>
            <div className="card-img-top">
                <img className="img-fluid h-48 overflow-visible rounded-3xl"
                     style={{minHeight: "300px", maxHeight: "300px", objectFit: "cover", minWidth: "100%"}}
                     src={image}
                     alt="Card image"/>
            </div>
            <div className="card-img-overlay d-flex align-items-end opacity-0 hover:opacity-100">
                <div className={"relative w-full h-3/4"}>
                    <div className={"absolute bottom-0 right-0"}>
                        <div className="avatar avatar-4xl">
                            <img className="rounded-soft" style={{maxHeight: "100px"}}
                                 src={thumbnail}
                                 alt=""/>
                        </div>
                    </div>
                    <div className={"absolute top-0 right-0"}>
                        <div className={"bg-primary rounded-sm px-1"}>
                            {category}
                        </div>
                        <p className={"bg-danger rounded px-1 text-center my-1"}>
                            {quality}
                        </p>
                    </div>
                    <div className={"absolute bottom-0 left-0"}>
                        <h4 className="card-title text-white text-decoration-underline">{title}</h4>
                        <h5 className="text-white">{subTitle}</h5>
                        <h6 className="card-title text-gray-300">{duration} mins</h6>
                        <h6 className="card-title text-gray-400">{status}</h6>
                        <div className="d-flex flex-row w-full">
                            <span className="badge badge-soft-primary me-md-2 me-1" title={"Rating"}>{rating}</span>
                            <span className="badge badge-soft-info" title={"IMDB"}>{imdb}</span>
                            <span className="badge badge-soft-secondary mx-md-2 mx-1" title={"Year"}>{year}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VodCard;
