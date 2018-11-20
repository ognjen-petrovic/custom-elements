(function(){

customElements.define('hz-img-magnifier-glass',
    class extends HTMLElement {
      constructor() {
        super();

        this.style.display= 'block';
        this.style.position = 'relative';

        this.glass = document.createElement("div");
        Object.assign(this.glass.style, {
            position: 'absolute',
            cursor: 'none',
            backgroundRepeat: 'no-repeat'
        })

        this._bw = 3;
        this._zoom = this.zoom;

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(this.glass);
    };
  
    connectedCallback(){
        this.img = this.firstElementChild;
        this.shadowRoot.appendChild(this.firstElementChild)

        this.glass.addEventListener("mousemove", e => this._moveMagnifier(e));
        this.img.addEventListener("mousemove", e => this._moveMagnifier(e));
        /*and also for touch screens:*/
        //this.glass.addEventListener("touchmove", moveMagnifier);
        //this.img.addEventListener("touchmove", moveMagnifier);

        this.glass.style.backgroundImage = "url('" + this.img.src + "')";
        this.glass.style.backgroundSize = (this.img.offsetWidth * this.zoom) + "px " //+ (this.img.offsetHeight * this.zoom);

        Object.assign(this.glass.style, {
            width:  this.size,
            height: this.size,
            border: this.border,
            'border-radius': this.borderRadius,
        })
        this._w = this.glass.offsetWidth / 2;
        this._h = this.glass.offsetHeight / 2;
    };

    _moveMagnifier(e) {
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = this._getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /*prevent the magnifier glass from being positioned outside the image:*/
        if (x > this.img.offsetWidth - (this._w / this._zoom)) { x = this.img.offsetWidth - (this._w / this._zoom); }
        if (x < this._w / this._zoom) { x = this._w / this._zoom; }
        if (y > this.img.offsetHeight - (this._h / this._zoom)) { y = this.img.offsetHeight - (this._h / this._zoom); }
        if (y < this._h / this._zoom) { y = this._h / this._zoom; }
        /*set the position of the magnifier glass:*/
        this.glass.style.left = (x - this._w) + "px";
        this.glass.style.top = (y - this._h) + "px";
        /*display what the magnifier glass "sees":*/
        this.glass.style.backgroundPosition = "-" + ((x * this._zoom) - this._w + this._bw) + "px -" + ((y * this._zoom) - this._h + this._bw) + "px";
    }

    _getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = this.img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }

    get borderRadius() {
        return this._getAttributeAsProperty('border-radius', '50%');
    }

    get border() {
        return this._getAttributeAsProperty('border', '3px solid black');
    }

    get size() {
        return this._getAttributeAsProperty('size', this.img.offsetWidth/3 + 'px');
    }

    get zoom() {
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