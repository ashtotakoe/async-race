import { RequestStatuses } from '../enums/request-statuses'
import { emitter } from './event-emitter'
import { gameState } from './game-state'
import { winnersHttpService } from '../winners/services/winners-http-service'
import { EmitterEvents } from '../enums/emitter-events'

export const saveWinner = async (): Promise<void> => {
  const winnerId = gameState.raceWinner?.carData.id

  if (!winnerId) {
    return
  }
  const timeInSeconds = Number((gameState.raceWinnerTime / 1000).toFixed(2))

  const getWinnerResponse = await winnersHttpService.getWinner(winnerId)

  if (getWinnerResponse.status === RequestStatuses.NotFound) {
    await winnersHttpService.setNewWinner(winnerId, timeInSeconds)
    emitter.emit(EmitterEvents.RenderWinners)
    return
  }

  await winnersHttpService.updateWinnerData(winnerId, timeInSeconds)

  emitter.emit(EmitterEvents.RenderWinners)
}
