import { Subscriptions } from "./subscriptions"

export interface Logs {
  id?: number,
  code: string,
  subscriptionId: number,
  checkInTime: string | Date,
  checkOutTime: string | Date,
  price: number
  subscription: Subscriptions
}
