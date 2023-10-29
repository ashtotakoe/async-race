import { BaseComponent } from 'src/app/utils/base-component'

export class Footer extends BaseComponent {
  constructor(parent: HTMLElement) {
    super({
      tag: 'footer',
      parent,
      attribute: {
        className: 'footer',
        innerHTML: `
          <div class="container">
            <a class = "container__github" target= "_blank" href="https://github.com/ashtotakoe">github</a>
            <h2 class = "container__author">© ashtotakoe 2023</h2>
            <a class = "container__rss-logo" target= "_blank" href="https://rs.school/js/"></a>
          </div>
    `,
      },
    })
  }
}
