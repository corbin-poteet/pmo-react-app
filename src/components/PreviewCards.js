import React, { Component } from "react";
import axios from "axios";
import PreviewCard from "./PreviewCard";

class PreviewCards extends Component {
  state = {
    tracks: [],
    isLoading: true,
  };

  getTracks = async () => {
    const { token } = this.props;
    if (!token) {
      alert("You need to login first");
    }
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: "paramore",
        type: "track",
      },
    });

    this.setState({ tracks: data.tracks.items, isLoading: false });
  };

  componentDidMount() {
    this.getTracks();
  }

  render() {
    const { tracks, isLoading } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }


    return (
      <div id="swiper">
        <PreviewCard track={tracks[0]} audioObject={this.props.audioObject} />
      </div>
    );
  }
}

export default PreviewCards;
