import {AutoComplete} from 'antd';
import React from "react";

const AntdAutoComplete = ({
    value,
    options,
    name,
    invalid,
    setFieldValue,
    setFieldTouched,
    ...rest
}) => {
    const classNames = ['antd-custom-select', 'form-control'];

    if (invalid) classNames.push('is-invalid');

    return (
        <AutoComplete
            showSearch
            allowClear
            backfill={true}
            filterOption={(inputValue, option) => {
                if (!inputValue) return true;
                return option.value
                    .toLowerCase()
                    .includes(inputValue.toString().toLowerCase());
            }}
            name={name}
            value={value}
            className={classNames.join(' ')}
            onChange={(value) => setFieldValue(name, value)}
            onBlur={() => setFieldTouched(name)}
            {...rest}>
            {options.map((o) => (
                <AutoComplete.Option key={o}>{o}</AutoComplete.Option>
            ))}
        </AutoComplete>
    );
};

export default AntdAutoComplete;
