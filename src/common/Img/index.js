import React from 'react';

/**
 * 图片加载失败就显示默认图片
 */
class Img extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: this.props.imageUrl
    };
  }

  handleImageLoaded() {

  }

  handleImageErrored() {
    console.log(1111);
    this.setState({
      imageUrl: this.props.defaultImg
    });
  }

  render() {
    return (
      <img style={this.props.style}
           src={this.state.imageUrl}
           onLoad={this.handleImageLoaded.bind(this)}
           onError={this.handleImageErrored.bind(this)}
           alt={this.props.alt}
      />
    );
  }
}

export default Img;
