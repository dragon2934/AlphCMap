import * as Yup from 'yup';

export const propertySchema = Yup.object().shape({
    address: Yup.string().required('This field is required'),
    area: Yup.string().required('This field is required'),
    serial_no: Yup.string().required('This field is required'),
    acreage: Yup.string().required('This field is required'),
});

export const additionalPropertySchema = Yup.object().shape({
    addressType: Yup.string().when([],{
        is: (hightRiseOrCommercial) => hightRiseOrCommercial===false,
        then: Yup.string().required('This field is required'),
    }),
    settlementType: Yup.string().required('This field is required'),
    unitNo: Yup.string().when(['settlementType'], {
        is: (settlementType) => settlementType === 'highRise',
        then: Yup.string().required('This field is required'),
    }),
});