export interface PricingPlan {
  id: number,
  hourlyPricing: number,
  dailyPricing: number,
  minHours: number,
  type: "weekend" | "weekday"
}
