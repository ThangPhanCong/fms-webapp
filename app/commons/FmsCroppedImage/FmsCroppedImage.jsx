import React from 'react';
import ReactDom from 'react-dom';
import $ from "jquery";

class FmsCroppedImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: null,
            timeVideo: null
        }
    }

    onLoad() {
        let image = ReactDom.findDOMNode(this.refs.image);
        let image_wrapper = ReactDom.findDOMNode(this.refs.image_wrapper);
        let width = image.clientWidth;
        let height = image.clientHeight;
        let style = {};
        // if (width > height) {
        //     style = {height: 100 + "%"};
        // } else {
        //     style = {width: 100 + "%"};
        // }
        if (image_wrapper.clientWidth / image_wrapper.clientHeight > width / height) {
            style = {width: 100 + "%"};
        } else {
            style = {height: 100 + "%"};
        }
        this.setState({style: style});
    }

    render() {
        let className = this.props.className || "";
        let style = this.state.style || {};
        let styleWrapper = {height: this.props.height, width: this.props.width};
        return (
            <div className={"cropped-image-wrapper " + className} style={styleWrapper} ref="image_wrapper">
                {this.props.src.includes("video") ?
                    <div>
                        <video name="video" id={this.props.id} className="cropped-image" src={this.props.src}
                               style={{height: "124px"}}
                        />
                    </div> :
                    <img ref="image" className="cropped-image" src={this.props.src} onLoad={this.onLoad.bind(this)}
                         style={style}/>}
            </div>
        );
    }
}

export default FmsCroppedImage;