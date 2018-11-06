// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/*
Canvas base class
*/

class Canvas {
  constructor(canvas, size) {
    this.canvasElt = null;
    this.size = size;
    this.canvasReady = false;

    if (canvas instanceof HTMLCanvasElement) {
      this.canvasElt = canvas;
    } else if (canvas !== null && typeof canvas === 'object' && canvas.elt instanceof HTMLCanvasElement) {
      // Handle p5.js canvas element
      this.canvasElt = canvas.elt;
    }
  }

  async loadVideo() {
    return new Promise((resolve) => {
      this.video = document.createElement('video');
      const stream = this.canvasElt.captureStream();
      this.video.srcObject = stream;
      this.video.width = this.size;
      this.video.height = this.size;
      this.video.autoplay = true;
      this.video.playsinline = true;
      this.video.muted = true;
      const playPromise = this.video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          resolve(this.video);
        });
      }
    });
  }
}

export default Canvas;
