import React from 'react';
import { Image } from 'react-konva';

type URLImageProps = {
  src: string;
  x: number;
  y: number;
};

type URLImageState = {
  image: CanvasImageSource | undefined;
};

class URLImage extends React.Component<URLImageProps, URLImageState> {
  private imageNode: any;
  private image: HTMLImageElement | null = null;

  state: URLImageState = {
    image: undefined,
  };

  componentDidMount() {
    this.loadImage();
  }

  componentDidUpdate(oldProps: URLImageProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }

  componentWillUnmount() {
    if (this.image) {
      this.image.removeEventListener('load', this.handleLoad);
    }
  }

  loadImage() {
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }

  handleLoad = () => {
    // Update state only if the image is not null
    if (this.image) {
      this.setState({
        image: this.image,
      });
    }
  };

  render() {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        image={this.state.image}
        ref={(node) => {
          this.imageNode = node;
        }}
      />
    );
  }
}

export default URLImage;
