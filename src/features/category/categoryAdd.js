import React, {useEffect, useState} from 'react';
import PageHeader from "../../common/pageHeader";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import FileDropper from "../../common/FileDropper";
import CheckBox from "../../common/CheckBox";
import $ from "jquery";
import _ from "lodash";
import {filePreview} from "../../utils/filePreview";
import {useDispatch} from "react-redux";
import {add, addCategory} from "./categorySlice";

const CategoryAdd = ({history, location}) => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [priority, setPriority] = useState(5);
    const [isActive, setIsActive] = useState(true);
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e);
        // let array = $(e.currentTarget).serializeArray();
        // console.log("Form", array);
        // console.log("Image", image);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("desc", desc);
        formData.append("priority", Number(priority));
        formData.append("isActive", isActive ? 1 : 0);
        if (image)
            formData.append("image", image);

        formData.forEach(((value, key) => {
            console.log(value, key);
        }))

        dispatch(addCategory(formData))
    }

    useEffect(() => {
        return () => {
            if (image)
                filePreview($("#preview"), image)
        };
    }, [image]);


    return (
        <div className={"container-fluid"}>
            <PageHeader title={"Add Category"} btn={"All"} btnHandler={e => history.replace("/content/category")}/>
            <form onSubmit={e => e.preventDefault()}>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <Input required name={"name"} value={name} label={"Name"}
                               onChange={e => setName(e.currentTarget.value)}/>
                    </div>
                    <div className={"col-6"}>
                        <Input required name={"priority"} type={"number"} max={10} min={0} step={1} value={priority}
                               label={"Priority"}
                               onChange={e => setPriority(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <TextArea
                            required
                            name={"desc"}
                            label={"Description"}
                            rows={3}
                            value={desc}
                            onChange={e => setDesc(e.currentTarget.value)}
                        />
                    </div>
                    <div className={"col-6 flex flex-col justify-center items-center"}>
                        <label className={"h1 font-bold"}>Status</label>
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

                    <div className={"col-md-10"}>
                        <FileDropper onDropEvent={(name, file) => setImage(file)}/>
                    </div>

                    <div className={"col-md-2 pt-2"}>
                        <div className="avatar avatar-4xl">
                            <img id={"preview"} className="rounded-soft" src=""
                                 alt={image && _.truncate(image.name, {length: 10})}/>
                        </div>
                    </div>

                    <div className={"col-12 my-2"}>
                        <button className={"btn btn-primary w-full"} onClick={e => {
                            handleSubmit(e);
                        }}>
                            Submit
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default CategoryAdd;