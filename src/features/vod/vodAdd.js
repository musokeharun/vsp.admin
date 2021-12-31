import React, {Fragment, useRef, useState} from 'react';
import PageHeader from "../../common/pageHeader";
import Input from "../../common/Input";
import AppSelect from "../../common/AppSelect";
import CheckBox from "../../common/CheckBox";
import CreatableAppSelect from "../../common/CreatableAppSelect";
import TextArea from "../../common/TextArea";
import AsyncAppSelect from "../../common/AsyncAppSelect";
import {API_URL} from "../../services/http";
import FileDropper from "../../common/FileDropper";
import {filePreview} from "../../utils/filePreview";
import $ from "jquery";
import {useDispatch} from "react-redux";
import {addVod} from "./vodSlice";

const qualityOptionsValues = [
    {value: '720p', label: '720p'},
    {value: '480p', label: '480p'},
    {value: '360p', label: '360p'}
];
const statusOptions = [
    {value: "AVAILABLE", label: "AVAILABLE"},
    {value: "SOON", label: "SOON"},
    {value: "DELETED", label: "DELETED"},
    {value: "DISABLED", label: "DISABLED"},
];

const VodAdd = ({history}) => {

    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [qualityOptions, setQualityOptions] = useState([]);
    const [released, setReleased] = useState("");
    const [rating, setRating] = useState(0);
    const [pg, setPg] = useState("");
    const [duration, setDuration] = useState(0);
    const [imdb, setImdb] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [actors, setActors] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("");
    //SERIES
    const [isSeries, setIsSeries] = useState(false);
    const [episode, setEpisode] = useState("");
    const [season, setSeason] = useState("");
    const [nextVod, setNextVod] = useState(null);
    const [prevVod, setPrevVod] = useState(null);
    //RELATED
    const [packages, setPackages] = useState(null);
    const [genres, setGenres] = useState(null);
    const [path, setPath] = useState("");
    const [category, setCategory] = useState("");
    //CONTENT
    const [image, setImage] = useState(null);
    const [thumbNail, setThumbNail] = useState(null);
    const [shortVideo, setShortVideo] = useState(null);

    const dispatch = useDispatch();

    const formRef = useRef(null);

    const getValuesFromArray = (array) => {
        // console.log(array);
        if (!array) return "";
        if (!Array.isArray(array) && array.value) {
            return array.value;
        }
        if (!array.length) {
            return ""
        }
        return array.reduce((acc, curr) => `${acc},${curr.value}`, "").trim().substr(1)
    };

    const handleSubmit = () => {
        let form = $(formRef.current);
        let validity = form.get(0).checkValidity();
        console.log("Validity", validity);
        if (validity) {
            console.log(form.serializeArray());
            const formData = {
                title,
                subTitle,
                qualityOptions: getValuesFromArray(qualityOptions),
                released,
                rating,
                pg,
                duration,
                imdbRating: imdb,
                actors: getValuesFromArray(actors),
                directors: getValuesFromArray(directors),
                desc,
                isSeries: isSeries ? 1 : 0,
                isActive: isActive ? 1 : 0,
                packages: getValuesFromArray(packages),
                genres: getValuesFromArray(genres),
                category: getValuesFromArray(category),
                path: getValuesFromArray(path),
                status: getValuesFromArray(status)
            };
            if (isSeries) {
                if (!episode || !season) {
                    alert("Please more series' fields");
                    return
                }
                formData.episode = episode;
                formData.season = season;
                formData.nextVod = getValuesFromArray(nextVod);
                formData.prevVod = getValuesFromArray(prevVod);
            }
            const saved = new FormData();
            for (let x in formData) {
                saved.append(x, formData[x]);
            }

            if (!image || !thumbNail) {
                alert("Please more content fields");
                return
            }
            saved.append("image", image);
            saved.append("thumbnail", thumbNail);
            saved.append("trailer", shortVideo);
            console.log(formData);


            dispatch(addVod(saved));
            // console.log(form.serializeArray())
        } else alert("Please more fields")

    };


    return (
        <Fragment>
            <PageHeader title={"Add Vod"} btn={"All"} btnHandler={e => history.replace("/content/vod")}/>
            <form ref={formRef} onSubmit={e => e.preventDefault()}>
                <div className={"row"}>

                    <div className={"col-12"}>
                        <h6 className={"text-muted underline mt-4"}>Basics</h6>
                    </div>

                    <div className={"col-md-6"}>
                        <Input
                            required name={"title"} value={title} label={"Title"}
                            onChange={e => setTitle(e.currentTarget.value)}
                        />
                    </div>
                    <div className={"col-md-6"}>
                        <Input
                            required name={"subTitle"} value={subTitle} label={"Sub Title"}
                            onChange={e => setSubTitle(e.currentTarget.value)}
                        />
                    </div>
                    <div className={"col-md-5"}>
                        <AppSelect
                            required
                            label={"Quality Options"} isMulti options={qualityOptionsValues}
                            onChange={(e) => {
                                setQualityOptions(e)
                            }}
                        />
                    </div>
                    <div className={"col-md-2"}>
                        <Input
                            required name={"released"}
                            type={"number"} min={1900} step={1} value={released}
                            label={"Released  Year"}
                            onChange={e => setReleased(e.currentTarget.value)}
                        />
                    </div>
                    <div className={"col-md-2"}>
                        <Input
                            type={"number"} min={0} max={10} step={0.1}
                            required name={"rating"} value={rating} label={"Rating"}
                            onChange={e => setRating(e.currentTarget.value)}
                        />
                    </div>
                    <div className={"col-md-3"}>
                        <Input
                            required name={"PG"} value={pg} label={"PG"}
                            onChange={e => setPg(e.currentTarget.value)}
                        />
                    </div>
                    <div className={"col-md-6"}>
                        <Input
                            type={"number"} min={0}
                            required name={"duration"} value={duration} label={"Duration (minutes)"}
                            onChange={e => setDuration(e.currentTarget.value)}
                        />
                    </div>
                    <div className={"col-md-6"}>
                        <Input
                            type={"number"} min={0} max={10} step={0.1}
                            required name={"imdb"} value={imdb} label={"IMDB Rating"}
                            onChange={e => setImdb(e.currentTarget.value)}
                        />
                    </div>

                    <div className={"col-12"}>
                        <h6 className={"text-muted underline mt-4"}>Availability</h6>
                    </div>
                    <div className={"col-6 flex flex-col justify-center items-center"}>
                        <label className={"text-muted mb-3"}>Usage Status</label>
                        <CheckBox
                            name={"isActive"}
                            options={[{
                                label: "Active", value: true
                            }, {
                                label: "Disabled", value: false
                            }]}
                            current={isActive}
                            handleChange={e => setIsActive(!isActive)}
                        />
                    </div>
                    <div className={"col-6"}>
                        <AppSelect
                            required
                            onChange={e => setStatus(e)}
                            options={statusOptions}
                            label={"Status"}
                            name={"status"}/>
                    </div>

                    <div className={"col-12"}>
                        <h6 className={"text-muted underline mt-4"}>Relation</h6>
                    </div>
                    <div className={"col-md-6 mb-3"}>
                        <AsyncAppSelect
                            required
                            label={"Category"}
                            name={"category"}
                            url={`${API_URL}categories/select`}
                            onChange={setCategory}
                        />
                    </div>
                    <div className={"col-md-6 mb-3"}>
                        <AsyncAppSelect
                            required
                            label={"Genres"}
                            name={"genre"}
                            url={`${API_URL}genres/select`}
                            onChange={setGenres}
                            isMulti
                        />
                    </div>
                    <div className={"col-md-6 mb-3"}>
                        <AsyncAppSelect
                            label={"Packages"}
                            name={"package"}
                            url={`${API_URL}packages/select`}
                            onChange={setPackages}
                            isMulti
                        />
                    </div>
                    <div className={"col-md-6 mb-3"}>
                        <AsyncAppSelect
                            required
                            label={"Path"}
                            name={"path"}
                            url={`${API_URL}storage/select`}
                            onChange={setPath}
                        />
                    </div>

                    <div className={"col-12"}>
                        <h6 className={"text-muted underline mt-4"}>Others</h6>
                    </div>
                    <div className={'col-6'}>
                        <CreatableAppSelect isMulti name={"actors"} label={"Actors"} onChange={setActors}/>
                    </div>
                    <div className={'col-6'}>
                        <CreatableAppSelect isMulti name={"directors"} label={"Directors"} onChange={setDirectors}/>
                    </div>
                    <div className={"col-12"}>
                        <TextArea
                            required
                            name={"desc"}
                            label={"Synopsis"}
                            rows={3}
                            value={desc}
                            onChange={e => setDesc(e.currentTarget.value)}
                        />
                    </div>

                    <div className={"col-12"}>
                        <h6 className={"text-muted underline mt-4"}>Series Related</h6>
                    </div>
                    <div className={"col-12 flex flex-col justify-center items-center"}>
                        <label className={"text-muted mb-3"}>Is Series / Soap / Continuation</label>
                        <CheckBox
                            name={"isSeries"}
                            options={[{
                                label: "Yes", value: true
                            }, {
                                label: "No", value: false
                            }]}
                            current={isSeries}
                            handleChange={e => setIsSeries(!isSeries)}
                        />
                    </div>
                    <div className={"col-md-6"}>
                        <Input
                            type={"number"} step={1}
                            name={"season"} value={season} label={"Season"}
                            onChange={e => setSeason(e.currentTarget.value)}
                        />
                    </div>
                    <div className={"col-md-6"}>
                        <Input
                            type={"number"} step={1}
                            name={"episode"} value={episode} label={"Episode"}
                            onChange={e => setEpisode(e.currentTarget.value)}
                        />
                    </div>
                    <div className={"col-md-6 mb-3"}>
                        <AsyncAppSelect
                            label={"Prev Vod"}
                            name={"prev"}
                            url={`${API_URL}vods/select`}
                            onChange={setPrevVod}
                        />
                    </div>
                    <div className={"col-md-6 mb-3"}>
                        <AsyncAppSelect
                            label={"Next Vod"}
                            name={"vod"}
                            url={`${API_URL}vods/select`}
                            onChange={setNextVod}
                        />
                    </div>
                    <div className={"col-12"}>
                        <h6 className={"text-muted underline mt-4"}>Content</h6>
                    </div>
                    <div className={"col-6"}>
                        <label className={"text-muted"}>Image</label>
                        <div className={"bg-origin-padding bg-cover bg-center"} id={"image-preview"}>
                            <FileDropper onDropEvent={(name, file) => {
                                filePreview("#image-preview", file, true);
                                setImage(file);
                            }}/>
                        </div>
                    </div>
                    <div className={"col-6"}>
                        <label className={"text-muted"}>Thumbnail</label>
                        <div className={"bg-origin-padding bg-cover bg-center"} id={"thumb-preview"}>
                            <FileDropper onDropEvent={(name, file) => {
                                filePreview("#thumb-preview", file, true);
                                setThumbNail(file);
                            }}/>
                        </div>
                    </div>
                    <div className={"col-12 relative"}>
                        <label className={"text-muted"}>Short Video</label>
                        <video id={"video-preview"} controls={false} autoPlay={true}
                               className={"absolute top-0 left-0 h-100 w-100"}/>
                        <div className={""}>
                            <FileDropper onDropEvent={(name, file) => {
                                filePreview("#video-preview", file, false, true);
                                setShortVideo(file);
                            }}/>
                        </div>
                    </div>
                    <div className={"col-12"}>
                        <button className={"btn btn-primary"} onClick={e => handleSubmit()}>Submit</button>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};

export default VodAdd;
