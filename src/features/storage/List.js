import React, {useEffect, useState} from 'react';
import Http, {API_URL} from "../../services/http";
import FileCard from "../../common/FileCard";

const StorageList = ({name = "Movie File"}) => {

    const [list, setList] = useState([])

    useEffect(() => {
        const fetch = async () => {
            let {data} = await Http.post(API_URL + "upload/resume/list");
            setList(data);
        };
        fetch().then()
    }, []);


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

            <div className={"row mb-3"}>
                {
                    list && !!list.length &&
                    list.map(({name}, index) =>
                        (<div className={"col-md-4 py-md-2"} key={index}>
                            <FileCard title={name}/>
                        </div>))
                }
            </div>

        </>
    );
};

export default StorageList;


