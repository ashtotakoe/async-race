import { createCar } from 'src/app/utils/create-car'
import { emitter } from 'src/app/utils/event-emitter'
import { EmitterEvents } from 'src/app/enums/emitter-events'
import { CarInput } from '../../../shared/components/car-input/car-input'

export class CreateCarInput extends CarInput {
  constructor(parent: HTMLElement, submitTextContent: string) {
    super(parent, submitTextContent)
    this.submitButton.element.addEventListener('click', () => this.submitHandler())
  }

  private submitHandler(): void {
    const carData = {
      name: this.nameInput.inputValue || 'default name',
      color: this.colorInput.inputValue,
    }

    createCar(carData).then(() => {
      emitter.emit(EmitterEvents.RenderCars)
    })
  }
}
