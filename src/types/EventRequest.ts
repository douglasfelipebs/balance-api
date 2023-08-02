import { EventTypeEnum } from './EventTypeEnum'

export type EventRequest = {
  type: EventTypeEnum
  amount: number
  destination?: 'string'
  origin?: 'string'
}
