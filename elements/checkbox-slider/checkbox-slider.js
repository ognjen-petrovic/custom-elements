const style = `
:host {
    --panel-width: 60px;
    --panel-height: 34px;
    --panel-color: red;
    --panel-color-checked: green;
    --switch-color: white;
    position: relative;
    display: inline-block;
    width: var(--panel-width);
    height: var(--panel-height);
    background-color: var(--panel-color);
    cursor: pointer;
    transition: background-color 1s ease-out;
}

:host:before {
    position: absolute;
    content: "";
    height: calc(var(--panel-height) - 8px);
    width: calc(var(--panel-height) - 8px);
    left: 4px;
    top: 4px;
    background-color: var(--switch-color);
    transition: .4s;
}

:host([checked]){
    background-color: var(--panel-color-checked);
}

:host([checked]):before {
    transform: translateX( calc(var(--panel-width) - var(--panel-height)) );
}

:host([rounded]) {
    border-radius: var(--panel-height);
}
  
:host([rounded]):before {
    border-radius: 50%;
}
`
class CheckboxSlider extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        const style_el = document.createElement('style')
        style_el.textContent = style
        this.shadowRoot.append(style_el)

        this.addEventListener('click', () => {
            this.checked = !this.checked
            this.dispatchEvent(new Event('change'))
        })
    }

    get type() {
        return 'checkbox'
    }

    get checked() {
        return this.hasAttribute('checked')
    }

    set checked(is_checked) {
        if (is_checked) {
            this.setAttribute('checked', '');
        } else {
            this.removeAttribute('checked');
        }
    }

    static get observedAttributes() {
        return ['checked']
    }

    // attributeChangedCallback(name, new_value, old_value) {
    //     switch(name) {
    //         case 'checked':
    //             console.log(name, new_value, old_value)
    //         break
    //     }
    // }

}

customElements.define('checkbox-slider', CheckboxSlider)
export default CheckboxSlider