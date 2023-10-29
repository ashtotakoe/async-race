import { BaseComponent } from 'src/app/utils/base-component'
import { generateCarsData } from 'src/app/garage/constants/generate-cars-data'
import { createCar } from 'src/app/utils/create-car'
import { emitter } from 'src/app/utils/event-emitter'
import { gameState } from 'src/app/utils/game-state'
import { EmitterEvents } from 'src/app/enums/emitter-events'
import { ModifyCarInput } from '../modify-car-input/modify-car-input'
import { CreateCarInput } from '../create-car-input/create-car-input'
import { CreateCarData } from '../../models/create-car-data'

export class GarageControl extends BaseComponent {
  private container = new BaseComponent({
    tag: 'div',
    parent: this.element,
    attribute: {
      className: 'garage-control__container',
    },
  })

  private createCar = new CreateCarInput(this.container.element, 'create')

  private modifyCar = new ModifyCarInput(this.container.element, 'modify')

  private controlButtons = new BaseComponent({
    tag: 'div',
    parent: this.container.element,
    attribute: {
      className: 'garage-control__controls-wrapper',
    },
  })

  private startRace = new BaseComponent({
    tag: 'button',
    parent: this.controlButtons.element,
    attribute: {
      className: 'garage-control__button',
      textContent: 'race',
    },
  })

  private resetRace = new BaseComponent({
    tag: 'button',
    parent: this.controlButtons.element,
    attribute: {
      className: 'garage-control__button',
      textContent: 'reset',
    },
  })

  private generateCars = new BaseComponent({
    tag: 'button',
    parent: this.controlButtons.element,
    attribute: {
      className: 'garage-control__button',
      textContent: 'generate',
    },
  })

  constructor(parent: HTMLElement) {
    super({
      tag: 'div',
      parent,
      attribute: {
        className: 'garage-control',
      },
    })

    this.resetRace.element.addEventListener('click', () => {
      const stopRequests = gameState.carCells?.map((carCell) => carCell.stopDrive())

      if (!stopRequests) {
        return
      }

      Promise.all(stopRequests).then(() => {
        gameState.isRaceGoing = false
        emitter.emit(EmitterEvents.RenderCars)
      })
    })
    this.generateCars.element.addEventListener('click', () => this.generateMoreCars())
    this.startRace.element.addEventListener('click', () => emitter.emit(EmitterEvents.StartRace))
  }

  private generateMoreCars(): void {
    const randomArray = this.generateRandomData()

    randomArray.forEach((carData) => {
      createCar(carData).then(() => {
        emitter.emit(EmitterEvents.RenderCars)
      })
    })
  }

  private generateRandomData(): CreateCarData[] {
    const { names, colors } = generateCarsData
    return Array.from({ length: 100 }, () => ({
      name: names[Math.floor(Math.random() * names.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  }
}
