import { Subscriber } from "./subscriber"
import { Logs } from "./logs"

export interface Subscription {
  id: number,
  code: string,
  subscriberId: number,
  subscriber: Subscriber
  price: number,
  discountValue: number,
  startDate: Date,
  end_date: Date,
  isDeleted: boolean
  logs?: Logs
}
