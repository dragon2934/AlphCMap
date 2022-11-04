import React from "react";
import MapConsumer from './MapConsumer';

function withMap(WrappedComponent) {
    // eslint-disable-next-line react/display-name
    return (props) => {
        return (
            <MapConsumer>
                {(context) => <WrappedComponent {...props} {...context} />}
            </MapConsumer>
        );
    };
}

export default withMap;
