import { BaseComponent } from 'src/app/utils/base-component'

export class Pagination extends BaseComponent {
  private paginationPreviousButton = new BaseComponent({
    tag: 'button',
    parent: this.element,
    attribute: {
      className: 'pagination__button',
      textContent: 'before',
    },
  })

  private paginationNextButton = new BaseComponent({
    tag: 'button',
    parent: this.element,
    attribute: {
      className: 'pagination__button',
      textContent: 'next',
    },
  })

  constructor(parent: HTMLElement, callback: (paginationType: 'next' | 'previous') => void) {
    super({
      tag: 'div',
      parent,
      attribute: {
        className: 'pagination',
      },
    })
    this.paginationPreviousButton.element.addEventListener('click', () => callback('previous'))
    this.paginationNextButton.element.addEventListener('click', () => callback('next'))
  }
}
