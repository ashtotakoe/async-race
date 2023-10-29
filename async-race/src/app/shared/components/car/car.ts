import { CarData } from 'src/app/models/car-data'
import { BaseComponent } from 'src/app/utils/base-component'
import { garageHttpService } from 'src/app/garage/services/garage-http-service'
import { bringCarBackToStart } from 'src/app/garage/utils/bring-car-back-to-start'
import { buildSvgSprite } from 'src/app/garage/utils/build-svg-sprite'
import { gameState } from 'src/app/utils/game-state'
import { emitter } from 'src/app/utils/event-emitter'
import { EmitterEvents } from 'src/app/enums/emitter-events'

export class Car extends BaseComponent {
  public isDriving = false
  public areBrakesActivated = false

  public carData: CarData
  private carModel = buildSvgSprite(this.element, './icons/car.svg#car')

  constructor(parent: HTMLElement, data: CarData) {
    super({
      tag: 'div',
      parent,
      attribute: {
        className: 'car-cell__car car',
      },
    })

    this.carData = data

    this.carModel.style.fill = this.carData.color
  }

  public get passedPath(): number {
    const style = getComputedStyle(this.carModel).marginLeft
    return Number(style.slice(0, style.length - 2))
  }

  public set passedPath(value: number) {
    this.carModel.style.marginLeft = `${value}px`
  }

  public startDrive(relativeSpeed: number, roadLength: number): void {
    let passedPath = relativeSpeed
    const intervalId = setInterval(() => {
      if (!this.isDriving) {
        clearInterval(intervalId)
        if (this.isRaceOver()) {
          this.stopRace()
        }
      }

      if (this.areBrakesActivated) {
        bringCarBackToStart(this)
      }

      this.passedPath = passedPath
      passedPath += relativeSpeed

      if (passedPath > roadLength) {
        this.isDriving = false
        garageHttpService.stopEngine(this.carData.id)
      }
    }, 10)
  }

  private stopRace(): void {
    gameState.isRaceGoing = false
    emitter.emit(EmitterEvents.ShowPopup, 'race is finished!')
  }

  private isRaceOver(): boolean {
    if (!gameState.isRaceGoing) {
      return false
    }

    return !this.isAnyoneStillDriving()
  }

  private isAnyoneStillDriving(): boolean {
    if (!gameState.carCells) {
      return false
    }
    return gameState.carCells.some((carCell) => carCell.car.isDriving)
  }
}
