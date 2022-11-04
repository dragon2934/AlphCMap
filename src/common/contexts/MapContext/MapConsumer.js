import React from "react";
import {Consumer} from './MapContext';

const MapConsumer = ({children}) => {
    if (children) return <Consumer>{(context) => children(context)}</Consumer>;
    else return null;
};

MapConsumer.propTypes = {};

export default MapConsumer;
