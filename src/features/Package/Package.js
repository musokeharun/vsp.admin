import React, {Fragment, useEffect, useState} from 'react';
import PageHeader from "../../common/pageHeader";
import {useDispatch, useSelector} from "react-redux";
import {fetchPackages, selectPackages, updatePackage} from "./packageSlice";
import {v1} from "uuid";
import classNames from "classnames";
import Icon from "../../common/Icon";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

const Package = ({history}) => {

    const dispatch = useDispatch();
    const packages = useSelector(selectPackages);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchPackages(page));
    }, [])

    const handleUpdate = (id, isActive) => {
        console.log("Clicked", id);
        const params = {
            id,
            form: {isActive: !isActive ? 1 : 0}
        }
        dispatch(updatePackage(params))
    }
    return (
        <Fragment>
            <PageHeader title={"Packages"} btn={"Add"} btnHandler={e => history.replace("/app/package/add")}/>
            <div className="table-responsive scrollbar">
                <table className="table table-hover overflow-hidden table-sm">
                    <thead className={"bg-gray-200 text-white"}>
                    <tr className={"text-black"}>
                        <th scope="col">Name</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Devices</th>
                        <th scope="col">Concurrent</th>
                        <th scope="col">Limit</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Description</th>
                        {/*<th scope="col">Created</th>*/}
                        <th scope="col">Status</th>
                        <th className={"text-end text-gray-50"}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        !!packages && !!packages.length && [...packages].sort((i, j) => i.amount - j.amount).map(
                            ({
                                 name,
                                 amount,
                                 deviceCount,
                                 concurrent,
                                 limit,
                                 duration,
                                 desc,
                                 createdAt,
                                 isActive,
                                 objectId
                             }) => (
                                <tr key={v1()} className="align-middle cursor-pointer">
                                    <td className="text-nowrap">{name}</td>
                                    <td className="text-nowrap">{Number(amount).toLocaleString()}</td>
                                    <td className="text-nowrap">{deviceCount}</td>
                                    <td className="text-nowrap">{concurrent}</td>
                                    <td className="text-nowrap">{limit}</td>
                                    <td className="text-nowrap">{duration}</td>
                                    <td className="text-nowrap">{desc}</td>
                                    {/*<td className="text-nowrap">{DateTime.fromISO(createdAt).toFormat("ff")}</td>*/}
                                    <td>
                                        <span className={classNames("badge badge rounded-pill d-block p-2", {
                                            "badge-soft-success": isActive, "badge-soft-danger": !isActive
                                        })}>
                                            {isActive ? "Active" : "Disabled"}
                                            <span className="ms-1 fas fa-check" data-fa-transform="shrink-2"/>
                                        </span>
                                    </td>
                                    <td>
                                        <div className={"float-right"}>
                                            <button
                                                className="btn p-0" type="button" title="Edit">
                                                <Icon icon={faEdit} className={"text-gray-300"}/>
                                            </button>
                                            <button className="btn p-0 ms-2" title="Delete" onClick={e => {
                                                e.preventDefault();
                                                handleUpdate(objectId, isActive)
                                            }}>
                                                <Icon icon={faTrash} className={"text-red-700"}/>
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};

export default Package;
