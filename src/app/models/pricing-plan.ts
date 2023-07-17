export interface PricingPlan {
  id?: number,
  hourlyPricing: number,
  dailyPricing: number,
  minimumHours: number,
  type: "weekend" | "weekday"
}
