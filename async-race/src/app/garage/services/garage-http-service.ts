import { PageLimits } from 'src/app/enums/page-limits'
import { headersForPostMethod } from '../../constants/headers-for-post-method'
import { API } from '../../enums/api'
import { HTTPMethods } from '../../enums/http-methods'
import { CarData } from '../../models/car-data'
import { CreateCarData } from '../models/create-car-data'
import { EngineStartedData } from '../models/engine-started-response'
import { StartEngineReturnProps } from '../models/start-engine-return-props'
import { gameState } from '../../utils/game-state'
import { winnersHttpService } from '../../winners/services/winners-http-service'

class GarageHTTPService {
  public async getCars({ isPaginationRequired = true }): Promise<CarData[]> {
    const query = `?_page=${gameState.currentGaragePage}&_limit=${PageLimits.CarsLimit}`
    const response = await fetch(`${API.Path}/garage${isPaginationRequired ? query : ''}`)
    const cars = await response.json()
    return cars
  }

  public async getCar(id: number): Promise<CarData> {
    const response = await fetch(`${API.Path}/garage/${id}`)
    const car = await response.json()
    return car
  }

  public async startEngine(id: number): Promise<StartEngineReturnProps> {
    const response = await fetch(`${API.Path}/engine?id=${id}&status=started`, {
      method: HTTPMethods.PATCH,
    })

    const engineStartedData: EngineStartedData = await response.json()
    const driveModeResponse = this.startDriveMode(id)
    return { engineStartedData, driveModeResponse }
  }

  public async startDriveMode(id: number): Promise<Response> {
    const response = await fetch(`${API.Path}/engine?id=${id}&status=drive`, {
      method: HTTPMethods.PATCH,
    })
    return response
  }

  public async stopEngine(id: number): Promise<Response> {
    const response = await fetch(`${API.Path}/engine?id=${id}&status=stopped`, {
      method: HTTPMethods.PATCH,
    })

    return response
  }

  public async createCar(carData: CreateCarData): Promise<Response> {
    const requestBody = JSON.stringify(carData)
    const response = await fetch(`${API.Path}/garage`, {
      method: HTTPMethods.POST,
      body: requestBody,
      headers: headersForPostMethod,
    })

    return response
  }

  public async deleteCar(id: number): Promise<void> {
    await fetch(`${API.Path}/garage/${id}`, {
      method: HTTPMethods.DELETE,
    })

    await winnersHttpService.deleteWinner(id)
  }

  public async modifyCar(id: number, carData: CreateCarData): Promise<void> {
    const requestBody = JSON.stringify(carData)
    await fetch(`${API.Path}/garage/${id}`, {
      method: HTTPMethods.PUT,
      headers: headersForPostMethod,
      body: requestBody,
    })
  }
}

export const garageHttpService = new GarageHTTPService()
