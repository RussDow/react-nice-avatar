import React, { Component } from "react";
import { hot } from "react-hot-loader";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

import ReactNiceAvatar, { genConfig } from "react-nice-avatar/index";

import AvatarEditor from "./AvatarEditor/index";
import AvatarList from "./AvatarList/index";
import Footer from "./Footer/index";

require("./index.scss");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: genConfig({
        isGradient: Boolean(Math.round(Math.random())),
      }),
      shape: "circle",
      name: "",
    };
    this.avatarId = "myAvatar";
  }

  selectConfig(config) {
    this.setState({ config });
  }

  updateConfig(key, value) {
    const { config } = this.state;
    config[key] = value;
    this.setState({ config });
  }

  resetConfig() {
    this.setState({
      config: genConfig({
        isGradient: Boolean(Math.round(Math.random())),
      }),
      name: ""
    });
  }

  updateShape(shape) {
    this.setState({ shape });
  }

  async download() {
    if (this.state.name === "") {
      alert("Enter your name to save your avatar!");
      return;
    }
    const scale = 2;
    const node = document.getElementById(this.avatarId);
    if (node) {
      const blob = await domtoimage.toBlob(node, {
        height: node.offsetHeight * scale,
        style: {
          transform: `scale(${scale}) translate(${
            node.offsetWidth / 2 / scale
          }px, ${node.offsetHeight / 2 / scale}px)`,
          "border-radius": 0,
        },
        width: node.offsetWidth * scale,
      });

      const { name } = this.state;
      saveAs(blob, name + ".png");

      this.resetConfig();
    }
  }

  onInputChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    const { config, shape, name } = this.state;
    return (
      <div className="App flex flex-col min-h-screen p-20">
        <main className="flex-grow h-full w-full bg-white bg-opacity-50 rounded-xl">
          <div className="flex-1 flex flex-col items-center pt-24">
            <div id={this.avatarId} className="mb-10">
              <ReactNiceAvatar
                className="w-64 h-64 highres:w-80 highres:h-80"
                hairColorRandom={true}
                shape={shape}
                {...config}
              />
            </div>
            <input
              className="bg-white bg-opacity-70 w-64 h-10 p-2 mb-10 text-center outline-none z-50 text-black placeholder-gray-900"
              placeholder="Enter name here"
              onChange={this.onInputChange.bind(this)}
              value={name}
            />
            <AvatarEditor
              config={config}
              shape={shape}
              updateConfig={this.updateConfig.bind(this)}
              updateShape={this.updateShape.bind(this)}
              download={this.download.bind(this)}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default hot(module)(App);
