import { BaseComponent } from 'src/app/utils/base-component'

export class Header extends BaseComponent {
  private heading = new BaseComponent({
    tag: 'h1',
    parent: this.element,
    attribute: {
      className: 'header__heading',
      textContent: 'Async Race',
    },
  })

  private navigation = new BaseComponent({
    tag: 'nav',
    parent: this.element,
    attribute: {
      className: 'header__navigation',
    },
  })

  private garageButton = new BaseComponent({
    tag: 'button',
    parent: this.navigation.element,
    attribute: {
      className: 'header__navigation-button',
      innerHTML: 'Garage',
    },
  })

  private winnersButton = new BaseComponent({
    tag: 'button',
    parent: this.navigation.element,
    attribute: {
      className: 'header__navigation-button',
      innerHTML: 'Winners',
    },
  })

  constructor(parent: HTMLElement) {
    super({
      tag: 'header',
      parent,
      attribute: {
        className: 'header',
      },
    })

    this.garageButton.element.addEventListener('click', this.navigationHandler)
    this.winnersButton.element.addEventListener('click', this.navigationHandler)
  }

  private navigationHandler({ target }: Event): void {
    if (!target || !(target instanceof HTMLElement) || !target.textContent) {
      return
    }

    Object.assign(window.location, {
      hash: target.textContent.toLowerCase(),
    })
  }
}
