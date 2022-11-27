import * as Yup from 'yup';

// export const propertySchema = Yup.object().shape({
//     address: Yup.string().required('This field is required'),
//     area: Yup.string().required('This field is required'),
//     serial_no: Yup.string().required('This field is required'),
//     acreage: Yup.string().required('This field is required'),
// });

export const propertySchema = Yup.object().shape({
    primaryAddress: Yup.boolean()
        .required()
        .oneOf([true], 'This field is required'),
    addressType: Yup.string().when([],{
        is: (hightRiseOrCommercial) => hightRiseOrCommercial===false,
        then: Yup.string().required('This field is required'),
    }),
    // settlementType: Yup.string().required('This field is required'),
    // unitNo: Yup.string().when(['settlementType','hightRiseOrCommercial'], {
    //     is: (settlementType,hightRiseOrCommercial) => settlementType === 'highRise' && !hightRiseOrCommercial,
    //     then: Yup.string().required('This field is required'),
    // }),
    propertyName: Yup.string().when(['addressType','hightRiseOrCommercial'], {
        is: (addressType,hightRiseOrCommercial) => (addressType === 'Incorporate' || addressType==='School') && !hightRiseOrCommercial,
        then: Yup.string().required('This field is required'),
    }),
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