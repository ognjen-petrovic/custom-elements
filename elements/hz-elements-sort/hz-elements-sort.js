(function () {
    const template = document.createElement('template');

    template.innerHTML = `  
      <slot></slot>
    `;

    customElements.define('hz-elements-sort',
        class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({mode: 'open'});
                this.shadowRoot.appendChild(template.content.cloneNode(true));
            };

            connectedCallback()
            {
                let children = Array.from(this.children);
                this._sort(children);
            }

            appendChild(element)
            {
                let children = Array.from(this.children);
                children.push(element)
                this._sort(children);
            }    

            _sort(elements)
            {
                var by = this.by;

                elements.sort(function(a, b){
                    if (a[by] < b[by])
                        return -1;

                    if (a[by] > b[by])
                        return 1;

                    return 0;
                });

                if (this.descending)
                {
                    elements.reverse();
                }

                this.append(...elements)
            }

            get descending()
            {
                return this.hasAttribute('descending');
            }

            get by()
            {
                return this._getAttributeAsProperty('by', 'innerText');
            }

            _getAttributeAsProperty(propertyName, defaultPropertyValue) {
                if (this.hasAttribute(propertyName)) {
                    return this.getAttribute(propertyName);
                }
                else {
                    return defaultPropertyValue;
                }
            }

            static get observedAttributes() { return ['descending', 'by']; }

            attributeChangedCallback(name, oldValue, newValue) {
                switch(name)
                {
                    case 'descending':
                    case 'by':
                        this._sort(Array.from(this.children));
                    break;
                }
            }

        }
    )
})();