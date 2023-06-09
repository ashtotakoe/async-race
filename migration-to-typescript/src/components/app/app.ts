import AppController from '../controller/controller'
import { AppView } from '../view/appView'
import { ResponseNews } from '../../types'

class App {
  private controller = new AppController()
  private view = new AppView()

  public start(): void {
    document
      .querySelector('.sources')
      ?.addEventListener('click', (e) => this.controller.getNews(e, (data: ResponseNews) => this.view.drawNews(data)))
    this.controller.getSources((data) => this.view.drawSources(data))
  }
}

export default App
