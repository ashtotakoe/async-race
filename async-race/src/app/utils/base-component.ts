import { BaseComponentProps } from '../models/base-component-props'

export class BaseComponent {
  public element
  constructor({ tag = 'div', parent, attribute }: BaseComponentProps) {
    this.element = document.createElement(tag)
    if (parent) {
      parent.append(this.element)
    }
    if (attribute) {
      Object.assign(this.element, attribute)
    }
  }

  public get inputValue(): string {
    if (this.element instanceof HTMLInputElement || this.element instanceof HTMLSelectElement) {
      return this.element.value
    }
    return ''
  }

  public set inputValue(value: string) {
    if (this.element instanceof HTMLInputElement || this.element instanceof HTMLSelectElement) {
      this.element.value = value
    }
  }
}
