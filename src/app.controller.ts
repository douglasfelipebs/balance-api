import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { AppService } from './app.service'
import { EventResponse } from './types/EventResponse'
import { EventRequest } from './types/EventRequest'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/balance')
  getBalance(@Query('account_id') account_id: string): number {
    return this.appService.getBalance(account_id)
  }

  @Post('/event')
  newEvent(@Body() event: EventRequest): EventResponse {
    return this.appService.newEvent(event)
  }
}
