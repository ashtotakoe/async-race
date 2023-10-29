import { CreateCarData } from '../garage/models/create-car-data'
import { garageHttpService } from '../garage/services/garage-http-service'

export const createCar = async (carData: CreateCarData): Promise<Response> => {
  const response = await garageHttpService.createCar(carData)
  return response
}
