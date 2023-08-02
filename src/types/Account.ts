export class Account {
  id: string
  balance: number

  constructor(id: string, balance: number) {
    this.id = id
    this.balance = balance
  }

  deposit = (ammount: number): number => {
    this.balance += ammount
    return this.balance
  }

  withdraw = (ammount: number): number => {
    this.balance -= ammount
    return this.balance
  }
}