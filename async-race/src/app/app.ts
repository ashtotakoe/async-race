import { Layout } from './core/components/layout/layout'
import { BaseComponent } from './utils/base-component'

class App {
  private root = new BaseComponent({
    tag: 'div',
    parent: document.body,
    attribute: {
      className: 'root',
    },
  })

  public init(): void {
    const layout = new Layout()
    layout.init(this.root.element)
  }
}

const app = new App()
app.init()
