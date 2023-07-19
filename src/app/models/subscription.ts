import { Subscriber } from "./subscriber"
import { Logs } from "./logs"

export interface Subscription {
  id: number,
  code: string,
  subscriber_id: number,
  subscriber: Subscriber
  price: number,
  discount_value: number,
  start_date: Date,
  end_date: Date,
  isDeleted: boolean
  logs?: Logs
}
