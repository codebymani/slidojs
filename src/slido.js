window.slido = (function(d){
    return function (config) {
        /* to save the instance creating new unique id while initialising */
        var _id;

        if(typeof config === undefined){
            throw new Error("config cannot be undefined");
        }

        if(!Array.isArray(config.images)){
            throw new Error("config.images should contain atleast one image");
        }

        var autoPlay = config && config.autoPlay || false;
        var idleTime = config && config.idleTime || 1000;
        var width = config && config.width || 300;
        var height = config && config.height || 100;
        var images = config && config.images || [];
        var speed = config && config.speed || 1

        /* mounting the instance to dom element with id attribute */
        var mountID = config && config.id;
        var mountElement = d.getElementById(mountID);

         /* create style element and attach to dom */
        function addCss(rule) {
            var css = document.createElement('style');
            css.type = 'text/css';
            if (css.styleSheet) css.styleSheet.cssText = rule; // Support for IE
            else css.appendChild(document.createTextNode(rule)); // Support for the rest
            document.getElementsByTagName("head")[0].appendChild(css);
        }

        /* getting element from dom and start running slider */
        function start(){
    
            var leftButton = d.querySelector(`[data-slido-action-${_id}='left']`);
            var rightButton = d.querySelector(`[data-slido-action-${_id}='right']`);
            var imgs = d.querySelectorAll(`[data-slido-img-${_id}]`);
    
            var offsetWidth = 0;
            var maxWidth = (imgs.length - 2) * width;
            var slidoRoot = d.querySelector(`[data-carousel-${_id}]`);

            slidoRoot.style.setProperty('--slido-width',`${width}px`);
            slidoRoot.style.setProperty('--slido-height',`${height}px`);
            slidoRoot.style.display = 'block';

            function autoplay() {
                setInterval(function(){
                    if(offsetWidth <= maxWidth){
                        slidoRoot.style.setProperty('--toffset',`-${offsetWidth+=width}px`);
                    } else {
                        offsetWidth = 0;
                        slidoRoot.style.setProperty('--toffset',`-${0}px`);
                    }
                },idleTime)
            }
    

            if(autoPlay) {
                autoplay();
            } 

            rightButton.addEventListener("click",function(){
                offsetWidth += width;
                if(offsetWidth <= maxWidth){
                    console.log(offsetWidth);
                    slidoRoot.style.setProperty('--toffset',`-${offsetWidth}px`);
                } else {
                    offsetWidth = 0;
                    slidoRoot.style.setProperty('--toffset',`-${0}px`);
                }
            })

            leftButton.addEventListener("click",function(){
                if(offsetWidth > 0){
                    offsetWidth -= width;
                    slidoRoot.style.setProperty('--toffset',`-${offsetWidth}px`);
                } else {
                    offsetWidth = 0;
                    slidoRoot.style.setProperty('--toffset',`-${0}px`);
                }
            })
        }

        /* generates unique id from date+random */
        function generateUniqueId() {
            _id =  Date.now().toString(36) + Math.random().toString(36).substr(2);
        }

        function buildCSS() {
            var css = `.slido-main-${_id}{
                    --toffset: 0px;
                    --slido-width: 600px;
                    --slido-height: 600px;                    
                    position: relative;
                    display: none;
                    width: var(--slido-width);    
                    transition: all ${speed}s ease;
                }
                
                .slido-main-${_id} > .img-list {
                    position: relative;
                    display: flex;
                    overflow: hidden;
                }
                
                .slido-main-${_id} > .img-list > img {
                    width: var(--slido-width);
                    height: var(--slido-height);
                    object-fit: cover;
                    object-position: center;
                    transition: all ${speed}s ease;
                    transform: translateX(var(--toffset));
                    border-radius: 8px;
                    min-inline-size: -webkit-fill-available;
                }
                
                .slido-main-${_id} > .slido-controls {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: absolute;
                    top: calc(calc(var(--slido-height))/2 - 36px);
                    padding: 20px;
                }
                
                .slido-main-${_id} > .slido-controls > .slido-arrow-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 18px;
                    border: none;
                    outline: none;
                }
                .slido-main-${_id} > .slido-controls > .slido-arrow-btn:focus {
                    width: 36px;
                    height: 36px;
                    border-radius: 18px;
                    border: none;
                }
                .slido-main-${_id} > .slido-controls > .slido-arrow-btn:hover {
                    width: 36px;
                    height: 36px;
                    border-radius: 18px;
                    border: none;
                }
                
                .slido-main-${_id} > .slido-controls > .left-btn:before{
                    content: "◄";
                    text-align: center;
                }
                .slido-main-${_id} > .slido-controls > .right-btn:after{
                    content: "►";
                    text-align: center;
                }
            `
            addCss(css);
        }

        function buildDOM(){
            var html = `<div data-carousel-${_id} class="slido-main-${_id}">
                    <div class="img-list">
                    ${images.map(function(image){
                        return `<img data-slido-img-${_id} src="${image}">`;
                    }).join('')}
                    </div>
                    <div class="slido-controls">
                        <button data-slido-action-${_id}="left" class="slido-arrow-btn left-btn"></button>
                        <button data-slido-action-${_id}="right" class="slido-arrow-btn right-btn"></button>
                    </div>
                </div>`;
            mountElement.innerHTML = html;
        }


        return Object.freeze({
            init: function() {
                generateUniqueId();
                buildCSS();
                buildDOM();
                start();
            }        
        });
    }
}(document));