import * as express from 'express'
import {Handler} from './Handler'

export abstract class GoogleHandler extends Handler {

  protected createAssistantArguments (event: any, callback: (error: number, data?: any) => any): Object {
    const app = express()

    app.request.body = event
    app.request.headers = {}
    app.response.setHeader = () => null
    // kinda hackish to make typescript happy
    app.response.send = (data: number, error?: any): express.Response => {
      return callback(error, data) as express.Response // TODO this maybe lambda only, check on google-cloud-functions
    }

    return {request: app.request, response: app.response}
  }
}
