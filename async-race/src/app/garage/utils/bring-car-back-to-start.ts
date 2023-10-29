import { Car } from 'src/app/shared/components/car/car'

export const bringCarBackToStart = (car: Car): void => {
  setTimeout(() => {
    Object.assign(car, {
      passedPath: 0,
    })
  }, 11)
}
