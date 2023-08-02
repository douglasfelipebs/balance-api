import { HttpException, Injectable } from '@nestjs/common'
import { EventResponse } from './types/EventResponse'
import { Account } from './types/Account'
import { EventRequest } from './types/EventRequest'
import { EventTypeEnum } from './types/EventTypeEnum'

let accounts: Account[] = []

@Injectable()
export class AppService {
  reset() {
    accounts = []
  }
  getAccount(account_id: string): Account {
    return accounts.find((account) => account.id === account_id)
  }
  getBalance(account_id: string): number {
    const account = this.getAccount(account_id)
    if (!account) {
      throw new HttpException('Account Not Found', 404)
    }
    return account.balance
  }

  newEvent(event: EventRequest): EventResponse {
    const { type } = event

    switch (type) {
      case EventTypeEnum.DEPOSIT: {
        const { destination, amount } = event
        const account = this.deposit(destination, amount)
        return { destination: account }
      }
      case EventTypeEnum.WITHDRAW: {
        const { origin, amount } = event
        const account = this.withdraw(origin, amount)
        return { origin: account }
      }
      case EventTypeEnum.TRANSFER: {
        const { origin, amount, destination } = event
        return this.transfer(origin, destination, amount)
      }
    }
  }

  deposit(account_id: string, amount: number): Account {
    const account = this.getAccount(account_id)
    if (!account) {
      const newAccount = new Account(account_id, amount)
      accounts.push(newAccount)
      return newAccount
    }
    account.deposit(amount)
    return account
  }

  withdraw(account_id: string, amount: number): Account {
    const account: Account = this.getAccount(account_id)
    if (!account) {
      throw new HttpException('Account Not Found', 404)
    }
    account.withdraw(amount)
    return account
  }
  transfer(
    origin_id: string,
    destination_id: string,
    amount: number
  ): EventResponse {
    const origin = this.withdraw(origin_id, amount)
    const destination = this.deposit(destination_id, amount)
    return { origin, destination }
  }
}
