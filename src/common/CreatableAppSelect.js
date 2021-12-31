import React, {Component, Fragment} from 'react';
import CreatableSelect from 'react-select/creatable';

export default class CreatableAppSelect extends Component {

    render() {
        const {options, onChange, label, name, ...others} = this.props;
        return (
            <Fragment>
                {label && <label htmlFor={name}>{label}</label>}
                <CreatableSelect
                    {...others}
                    isClearable
                    name={name}
                    onChange={onChange}
                    options={options || []}
                />
            </Fragment>

        );
    }
}