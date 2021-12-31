import React, {Fragment, useEffect, useState} from 'react';
import PageHeader from "../../common/pageHeader";
import {useDispatch, useSelector} from "react-redux";
import {fetchVods, selectVods} from "./vodSlice";
import VodCard from "../../components/VodCard";

const Vod = ({history}) => {

    const vods = useSelector(selectVods);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchVods(page));
    }, []);

    const handlePageChange = (newPage) => {
        if (!newPage) return;
        setPage(newPage);
        dispatch(fetchVods(page));
    };

    return (
        <Fragment>
            <PageHeader title={"Vods"} btn={"Add"} btnHandler={e => history.replace("/content/vod/add")}/>
            <div className={"row"}>
                {
                    !!vods && !!vods.length && vods.map((vod, index) => (
                        <div className={"col-md-6 mb-3"} key={index}>
                            <VodCard
                                desc={vod.desc}
                                quality={vod.qualityOptions.split(",")[0]}
                                category={vod?.Category?.name}
                                title={vod.title}
                                subTitle={vod.subTitle}
                                image={vod.image}
                                thumbnail={vod.thumbnail}
                                duration={vod.duration}
                                rating={vod.rating}
                                imdb={vod.imdbRating}
                                year={vod.released}
                                status={vod.status}
                            />
                        </div>
                    ))
                }
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button className="page-link" onClick={e => {
                            e.preventDefault();
                            handlePageChange(page - 1)
                        }}
                        >Previous
                        </button>
                    </li>
                    <li className={"page-item"}>
                        <button className={"page-link"}>{page}</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link" onClick={e => {
                            e.preventDefault();
                            handlePageChange(page + 1)
                        }}>Next
                        </button>
                    </li>
                </ul>
            </nav>
        </Fragment>
    );
};

export default Vod;