import React from 'react';
import PhoneInput from 'react-phone-input-2';

const MobileInput = ({
    value,
    options,
    name,
    invalid,
    setFieldValue,
    setFieldTouched,
    ...rest
}) => {
    const classNames = ['custom-react-phone-input', 'form-control'];

    if (invalid) classNames.push('is-invalid');

    return (
        <PhoneInput
            type={'number'}
            country={'us'}
            name={name}
            value={value}
            invalid={invalid}
            containerClass={classNames.join(' ')}
            onChange={(value) => setFieldValue(name, value)}
            onBlur={() => setFieldTouched(name)}
            {...rest}
        />
    );
};

export default MobileInput;
