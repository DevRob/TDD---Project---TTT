function registerElements() {
  customElements.define('audio-container', _Sound)
}

const onDomLoaded = () => {
  registerElements()
  let mediaQuery = getMediaQuery()

  window.addEventListener('resize', function () {
    let newMediaQuery = getMediaQuery()

    if(mediaQuery !== newMediaQuery) {
      resizeCanvas(newMediaQuery)
      mediaQuery = newMediaQuery
    }
  })

  resizeCanvas (mediaQuery)
}

function resizeCanvas (breakpoint) {
  let canvasSizes = {
    'xs': 350,
    'sm': 500,
    'md': 600,
    'lg': 750,
    'xl': 750,
    'xxl': 750,
  }
  $('#canvas').attr('width', canvasSizes[breakpoint])
  startGame()
}

function getMediaQuery() {
  const mqValue =
    window
      .getComputedStyle(document.body, '::before')
      .getPropertyValue('content') || false
  if (mqValue) {
    return mqValue.replace(/["']/g, '')
  } else {
    return 'false'
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onDomLoaded)
} else {
  onDomLoaded()
}