import React from "react";
import axios from "axios";

class ResourceList extends React.Component {
    state = { resources: [] };

    async componentDidMount() {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/${this.props.resource}`);
        this.setState({ resources: response.data });
    }

    async componentDidUpdate(prevProps) {
        // Avoid endless loop by only calling setState() if we are dealing with different props.
        if (prevProps.resource !== this.props.resource) {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/${this.props.resource}`);
            this.setState({ resources: response.data });
        }
    }

    render() {
        return <div>{this.state.resources.length}</div>;
    }
}

export default ResourceList;
