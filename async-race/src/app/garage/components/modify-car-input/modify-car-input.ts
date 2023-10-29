import { gameState } from 'src/app/utils/game-state'
import { garageHttpService } from 'src/app/garage/services/garage-http-service'
import { emitter } from 'src/app/utils/event-emitter'
import { EmitterEvents } from 'src/app/enums/emitter-events'
import { CarInput } from '../../../shared/components/car-input/car-input'

export class ModifyCarInput extends CarInput {
  constructor(parent: HTMLElement, textContent: string) {
    super(parent, textContent)
    this.submitButton.element.addEventListener('click', () => this.modifyCar())
  }

  private async modifyCar(): Promise<void> {
    if (!gameState.modifyingCarId) {
      return
    }

    if (!gameState.carCells) {
      return
    }

    const modifyingTarget = gameState.carCells.find((carCell) => carCell.carData?.id === gameState.modifyingCarId)

    if (modifyingTarget) {
      const oldName = modifyingTarget.carData.name

      await garageHttpService.modifyCar(modifyingTarget.carData.id, {
        name: this.nameInput.inputValue || oldName,
        color: this.colorInput.inputValue ?? '#000000',
      })
      emitter.emit(EmitterEvents.RenderCars)
      emitter.emit(EmitterEvents.RenderWinners)
    }
  }
}
