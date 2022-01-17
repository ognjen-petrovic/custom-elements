(function () {
    
    customElements.define('bulma-button',
        class extends HTMLElement {
            constructor() {
                super();
                this.style.position = 'relative'
                this.style.overflow = 'hidden'
                this.attachShadow({mode: 'open'});
            };

            connectedCallback()
            {
                this.p = document.createElement('a');
                this.p.classList.add('button')
                this.p.classList.add('is-black')
                this.p.innerText = this.firstChild.data.trim();
                this.shadowRoot.append(this.p);
            }

        }
    )
})();