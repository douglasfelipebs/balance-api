import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res
} from '@nestjs/common'
import { AppService } from './app.service'
import { EventResponse } from './types/EventResponse'
import { EventRequest } from './types/EventRequest'
import { Response } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/balance')
  getBalance(
    @Query('account_id') account_id: string,
    @Res({ passthrough: true }) res: Response
  ): number {
    try {
      return this.appService.getBalance(account_id)
    } catch (e) {
      res.status(e.status).json(0).send()
    }
  }

  @Post('/event')
  newEvent(
    @Body() event: EventRequest,
    @Res({ passthrough: true }) res: Response
  ): EventResponse {
    try {
      return this.appService.newEvent(event)
    } catch (e) {
      res.status(e.status).json(0).send()
    }
  }

  @Post('/reset')
  reset(@Res({ passthrough: true }) res: Response): void {
    this.appService.reset()
    res.status(HttpStatus.OK).send('OK')
    return
  }
}
