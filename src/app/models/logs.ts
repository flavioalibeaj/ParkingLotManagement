import { Subscription } from "./subscription"

export interface Logs {
  id?: number,
  code: string,
  subscriptionId?: number,
  checkInTime: string | Date,
  checkOutTime: string | Date,
  price: number
  subscription: Subscription
}
