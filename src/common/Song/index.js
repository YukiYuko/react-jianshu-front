import React from "react";
import ReactAplayer from "react-aplayer";
import songs from "../../api/songs";
class Song extends React.Component {
  state = {
    list: []
  };

  componentDidMount() {
    this.getSongs();
  }

  // 获取歌单信息
  getSongs = () => {
    songs.list().then(res => {
      // this.setState({
      //   list: res.data
      // })
      if (res.data.length) {
        let audio = res.data.map((item) => ({
          name: item.name,
          artist: item.artist,
          url: item.url,
          cover: item.cover,
          theme: "#fb415f"
        }));
        this.ap.list.add(audio);
      }
    });
  };
  // event binding example
  onPlay = () => {
  };
  onPause = () => {
  };
  // example of access aplayer instance
  onInit = ap => {
    this.ap = ap;
  };
  render() {
    let props = {
      theme: "#F57F17",
      lrcType: 3,
      fixed: true,
      mini: true,
      audio:[]
    };
    return (
      <ReactAplayer
        {...props}
        onInit={this.onInit}
        onPlay={this.onPlay}
        onPause={this.onPause}
      />
    );
  }
}
export default Song;
