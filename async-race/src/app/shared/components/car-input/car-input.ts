import { BaseComponent } from 'src/app/utils/base-component'

export class CarInput extends BaseComponent {
  protected nameInput = new BaseComponent({
    tag: 'input',
    parent: this.element,
    attribute: {
      className: 'car-input__name',
    },
  })

  protected colorInput = new BaseComponent({
    tag: 'input',
    parent: this.element,
    attribute: {
      className: 'car-input__color',
    },
  })

  protected submitButton = new BaseComponent({
    tag: 'button',
    parent: this.element,
    attribute: {
      className: 'car-input__btn',
    },
  })

  constructor(parent: HTMLElement, submitTextContent: string) {
    super({
      tag: 'div',
      parent,
      attribute: {
        className: 'car-input',
      },
    })

    this.nameInput.element.setAttribute('type', 'text')
    this.colorInput.element.setAttribute('type', 'color')
    Object.assign(this.submitButton.element, {
      textContent: submitTextContent,
    })
  }
}
