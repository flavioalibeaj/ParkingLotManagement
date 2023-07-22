import { Subscription } from "./subscription"

export interface Subscriber {
  id: number
  firstName: string,
  lastName: string,
  idCardNumber: string,
  email: string,
  phoneNumber: string
  birthday: Date | string,
  plateNumber: string,
  isDeleted: boolean,
  subscription: Subscription | Subscription[]
}
