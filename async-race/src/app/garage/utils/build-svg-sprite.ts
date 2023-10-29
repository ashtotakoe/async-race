export function buildSvgSprite(parent: HTMLElement, spriteId: string): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.classList.add('icon')
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
  use.setAttribute('href', `${spriteId}`)
  use.classList.add('icon-use')
  svg.appendChild(use)
  parent.appendChild(svg)
  return svg
}
