import { BaseComponent } from 'src/app/utils/base-component'
import { gameState } from 'src/app/utils/game-state'
import { emitter } from 'src/app/utils/event-emitter'
import { WinnersLeaderBoard } from './components/winners-leader-board/winners-leader-board'
import { Pagination } from '../shared/components/pagination/pagination'
import { WinnersControls } from './components/winners-controls/winners-contrlos'
import { winnersHttpService } from './services/winners-http-service'
import { WinnersQueryParams } from './models/winner-query-params'
import { EmitterEvents } from '../enums/emitter-events'

export class Winners extends BaseComponent {
  private heading = new BaseComponent({
    tag: 'h2',
    parent: this.element,
    attribute: {
      className: 'winners__heading',
    },
  })

  private controls = new WinnersControls(this.element)

  private winnersLeaderBoard = new WinnersLeaderBoard(this.element)

  private pagination = new Pagination(this.element, (paginationType: 'next' | 'previous') =>
    this.pagintationHandler(paginationType),
  )

  constructor() {
    super({
      tag: 'div',
      attribute: {
        className: 'winners',
      },
    })

    emitter.subscribe(EmitterEvents.RenderWinners, (queryParams?: WinnersQueryParams) =>
      this.renderWinners(queryParams),
    )
    this.renderWinners()
  }

  private pagintationHandler(paginationType: 'next' | 'previous'): void {
    if (paginationType === 'next') {
      gameState.currentWinnersPage += 1
      this.renderWinners()
      return
    }

    if (gameState.currentWinnersPage === 1) {
      return
    }

    gameState.currentWinnersPage -= 1
    this.renderWinners()
  }

  private async renderWinners(queryParams?: WinnersQueryParams): Promise<void> {
    if (queryParams) {
      gameState.queryParams = queryParams
    }

    const winnersData = await winnersHttpService.getWinners()
    const winnersDataFromPage = await winnersHttpService.getWinners(true, gameState.queryParams ?? undefined)
    if (!winnersDataFromPage.length) {
      gameState.currentWinnersPage -= 1
      return
    }

    Object.assign(this.heading.element, {
      textContent: `Winners (${winnersData.length} cars recorded, currently on page ${gameState.currentWinnersPage})`,
    })

    this.winnersLeaderBoard.renderWinners(winnersDataFromPage)
  }
}
