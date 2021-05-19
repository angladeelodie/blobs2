const {
  ipcRenderer
} = require("electron");

import {
  spline
} from 'https://cdn.skypack.dev/@georgedoescode/spline@1.0.1';
import SimplexNoise from 'https://cdn.skypack.dev/simplex-noise@2.4.0';

// our <path> element
const path = document.querySelector("path");
// used to set our custom property values
const root = document.documentElement;
var noiseStep = 0.001;
//const robot = require("robotSjs");
class App {
  constructor() {
    this.hueNoiseOffset = 0;
    this.simplex;
    this.points = [];
    // this.noiseStep = 0.005;
    this.hueNoiseOffset = 0;


    this.initBlob();
    this.initListeners();
    this.initLoop();

  }

  initBlob() {
    this.simplex = new SimplexNoise();
    this.points = this.createPoints();
  }

  createPoints() {
    //  this.points = [];
    // how many points do we need
    const numPoints = 5;
    // used to equally space each point around the circle
    const angleStep = (Math.PI * 2) / numPoints;
    // the radius of the circle
    const rad = 75;

    for (let i = 1; i <= numPoints; i++) {
      // x & y coordinates of the current point
      const theta = i * angleStep;

      const x = 100 + Math.cos(theta) * rad;
      const y = 100 + Math.sin(theta) * rad;

      // store the point
      this.points.push({
        x: x,
        y: y,
        /* we need to keep a reference to the point's original {x, y} coordinates 
        for when we modulate the values later */
        originX: x,
        originY: y,
        // more on this in a moment!
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
      });
    }

    return this.points;

  }

  initLoop() {
    requestAnimationFrame((this.animate.bind(this)));
  }



  animate() {
    //console.log(this.points);
    
    path.setAttribute('d', spline(this.points, 1, true));


    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i];

      // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
      const nX = this.noise(point.noiseOffsetX, point.noiseOffsetX);
      const nY = this.noise(point.noiseOffsetY, point.noiseOffsetY);
      // map this noise value to a new value, somewhere between it's original location -10 and it's original location + 10
      const x = this.map(nX, -1, 1, point.originX - 10, point.originX + 10);
      const y = this.map(nY, -1, 1, point.originY - 10, point.originY + 10);

      // update the point's current coordinates
      point.x = x;
      point.y = y;

      // progress the point's x, y values through "time"
      point.noiseOffsetX += noiseStep;
      point.noiseOffsetY += noiseStep;

      console.log(noiseStep);
    }

    const hueNoise = this.noise(this.hueNoiseOffset, this.hueNoiseOffset);
    const hue = this.map(hueNoise, -1, 1, 0, 360);

    root.style.setProperty("--startColor", `hsl(${hue}, 100%, 75%)`);
    root.style.setProperty("--stopColor", `hsl(${hue + 60}, 100%, 75%)`);
    document.body.style.background = `hsl(${hue + 60}, 75%, 5%)`;

    this.hueNoiseOffset += noiseStep / 6;

    requestAnimationFrame(() => this.animate());


  }

  initListeners() {
    ipcRenderer.on("messageDiscord", this.onMessage.bind(this));
    // ipcRenderer.on("messageEmbedDiscord", this.onMessageEmbed.bind(this));
  }


  onMessage(event, message) {

  }

  map(n, start1, end1, start2, end2) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  }
  noise(x, y) {
    // return a value at {x point in time} {y point in time}
    return this.simplex.noise2D(x, y);
  }

}


window.onload = () => {
  new App();
};

document.querySelector('path').addEventListener('mouseover', () => {
  // window.setInterval(function () {
    
  noiseStep = 0.01;
  console.log(noiseStep)
  // }, 250);
});

document.querySelector('path').addEventListener('mouseleave', () => {
  console.log("mouse leave")
  noiseStep = 0.005;
});