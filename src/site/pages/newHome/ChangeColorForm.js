import { MapMarkerUrls } from '../../../constants';
import React, {useState, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Row,
    Col,
    Collapse,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Spinner,
} from 'reactstrap';
import {Link} from 'react-router-dom';
import { changePropertyColor, cancelChangePropertyColor } from '../../../redux/actionCreators/appActionCreators';
import {useHistory} from 'react-router';
const ChangeColorForm = ({callback}) => {

    const utilsData = useSelector((state) => state.utilsData);
    console.log('...utilsData..' + JSON.stringify(utilsData));
    const dispatch = useDispatch();
    const history = useHistory();
    const [color,setColor] = useState('default');

    const handleChange = useCallback((event) => {

        console.log('..handle change ...' + event.target.value);
        setColor(event.target.value);
       
    });
    return (
        <Col md={3} sm={12} xs={12} className="overlay-form-container">
            <Link to={'/'}>
                <img
                    className={'logo-container'}
                    src={'/assets/img/logo-white.png'}
                    alt={'logo'}
                />
            </Link>

         <Row style={{width:"80%",paddingLeft:"70px"}}>

         <Col style={{textAlign:"left"}}>
                <FormGroup tag="fieldset">

                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="addressType"
                                onChange={handleChange}
                                checked={"checked"}
                                value={"default"}
                            />
                            <img src={MapMarkerUrls.property.default} style={{height:"30px"}} />
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="addressType"
                                onChange={handleChange}
                                value={"hasInjured"}
                            />
                            <img src={MapMarkerUrls.property.hasInjured} style={{height:"30px"}} />
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="addressType"
                                onChange={handleChange}
                                value={"pending"}
                            />
                            <img src={MapMarkerUrls.property.pending} style={{height:"30px"}} />
                        </Label>
                    </FormGroup>       
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="addressType"
                                onChange={handleChange}
                                value={"safe"}
                            />
                            <img src={MapMarkerUrls.property.safe} style={{height:"30px"}} />
                        </Label>
                    </FormGroup>  
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="radio"
                                name="addressType"
                                onChange={handleChange}
                                value={"secondary"}
                            />
                            <img src={MapMarkerUrls.property.secondary} style={{height:"30px"}} />
                        </Label>
                    </FormGroup>   
                </FormGroup>  
            </Col>     
        </Row>
        <Row>
            <Col>        
                     

                    <Button
                    className="mt-1 mb-5"
                    color={'success'}
                    block
                    onClick={() => {
                        const data = {
                            email: utilsData.emailForChangeColor,
                            color: color
                        };
                        utilsData.changeColor = false;
                        dispatch(changePropertyColor(data)).then(resp=>{
                            console.log('...change color..' + JSON.stringify(resp));
                            callback(true);
                            // history.push("/");
                        })
                        .catch(error=>{
                            callback(false);
                            console.log('...change color error..' + JSON.stringify(error));
                        })
                    }}>
                    Confirm
                </Button>
            </Col> 
            <Col>
                <Button
                    className="mt-1 mb-5"
                    color={'danger'}
                    block
                    onClick={() => {
                        // const data = {
                        //     email: utilsData.emailForChangeColor,
                        //     color: color
                        // };
                        utilsData.changeColor = false;
                        dispatch(cancelChangePropertyColor());
                    }}>
                    Cancel
                </Button>
              </Col>

                
            </Row>
        </Col>
    );
};
export default ChangeColorForm;