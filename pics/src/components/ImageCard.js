import React from 'react';

class ImageCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { spans: 0 };
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        // Define a listener that will invoke setSpans() method for each image as it finishes loading on-screen.
        this.imageRef.current.addEventListener('load', this.setSpans);
    }

    setSpans = () => {
        const imageHeight = this.imageRef.current.clientHeight;
        const spans = Math.ceil(imageHeight / 10);  // 10 matches grid-auto-rows in CSS.
        this.setState({ spans });   // ES6 compact syntax, equivalent to spans: spans.
    }

    render() {
        const { urls, alt_description } = this.props.image;

        return(
            <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
                <img ref={this.imageRef}  src={urls.regular} alt={alt_description} />
            </div>
        );
    }
}

export default ImageCard;