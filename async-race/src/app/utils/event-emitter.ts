import { Callback } from '../types/callback'

class EventEmitter<Str, Func> {
  private events = new Map()

  public subscribe(eventName: Str, eventCallback: Func): void {
    let callbacks = this.events.get(eventName)

    if (!callbacks) {
      this.events.set(eventName, (callbacks = []))
    }

    callbacks.push(eventCallback)
  }

  public unsubscribe(eventName: string, eventCallback?: Callback): boolean {
    if (!eventCallback) {
      return this.events.delete(eventName)
    }

    const callbacks = this.events.get(eventName)

    if (!callbacks) {
      return false
    }

    const index = callbacks.indexOf(eventCallback)

    if (index < 0) {
      return false
    }

    callbacks.splice(index, 1)

    if (callbacks.length === 0) {
      this.events.delete(eventName)
    }

    return true
  }

  public emit<T>(eventName: string, args?: T): boolean {
    const callbacks = this.events.get(eventName)

    if (!callbacks) {
      return false
    }

    callbacks.forEach((handler: Callback) => {
      try {
        handler(args)
      } catch (err) {
        console.error(err)
      }
    })

    return true
  }
}

export const emitter = new EventEmitter()
