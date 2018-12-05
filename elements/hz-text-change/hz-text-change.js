(function () {
    
    const template = document.createElement('template');

    template.innerHTML = `  
      <style>
      @keyframes in {
        from {
            top: -100%;
        }

        to {
            top: 0%;
        }
    }

    @keyframes out {
        from {
            top: 0px;
        }

        to {
            top: 100px;
        }
    }
      </style>
    `;

    customElements.define('hz-text-change',
        class extends HTMLElement {
            constructor() {
                super();
                this.style.position = 'relative'
                this.style.overflow = 'hidden'
                this.attachShadow({mode: 'open'});
                this.shadowRoot.appendChild(template.content.cloneNode(true));
            };

            connectedCallback()
            {
                this.p = document.createElement('div');
                this.p.innerText = this.firstChild.data.trim();
                this.p.style.visibility = 'hidden'
                this.shadowRoot.append(this.p);
                this._createCurrentElement(this.firstChild.data.trim());
            }

            _createCurrentElement(text)
            {
                if (typeof this.currentElement != 'undefined')
                {
                    this.currentElement.remove();
                }

                this.currentElement = document.createElement('div');
                this.currentElement.innerText = text;
                this.currentElement.style.position = 'absolute';
                this.currentElement.style.top = '0%';
                this.currentElement.style.animationDuration = '1s';
                this.currentElement.style.animationFillMode = 'forwards';
                this.shadowRoot.append(this.currentElement)                
            }

            _createNextElement(text)
            {
                if (typeof this.nextElemet != 'undefined')
                {
                    this._createCurrentElement(this.nextElemet.innerText)
                    this.nextElemet.remove();
                }

                this.nextElemet = document.createElement('div');
                this.nextElemet.innerText = text;
                this.nextElemet.style.position = 'absolute';
                this.nextElemet.style.top = '-100%';
                this.nextElemet.style.animationDuration = '1s';
                this.nextElemet.style.animationFillMode = 'forwards';
                this.shadowRoot.append(this.nextElemet);
            }
            
            _change(p2)
            {
                p2.style.animationName = 'in';
                this.currentElement.style.animationName = 'out';
            }

            set innerText(text)
            {  
                this._createNextElement(text);
                this.p.innerText = text;
                this._change(this.nextElemet)
            }

        }
    )
})();