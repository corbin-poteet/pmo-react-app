import React, { Component } from "react";

class PreviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: props.track,
      index: props.index,
    };
  }



  render() {
    const { track } = this.props;

    return (
      <div className="preview-card">
        <img
          className="overlay"
          src={require("./template.png")}
          alt={track.name}
        />
        <img
          className="album-cover"
          src={track.album.images[0].url}
          alt={track.name}
        />
        <div className="preview-card__info">
          <div>
            <p className="track-title">{track.name}</p>
          </div>
          <div>
            <p className="track-artist">{track.artists[0].name}</p>
            <p className="track-album">{track.album.name}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PreviewCard;
