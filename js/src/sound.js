window._Sound = class extends HTMLElement {
  connectedCallback() {
    this.cacheElements()
    this.handleEvents()
  }

  cacheElements() {
    this.button1 = document.querySelector('#players')
    this.button1Audio = this.querySelector('audio#button1')
    this.button2 = document.querySelector('.jasmin-icon')
    this.button2Audio = this.querySelector('audio#button2')
  }

  handleEvents() {
    this.button1.addEventListener('click', () => {
      this.button1Audio.play()
    })

    this.button2.addEventListener('click', () => {
      this.button2Audio.play()
    })
  }
}