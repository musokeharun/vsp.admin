import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCategoriesAsync, selectCategories, updateCategory} from "./categorySlice";
import classNames from "classnames";
import Icon from "../../common/Icon";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {v1} from "uuid";
import PageHeader from "../../common/pageHeader";
import _ from "lodash";

const Category = ({history}) => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchCategoriesAsync(page));
    }, [])

    const handleUpdate = (id, isActive) => {
        console.log("Clicked", id);
        const params = {
            id,
            form: {isActive: !isActive ? 1 : 0}
        }
        dispatch(updateCategory(params))
    }

    // console.log("Categories", [...categories].sort((a, b) => b.priority - a.priority));
    return (
        <Fragment>
            <PageHeader title={"Categories"} btn={"Add"} btnHandler={e => history.replace("/content/category/add")}/>
            <div className="table-responsive scrollbar">
                <table className="table table-hover overflow-hidden table-sm">
                    <thead className={"bg-gray-200 text-white"}>
                    <tr className={"text-black"}>
                        <th scope="col">Name</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Desc</th>
                        <th scope="col">Status</th>
                        <th className={"text-end text-gray-50"}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        !!categories && !!categories.length && [...categories].sort((a, b) => b.priority - a.priority).map(
                            ({name, desc, isActive, updatedAt, image, objectId, priority}) => (
                                <tr key={v1()} className="align-middle cursor-pointer">
                                    <td className="text-nowrap">
                                        <div className="d-flex align-items-center">
                                            {!!image &&
                                            <div className="avatar avatar-xl">
                                                <img className="rounded-circle" src={image} alt={desc}/>
                                            </div>
                                            }
                                            <div className="ms-2 font-bold">{name}</div>
                                        </div>
                                    </td>
                                    <td className="text-nowrap">{priority}</td>
                                    <td className="text-nowrap" title={desc}>{_.truncate(desc, {
                                        length: 30,
                                        separator: "ellipsis"
                                    })}</td>
                                    <td>
                                        <span className={classNames("badge badge rounded-pill d-block p-2", {
                                            "badge-soft-success": isActive, "badge-soft-danger": !isActive
                                        })}>
                                            {isActive ? "Active" : "Disabled"}
                                            <span className="ms-1 fas fa-check" data-fa-transform="shrink-2"/>
                                        </span>
                                    </td>
                                    {/*<td className="">{getDateTimeFromSql(updatedAt).toFormat("ff")}</td>*/}
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

export default Category;
