import {Select} from 'antd';
import React from "react";

const AntdSelect = ({
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
        <Select
            showSearch
            allowClear
            name={name}
            value={value}
            className={classNames.join(' ')}
            onChange={(value) => setFieldValue(name, value)}
            onBlur={() => setFieldTouched(name)}
            {...rest}>
            {options.map((o) => (
                <Select.Option
                    key={o.value}
                    value={o.value}
                    alt={o.label}
                    title={o.label}>
                    {o.label}
                </Select.Option>
            ))}
        </Select>
    );
};

export default AntdSelect;
