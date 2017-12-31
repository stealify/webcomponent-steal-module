class STEALComponent extends HTMLElement {
  constructor () {
    super()

    // create a shadow root
    this.shadow = this.attachShadow({ mode: 'open' })
  }
  connectedCallback () {
          // build a <template> element to inject
          const template = document.createElement('template')

          // add the JS last, in a <script> tag, as well as wrapped by an IIFE
          // the IIFE ensures nothing leaks to the window
          template.innerHTML += `
            <script>
              (() => {
                ${this.innerHTML}
              })()
            </script>
          `
          this.innerHTML = '' // Remove none needed markup from DOM
          // inject our DOM content into the cached Shadow DOM
          // this is what is required to make the JS execute
          this.shadow.appendChild(document.importNode(template.content, true))
  }
}

customElements.define('steal-module', STEALComponent)
