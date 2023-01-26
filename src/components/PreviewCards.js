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
        q: "alt j",
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
        <PreviewCard track={tracks[0]} index={0} />
        <PreviewCard track={tracks[1]} index={1} />
        <PreviewCard track={tracks[2]} index={2} />
        <PreviewCard track={tracks[3]} index={3} />
        <PreviewCard track={tracks[4]} index={4} />
      </div>
    );
  }
}

export default PreviewCards;
