const style = `
label {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #2da160;
    transition: .4s;
}

span:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
}

span.checked:before {
    transform: translateX(26px);
}

.round {
    border-radius: 34px;
}
  
.round:before {
    border-radius: 50%;
}
`
class CheckboxSlider extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        /*
            <label><span class="round"></span></label>
        */
        const label = document.createElement('label')

        this.span = document.createElement('span')
        this.span.className = 'round'
        label.append(this.span)

        const style_el = document.createElement('style')
        style_el.textContent = style
        this.shadowRoot.append(style_el, label)

        this.addEventListener('click', () => {
            this.checked = !this.checked
            this.dispatchEvent(new Event('change'))
        })

        this.checked = false
    }

    get type() {
        return 'checkbox'
    }

    get checked() {
        return this._checked
    }

    set checked(is_checked) {
        if (is_checked) {
            this.setAttribute('checked', '');
            this._checked = true
            this.span.classList.add('checked')
        } else {
            this.removeAttribute('checked');
            this._checked = false
            this.span.classList.remove('checked')
        }
    }

    static get observedAttributes() {
        return ['checked']
    }

    attributeChangedCallback(name, new_value, old_value) {
        switch(name) {
            case 'checked':
                this.checked = new_value == null ? true:false
            break
        }
    }

}

customElements.define('checkbox-slider', CheckboxSlider)
export default CheckboxSlider