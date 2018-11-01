import React, { Component } from 'react';
import Navigation from "./components/Navigation/Navigation";
import Clarifai from 'clarifai';
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import Rank from "./components/Rank/Rank"
import FaceRecog from "./components/FaceRecog/FaceRecog";
import Particles from 'react-particles-js';
// eslint-disable-next-line
import tachyons from "tachyons";
import './App.css';


const app = new Clarifai.App({
 apiKey: 'b7b02d185dd4421d8aab87b09142e893'
});


const particlesOption = {
                particles: {
                 number: {
                  value: 137, 
                  density: {
                    enable: true,
                    value_area: 800
                  }
                 }
                }
             }
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  calculateFaceLocation = (data) => {
    const clarifyData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifyData.left_col * width,
      topRow: clarifyData.top_row * height,
      rightCol: width - (clarifyData.right_col * width),
      bottomRow: height - (clarifyData.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, 
                      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
}
  render() {
    return (
      <div className="App">
        <Particles className = "particles" params={particlesOption}/>
  
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm 
        onInputChange = {this.onInputChange}
        onButtonSubmit = {this.onButtonSubmit}/>
        <FaceRecog imageUrl = {this.state.imageUrl}
        box = {this.state.box} 
        />
      </div>
    );
  }
}

export default App;
