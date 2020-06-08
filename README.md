# slido.js
slido is a lightweight weight minimalistic image slider with no dependencies and no styling required. 
<p align="center">
  <img  src="assets/demo.gif">
</p>

### [Demo](https://codebymani.github.io/slidojs)
### Installation
- [Download the latest release.](https://github.com/codebymani/slidojs/archive/master.zip)
- Clone the repo: `git clone https://github.com/codebymani/slidojs.git`

Injecting minified script directly to the browser as 5.64KB (minified) and 1.67KB (gzip)
```javascript
  
  <div id="slido-demo"></div>
  
  <script src="slido.min.js"></script>
  <script>
    window.onload = function(){
        var demo = slido({
            autoPlay: true,
            idleTime: 3000, // inMilliSeconds
            width: 800, //inPixels
            height: 350, //inPixels
            speed: 1, //inSeconds
            images: ['assets/01.jpg','assets/02.jpg','assets/01.jpg'],
            id:'slido-demo' // id-selector
        })
        demo.init();
   };
  </script>
```
