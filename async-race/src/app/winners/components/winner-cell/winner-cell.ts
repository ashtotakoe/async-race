import { BaseComponent } from 'src/app/utils/base-component'
import { Car } from 'src/app/shared/components/car/car'
import { ExtendedWinnerData } from '../../types/extended-winner-data'

export class WinnerCell extends BaseComponent {
  private data?: ExtendedWinnerData
  private winnerCarModel: Car
  private winnerCellElements: BaseComponent[]
  private cellNumber: number

  private cellNumberElement = new BaseComponent({
    tag: 'p',
    parent: this.element,
    attribute: {
      className: 'winner-cell__data',
    },
  })

  private winnerid = new BaseComponent({
    tag: 'p',
    parent: this.element,
    attribute: {
      className: 'winner-cell__data',
    },
  })

  private winnerName = new BaseComponent({
    tag: 'p',
    parent: this.element,
    attribute: {
      className: 'winner-cell__data',
    },
  })

  private winsCount = new BaseComponent({
    tag: 'p',
    parent: this.element,
    attribute: {
      className: 'winner-cell__data',
    },
  })

  private bestTime = new BaseComponent({
    tag: 'p',
    parent: this.element,
    attribute: {
      className: 'winner-cell__data',
    },
  })

  constructor(data: ExtendedWinnerData, parent: HTMLElement, cellNumber: number) {
    super({
      tag: 'div',
      parent,
      attribute: {
        className: 'winner-cell',
      },
    })

    this.data = data
    this.cellNumber = cellNumber

    const { id, name, color } = this.data
    this.winnerCarModel = new Car(this.element, { id, name, color })

    this.winnerCellElements = [this.winnerName, this.winnerid, this.winsCount, this.bestTime]
    this.setData()
  }

  private setData(): void {
    if (!this.data) {
      return
    }

    this.cellNumberElement.element.textContent = `${this.cellNumber}`

    const { name, id, wins, time } = this.data

    Array.from([name, id, wins, time]).forEach((value, index) => {
      Object.assign(this.winnerCellElements[index].element, {
        textContent: value,
      })
    })
  }
}
