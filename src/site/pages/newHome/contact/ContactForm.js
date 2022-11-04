import {useFormik} from 'formik';
import React, {useCallback, useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
    Alert,
    Button,
    Col,
    Form,
    FormFeedback,
    Input,
    InputGroup,
    Row,
} from 'reactstrap';
import * as Yup from 'yup';
import {sendContactForm} from '../../../../redux/actionCreators/appActionCreators';
import {toastr} from 'react-redux-toastr';
// import {
//     GoogleReCaptchaProvider,
//     GoogleReCaptcha
//   } from "react-google-recaptcha-v3"

const validationSchema = Yup.object({
    name: Yup.string().required('This field is required'),
    email: Yup.string()
        .email('Email address is not valid')
        .required('This field is required'),
    phone: Yup.string().required('This field is required'),
    message: Yup.string().required('This field is required'),
});
const SITE_KEY = "6Ldf8uUdAAAAAFk2BsP18xvLR5CdEJ6b0O528oSH";

const ContactForm = () => {
    const [alert, setAlert] = useState(false);
    const dispatch = useDispatch();

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [message,setMessage] = useState('');

    // const formik = useFormik({
    //     initialValues: {
    //         name: '',
    //         email: '',
    //         phone: '',
    //         message: '',
    //     },
    //     validationSchema,
    //     validateOnBlur: true,
    //     onSubmit: (values) => {
    //         // submitHelpForm(values);
    //     },
    // });
    const [token, setToken] = useState();

    // const { executeRecaptcha } = useGoogleReCaptcha();

    // const [token, setToken] = useState();
    // Create an event handler so you can call the verification on button click event or form submit
    // const handleReCaptchaVerify = useCallback(async (values) => {
    //     if (!executeRecaptcha) {
    //         console.log('Execute recaptcha not yet available');
    //         return;
    //     }

    //     const token = await executeRecaptcha('yourAction');
    //     // Do whatever you want with the token
    //     // dispatch(sendContactForm(values))
    //     // .then(() => {
    //     //     formik.resetForm();
    //     //     setAlert(!alert);
    //     // })
    //     // .finally(() => {});
    // }, [alert, dispatch, formik]);

    // const handleOnClick = e => {
    //     e.preventDefault();
    //     setLoading(true);
    //     window.grecaptcha.ready(() => {
    //       window.grecaptcha.execute(SITE_KEY , { action: 'submit' }).then(token => {
    //         // submitData(token);
    //         values['token'] = token;
    //         dispatch(sendContactForm(values))
    //         .then(() => {
    //             formik.resetForm();
    //             setAlert(!alert);
    //         })
    //         .finally(() => {});

    //       });
    //     });
    // }
    // useEffect(() => {
    //     const loadScriptByURL = (id, url, callback) => {
    //       const isScriptExist = document.getElementById(id);
    
    //       if (!isScriptExist) {
    //         var script = document.createElement("script");
    //         script.type = "text/javascript";
    //         script.src = url;
    //         script.id = id;
    //         script.onload = function () {
    //           if (callback) callback();
    //         };
    //         document.body.appendChild(script);
    //       }
    
    //       if (isScriptExist && callback) callback();
    //     }
    
    //     // load the script by passing the URL
    //     loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`, function () {
    //       console.log("Script loaded!");
    //     });
    //   }, []);
      const [loading, setLoading] = useState(false);

    // const submitHelpForm = useCallback(
    //     (values) => {
    //         handleReCaptchaVerify(values);
    //     },
    //     [],
    // );
    function validateEmail (emailAdress)
    {
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailAdress.match(regexEmail)) {
        return true; 
      } else {
        return false; 
      }
    }
    const handleOnSubmit = e => {
        e.preventDefault()
        const form = e.target
        // setServerState({ submitting: true })
        setLoading(true);
        const data = {
            name,
            email,
            phone,
            message
        }
        //checking email and phone
        if(email === null || email === undefined || !validateEmail(email) ){
            toastr.error("Error!","Please enter a valid e-mail address");
            setLoading(false);
            return;
        }
        if(phone === null || phone === undefined || phone.length<6){
            toastr.error("Error!","Please enter a valid phone number");
            setLoading(false);
            return;       
        }
        
        console.log(data, "data");
        dispatch(sendContactForm(data))
        .then((resp) => {
            // formik.resetForm();
            console.log('return ...' + JSON.stringify(resp));
            if(resp.value.success){
                setAlert(!alert);
                // toastr.success("Message Sent!","Your message has been sent, thanks for contact us!");
            }else{
                toastr.error("Error!","Message send failed!");
            }
            
        })
        .finally(() => {
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
            setLoading(false);
        });
        // axios({
        //   method: "post",
        //   url: "https://getform.io/f/b22f10be-75a6-40c0-9ec6-3519dc38fe29",
        //   data
        // })
        //   .then(r => {
        //     handleServerResponse(true, "Thanks!", form)
        //   })
        //   .catch(r => {
        //     handleServerResponse(false, r.response.data.error, form)
        //   })
    }
    // const {
    //     values,
    //     touched,
    //     errors,
    //     handleChange,
    //     handleBlur,
    //     handleSubmit,
    // } = formik;

    return (
       
        <div>
            <p className="text-muted">
                Please feel free to contact us for more information
            </p>
            <Alert
                color="success"
                isOpen={alert}
                toggle={() => setAlert(!alert)}>
                Your message has been sent. We will get in touch with you soon.
            </Alert>
            <Form className="help-Form" onSubmit={handleOnSubmit}>
                <InputGroup className="mb-3">
                    <Input
                        type="text"
                        placeholder="Name"
                        name={'name'}
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        // onBlur={handleBlur}
                        // invalid={touched.name && errors.name}
                    />
                    {/* <FormFeedback>{errors.name}</FormFeedback> */}
                </InputGroup>

                <InputGroup className="mb-3">
                    <Input
                        type="text"
                        placeholder="Email"
                        name={'email'}
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        // onBlur={handleBlur}
                        autoComplete="email"
                        // invalid={touched.email && errors.email}
                    />
                    {/* <FormFeedback>{errors.email}</FormFeedback> */}
                </InputGroup>
                <InputGroup className="mb-3">
                    <Input
                        type="text"
                        placeholder="Mobile Phone"
                        name={'phone'}
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                        // onBlur={handleBlur}
                        autoComplete="phone"
                        // invalid={touched.phone && errors.phone}
                    />
                    {/* <FormFeedback>{errors.phone}</FormFeedback> */}
                </InputGroup>

                <Input
                    type="textarea"
                    name={'message'}
                    id="textarea-input"
                    rows="5"
                    placeholder="Message..."
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    // onBlur={handleBlur}
                    // invalid={touched.message && errors.message}
                />
                {/* <FormFeedback>{errors.message}</FormFeedback> */}
            {/* <Row>
                <Col>
                <GoogleReCaptcha
                    onVerify={token => {
                        setToken(token)
                    }}
                    />
                </Col>
            </Row> */}
                <Row className="contact-us-submit-container">
                    <Col>
                        <Button
                            type={'submit'}
                            outline
                            block
                            disabled={loading}
                            className="float-right my-3">
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>

    );
};

export default ContactForm;
