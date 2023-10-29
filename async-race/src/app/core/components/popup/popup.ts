import { EmitterEvents } from 'src/app/enums/emitter-events'
import { BaseComponent } from 'src/app/utils/base-component'
import { emitter } from 'src/app/utils/event-emitter'

export class Popup extends BaseComponent {
  private messageHolder = new BaseComponent({
    tag: 'div',
    parent: this.element,
    attribute: {
      className: 'popup__message',
    },
  })

  constructor(parent: HTMLElement) {
    super({
      tag: 'div',
      parent,
      attribute: {
        className: 'popup',
      },
    })

    emitter.subscribe(EmitterEvents.ShowPopup, (message: string) => this.showPopup(message))
  }

  private showPopup(message: string): void {
    Object.assign(this.messageHolder.element, {
      textContent: message,
    })

    this.element.classList.add('active')

    setTimeout(() => {
      this.element.classList.remove('active')
    }, 4000)
  }
}
