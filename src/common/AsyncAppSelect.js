import React, {Component, Fragment} from 'react';
import AsyncSelect from 'react-select/async';
import http from "../services/http";

export default class AsyncAppSelect extends Component {

    promiseOptions = (inputValue, callback) => {
        const {url} = this.props;
        // call api
        http.get(`${url}?q=${inputValue}&starts=true`)
            .then(({data}) => {
                console.log(data);
                callback(data);
            });
    }

    render() {
        const {name, label, url, onChange, ...others} = this.props;

        return (
            <Fragment>
                {label && <label htmlFor={name}>{label}</label>}
                <AsyncSelect
                    {...others}
                    isClearable
                    name={name}
                    onChange={onChange}
                    cacheOptions
                    defaultOptions
                    loadOptions={this.promiseOptions}
                />
            </Fragment>
        );
    }
}