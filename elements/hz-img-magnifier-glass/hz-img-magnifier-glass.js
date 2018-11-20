(function(){

customElements.define('hz-img-magnifier-glass',
    class extends HTMLElement {
      constructor() {
        super();

        var img, glass, w, h, bw;
        /*
        img = document.getElementById(imgID);
        glass = document.createElement("div");
        glass.setAttribute("class", "img-magnifier-glass");
        img.parentElement.insertBefore(glass, img);
        glass.style.backgroundImage = "url('" + img.src + "')";
        glass.style.backgroundRepeat = "no-repeat";
        console.log(img.offsetHeight);
        glass.style.backgroundSize = (img.offsetWidth * zoom) + "px " + (img.offsetHeight * zoom) + "px";
        bw = 3;
        w = glass.offsetWidth / 2;
        h = glass.offsetHeight / 2;
*/
        this.style.display= 'block';
        this.style.position = 'relative';
        this.glass = document.createElement("div");
        Object.assign(this.glass.style, {
            position: 'absolute',
            cursor: 'none',
            backgroundRepeat: 'no-repeat'
        })

        this._bw = 3;

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.glass);
    };
  
    connectedCallback(){
        this.img = this.firstElementChild;
        this.shadowRoot.appendChild(this.firstElementChild)

        this.glass.addEventListener("mousemove", e => this._moveMagnifier(e));
        this.img.addEventListener("mousemove", e => this._moveMagnifier(e));

        this.glass.style.backgroundImage = "url('" + this.img.src + "')";
        this.glass.style.backgroundSize = (this.img.offsetWidth * this.zoom) + "px " //+ (this.img.offsetHeight * this.zoom);
        Object.assign(this.glass.style, {
            width:  this.size,
            height: this.size,
            border: '3px solid ' + this.color,
            'border-radius': '50%',
        })
        this.w = this.glass.offsetWidth / 2;
        this.h = this.glass.offsetHeight / 2;
    };

    _moveMagnifier(e) {
        var w = this.w;
        var img = this.img;
        var zoom = this.zoom;
        var h = this.h;
        var glass = this.glass;
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = this._getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /*prevent the magnifier glass from being positioned outside the image:*/
        if (x > img.offsetWidth - (w / zoom)) { x = img.offsetWidth - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > img.offsetHeight - (h / zoom)) { y = img.offsetHeight - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }
        /*set the position of the magnifier glass:*/
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /*display what the magnifier glass "sees":*/
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + this._bw) + "px -" + ((y * zoom) - h + this._bw) + "px";
    }

    _getCursorPos(e) {
        var img = this.img;
        var a, x = 0, y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }

    get color() {
        return this._getAttributeAsProperty('color', 'black');
    }

    get size()
    {
        return this._getAttributeAsProperty('size', this.img.offsetWidth/3 + 'px');

    }

    get zoom()
    {
        return this._getAttributeAsProperty('zoom', 3);

    }

    _getAttributeAsProperty(propertyName, defaultPropertyValue) {
        if (this.hasAttribute(propertyName))
        {
            return this.getAttribute(propertyName);
        }
        else
        {
            return defaultPropertyValue;
        }        
    }
  
})
})();