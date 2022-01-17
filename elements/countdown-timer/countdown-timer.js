const style = `
`

class CountdownTimer extends HTMLElement {
    _duration = 5
    _interval = null
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        //this._setDuration()
        //this._display()  
    }

    //connectedCallback() {}

    start() {
        this._setDuration()
        this._display()
        this._interval = setInterval(() => this._tick(), 1000)
    }

    stop() {
        clearInterval(this._interval)
    }

    clear () {
        this.stop()
        this.shadowRoot.textContent = ''
    }

    _setDuration() {
        this._duration = parseInt(this.getAttribute('duration'))
    }

    _tick() {
        --this._duration
        this._display()
        if (this._duration == 0) {
            this.stop()
            this.shadowRoot.textContent = this.getAttribute('message')
            this.dispatchEvent(new Event('done'))
        }
    }

    _display() {
        let minutes = parseInt(this._duration / 60, 10);
        let seconds = parseInt(this._duration % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        this.shadowRoot.textContent = minutes + ":" + seconds;
    }

}

customElements.define('countdown-timer', CountdownTimer)
export default CountdownTimer