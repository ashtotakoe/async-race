import { CarCell } from '../garage/components/car-cell/car-cell'
import { Car } from '../shared/components/car/car'
import { WinnersQueryParams } from '../winners/models/winner-query-params'

class GameState {
  public modifyingCarId: number | null = null
  public currentGaragePage = 1
  public carCells: CarCell[] | null = null
  public isRaceGoing = false
  public raceWinner: Car | null = null
  public raceWinnerTime = 0
  public currentWinnersPage = 1
  public queryParams: WinnersQueryParams | null = null
}

export const gameState = new GameState()
