import { EngineStartedData } from './engine-started-response'

export interface StartEngineReturnProps {
  engineStartedData: EngineStartedData
  driveModeResponse: Promise<Response>
}
