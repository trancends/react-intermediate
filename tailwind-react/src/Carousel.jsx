import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["https://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleClickEvent = (event) => {
    return this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="flex items-center justify-between p-4">
        <img className="lg h-96 rounded" src={images[active]} alt="animal" />
        <div className="flex h-48 w-7/12 items-start justify-evenly">
          {/* eslint-disable-next-line */}
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              src={photo}
              alt="animal thumbnail"
              key={photo}
              className={
                index === active
                  ? "h-20 rounded-full border-2 border-indigo-700 opacity-50"
                  : "h-20 rounded-full border-2 border-indigo-700"
              }
              onClick={this.handleClickEvent}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
