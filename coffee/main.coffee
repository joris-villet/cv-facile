

class App extends HTMLElement 

  shadow = this.attachShadow({mode: 'open'})

  div = document.createElement('div')
  div.textContent = "my div component"

  shadow.append(div)


customElements.define('my-app', App)


