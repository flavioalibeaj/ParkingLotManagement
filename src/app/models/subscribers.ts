import { Subscriptions } from "./subscriptions"

export interface Subscribers {
  id: number
  firstName: string,
  lastName: string,
  idCardNumber: string,
  email: string,
  phoneNumber: string
  birthday: Date | string,
  plateNumber: string,
  isDeleted: boolean,
  subscription: Subscriptions
}
