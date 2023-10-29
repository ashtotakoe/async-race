import { API } from 'src/app/enums/api'
import { HTTPMethods } from 'src/app/enums/http-methods'
import { headersForPostMethod } from 'src/app/constants/headers-for-post-method'
import { PageLimits } from 'src/app/enums/page-limits'
import { gameState } from 'src/app/utils/game-state'
import { WinnerData } from '../models/winner-data'
import { WinnersQueryParams } from '../models/winner-query-params'

class WinnersHTTPService {
  public async getWinner(id: number): Promise<Response> {
    const response = await fetch(`${API.Path}/winners/${id}`)
    return response
  }

  public async getWinners(isPaginationRequired = false, queryParams?: WinnersQueryParams): Promise<WinnerData[]> {
    let query = ''
    if (isPaginationRequired) {
      query = `?_page=${gameState.currentWinnersPage}&_limit=${PageLimits.WinnersLimit}`
    }

    if (queryParams) {
      query += `&_sort=${queryParams.sort}&_order=${queryParams.order}`
    }

    const response = await fetch(`${API.Path}/winners${query}`)
    const winnersData = response.json()
    return winnersData
  }

  public async deleteWinner(id: number): Promise<void> {
    await fetch(`${API.Path}/winners/${id}`, {
      method: HTTPMethods.DELETE,
    })
  }

  public async updateWinnerData(id: number, rideTime: number): Promise<Response> {
    const initialDataResponse = await fetch(`${API.Path}/winners/${id}`)
    const initialData: WinnerData = await initialDataResponse.json()
    let { wins, time } = initialData
    wins += 1
    time = time > rideTime ? rideTime : time

    const response = await fetch(`${API.Path}/winners/${id}`, {
      method: HTTPMethods.PUT,
      headers: headersForPostMethod,
      body: JSON.stringify({
        wins,
        time,
      }),
    })

    return response
  }

  public async setNewWinner(id: number, rideTime: number): Promise<Response> {
    const response = await fetch(`${API.Path}/winners`, {
      method: HTTPMethods.POST,
      headers: headersForPostMethod,
      body: JSON.stringify({
        id,
        wins: 1,
        time: rideTime,
      }),
    })

    return response
  }
}

export const winnersHttpService = new WinnersHTTPService()
