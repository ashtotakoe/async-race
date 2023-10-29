import { BaseComponent } from './base-component'

export class Router {
  private lastHashPath: string | null = null
  private routerElement: HTMLElement
  private routes: Record<string, BaseComponent>
  private pathNotFound = '#not-found'

  constructor(routes: Record<string, BaseComponent>, routerElement: HTMLElement) {
    this.routes = routes
    this.routerElement = routerElement

    window.addEventListener('hashchange', () => this.hashChangeHandler())
    this.hashChangeHandler()
  }

  private hashChangeHandler(): void {
    const { hash } = window.location

    if (this.lastHashPath === hash) {
      return
    }

    const targetElement = this.routes[hash] ?? this.routes[this.pathNotFound]

    this.routerElement.replaceChildren(targetElement.element)

    this.lastHashPath = hash
  }
}
