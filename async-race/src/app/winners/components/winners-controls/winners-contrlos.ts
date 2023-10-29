import { EmitterEvents } from 'src/app/enums/emitter-events'
import { BaseComponent } from 'src/app/utils/base-component'
import { emitter } from 'src/app/utils/event-emitter'

export class WinnersControls extends BaseComponent {
  private sortingTypeLabel = new BaseComponent({
    tag: 'p',
    parent: this.element,
    attribute: {
      className: 'winners-controls__label',
      textContent: 'Sort by:',
    },
  })

  private sortingTypeInput = new BaseComponent({
    tag: 'select',
    parent: this.element,
    attribute: {
      className: 'winners-controls__input',
    },
  })

  private sortingOrderLabel = new BaseComponent({
    tag: 'p',
    parent: this.element,
    attribute: {
      className: 'winners-controls__label',
      textContent: 'order:',
    },
  })

  private sortingOrderInput = new BaseComponent({
    tag: 'select',
    parent: this.element,
    attribute: {
      className: 'winners-controls__input',
    },
  })

  private submitButton = new BaseComponent({
    tag: 'button',
    parent: this.element,
    attribute: {
      className: 'winners-controls__button',
      textContent: 'submit',
    },
  })

  constructor(parent: HTMLElement) {
    super({
      tag: 'div',
      parent,
      attribute: {
        className: 'winners-controls',
      },
    })

    this.setSelectOptions()

    this.submitButton.element.addEventListener('click', () => this.submitHandler())
  }

  private submitHandler(): void {
    const sort = this.sortingTypeInput.inputValue
    const order = this.sortingOrderInput.inputValue

    emitter.emit(EmitterEvents.RenderWinners, { sort, order })
  }

  private setSelectOptions(): void {
    const sortingTypeOptions = ['time', 'wins', 'id']
    const sortingOrderOptions = [
      { textContent: 'ascending', value: 'ASC' },
      { textContent: 'descending', value: 'DESC' },
    ]

    sortingTypeOptions.map(
      (optionData) =>
        new BaseComponent({
          tag: 'option',
          parent: this.sortingTypeInput.element,
          attribute: {
            textContent: optionData,
          },
        }),
    )

    sortingOrderOptions.map(
      ({ textContent, value }) =>
        new BaseComponent({
          tag: 'option',
          parent: this.sortingOrderInput.element,
          attribute: {
            textContent,
            value,
          },
        }),
    )
  }
}
