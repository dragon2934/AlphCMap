import {createContext} from 'react';

const MapContext = createContext(null);
const Provider = MapContext.Provider;
const Consumer = MapContext.Consumer;

export {Provider};
export {Consumer};
export default MapContext;
