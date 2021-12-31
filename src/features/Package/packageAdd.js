import React, {Fragment, useState} from 'react';
import PageHeader from "../../common/pageHeader";
import {useDispatch} from "react-redux";
import {addPackage} from "./packageSlice";
import Input from "../../common/Input";
import CheckBox from "../../common/CheckBox";
import TextArea from "../../common/TextArea";

const PackageAdd = ({history}) => {

    const [name, setName] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [deviceCount, setDeviceCount] = useState(0);
    const [concurrent, setConcurrent] = useState(0);
    const [limit, setLimit] = useState(0);
    const [duration, setDuration] = useState(0);
    const [desc, setDesc] = useState("");
    const [amount, setAmount] = useState(0);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e);
        // let array = $(e.currentTarget).serializeArray();
        // console.log("Form", array);
        // console.log("Image", image);

        const formData = {
            name,
            amount: Number(amount),
            desc,
            deviceCount: Number(deviceCount),
            concurrent: Number(concurrent),
            limit: Number(limit),
            duration: Number(duration),
            isActive: isActive ? 1 : 0
        }

        dispatch(addPackage(formData))
    }

    return (
        <Fragment>
            <PageHeader title={"Add Package"} btn={"All"} btnHandler={e => history.replace("/app/package")}/>

            <form onSubmit={e => e.preventDefault()}>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <Input required name={"name"} value={name} label={"Name"}
                               onChange={e => setName(e.currentTarget.value)}/>
                    </div>
                    <div className={"col-6"}>
                        <Input required name={"deviceCount"} type={"number"} min={0} step={1}
                               value={deviceCount}
                               label={"Device Count"}
                               onChange={e => setDeviceCount(e.currentTarget.value)}/>
                    </div>
                    <div className={"col-6"}>
                        <Input required name={"concurrent"} type={"number"} min={0} step={1}
                               value={concurrent}
                               label={"Concurrent"}
                               onChange={e => setConcurrent(e.currentTarget.value)}/>
                    </div>
                    <div className={"col-6"}>
                        <Input required name={"limit"} type={"number"} min={0} step={1}
                               value={limit}
                               label={"Limit ( Movies ) "}
                               onChange={e => setLimit(e.currentTarget.value)}/>
                    </div>
                    <div className={"col-6"}>
                        <Input required name={"duration"} type={"number"} min={0} step={1}
                               value={duration}
                               label={"Duration ( Hours ) "}
                               onChange={e => setDuration(e.currentTarget.value)}/>
                    </div>
                    <div className={"col-6"}>
                        <Input required name={"amount"} type={"number"} min={0} step={100}
                               value={amount}
                               label={"Amount"}
                               onChange={e => setAmount(e.currentTarget.value)}/>
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
                    <div className={"col-12 my-2"}>
                        <button className={"btn btn-primary w-full"} onClick={e => {
                            handleSubmit(e).then(r => {
                                console.log(r);
                            });
                        }}>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};

export default PackageAdd;
