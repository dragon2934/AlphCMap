import React, {Component} from 'react';
import {Provider} from './MapContext';

class MapProvider extends Component {
    static propTypes = {};

    static defaultProps = {};

    state = {
        map: null,
        setMap: (map) => {
            this.setState({
                map,
            });
        },
        disabled: false,
        setDisabled: (value) =>
            this.setState({
                disabled: value,
            }),
        clearContext: async () => {
            await this.setState(() => {
                return {};
            });
        },
    };

    render() {
        const {children} = this.props;
        return <Provider value={this.state}>{children}</Provider>;
    }
}

export default MapProvider;
