import { Subscribers } from "./subscribers"
import { Logs } from "./logs"

export interface Subscriptions {
  id: number,
  code: string,
  subscriberId: number,
  subscriber: Subscribers
  price: number,
  discountValue: number,
  startDate: Date,
  endDate: Date,
  isDeleted: boolean
  logs: Logs
}
