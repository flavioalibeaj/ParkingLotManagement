export interface Logs {
  id?: number, //Backend
  code: string, // Backend
  subscriptionId?: number, //Front
  checkInTime: string | Date, //Back
  checkOutTime: string | Date, //Back
  price?: number //Auto Generated
}
