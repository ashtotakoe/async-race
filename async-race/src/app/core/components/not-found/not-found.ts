import { BaseComponent } from 'src/app/utils/base-component'

export class NotFound extends BaseComponent {
  private heading = new BaseComponent({
    tag: 'h3',
    parent: this.element,
    attribute: {
      className: 'not-found__heading',
      textContent: 'page was not found',
    },
  })

  constructor() {
    super({
      tag: 'div',
      attribute: {
        className: 'not-found',
      },
    })
  }
}
