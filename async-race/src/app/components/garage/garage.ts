import { BaseComponent } from 'src/app/utils/base-component'
import { httpFetcher } from 'src/app/utils/http-fetcher'
import { CarData } from 'src/app/models/car-data'
import { CarCell } from 'src/app/components/car-cell/car-cell'
import { emitter } from 'src/app/utils/event-emitter'
import { gameState } from 'src/app/utils/game-state'
import { GarageControl } from '../garage-control/garage-control'

export class Garage extends BaseComponent {
  private carsData: CarData[] | null = null
  public carCells: CarCell[] | null = null

  private heading = new BaseComponent({
    tag: 'h1',
    parent: this.element,
    attribute: {
      className: 'garage__heading',
      textContent: 'Garage',
    },
  })

  private carCreator = new GarageControl(this.element)

  private carsWrapper = new BaseComponent({
    tag: 'div',
    parent: this.element,
    attribute: {
      className: 'garage__cars-wrapper',
    },
  })

  private paginationPreviousButton = new BaseComponent({
    tag: 'button',
    parent: this.element,
    attribute: {
      className: 'garage__pagination-button',
      textContent: 'before',
    },
  })

  private paginationNextButton = new BaseComponent({
    tag: 'button',
    parent: this.element,
    attribute: {
      className: 'garage__pagination-button',
      textContent: 'next',
    },
  })
  constructor(parent: HTMLElement) {
    super({
      tag: 'div',
      parent,
      attribute: {
        className: 'garage',
      },
    })
    emitter.subscribe('render cars', () => this.renderCars())

    this.paginationPreviousButton.element.addEventListener('click', () => this.renderPagination('previous'))
    this.paginationNextButton.element.addEventListener('click', () => this.renderPagination('next'))
    this.renderCars()
  }

  private renderPagination(paginationType: 'previous' | 'next'): void {
    console.log(paginationType)
  }

  private renderCars(): void {
    httpFetcher.getCars({ isPaginationRequiered: true }).then((carsData) => {
      this.carsWrapper.element.replaceChildren()

      this.changeGarageCount()

      this.carsData = carsData
      this.carCells = this.carsData.map((carData) => new CarCell(this.carsWrapper.element, carData))
      gameState.carCells = this.carCells
    })
  }

  private changeGarageCount(): void {
    httpFetcher.getCars({ isPaginationRequiered: false }).then((carsData) => {
      Object.assign(this.heading.element, {
        textContent: `Garage (${carsData.length})`,
      })
    })
  }
}
