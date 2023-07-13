export interface Subscription {
  id: number,
  code: string,
  subscriber_id: number,
  price: number,
  discount_value: number,
  start_date: Date,
  end_date: Date,
  isDeleted: boolean
}
