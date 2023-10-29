import { BaseComponent } from 'src/app/utils/base-component'
import { WinnerData } from 'src/app/winners/models/winner-data'
import { garageHttpService } from 'src/app/garage/services/garage-http-service'
import { winnerTableHeaders } from 'src/app/winners/constants/winner-table-headers'
import { CarData } from 'src/app/models/car-data'
import { PageLimits } from 'src/app/enums/page-limits'
import { gameState } from 'src/app/utils/game-state'
import { WinnerCell } from '../winner-cell/winner-cell'

export class WinnersLeaderBoard extends BaseComponent {
  private winnerElements: WinnerCell[] = []

  private combinedWinnersData: (WinnerData & CarData)[] = []

  constructor(parent: HTMLElement) {
    super({
      tag: 'div',
      parent,
      attribute: {
        className: 'winners-leader-board',
      },
    })
  }

  public async renderWinners(winnersData: WinnerData[]): Promise<void> {
    this.element.replaceChildren()

    this.setTableHeaders()
    await this.setData(winnersData)

    this.winnerElements = this.combinedWinnersData.map((combinedData, index) => {
      const serialNumber = (gameState.currentWinnersPage - 1) * PageLimits.WinnersLimit + index + 1
      return new WinnerCell(combinedData, this.element, serialNumber)
    })
  }

  private async setData(winnersData: WinnerData[]): Promise<void> {
    const carsPromises = winnersData.map((winner) => garageHttpService.getCar(winner.id))

    const carsData = await Promise.all(carsPromises)

    this.combinedWinnersData = winnersData.map((winner, index) => Object.assign(winner, carsData[index]))
  }

  private setTableHeaders(): void {
    const headersRow = new BaseComponent({
      tag: 'div',
      parent: this.element,
      attribute: {
        className: 'winners-leader-board__headers-row headers-row',
      },
    })

    winnerTableHeaders.forEach(
      (header) =>
        new BaseComponent({
          tag: 'div',
          parent: headersRow.element,
          attribute: {
            className: 'headers-row__header',
            textContent: header,
          },
        }),
    )
  }
}
