export interface ParkingSpot {
  id: number,
  totalSpots: number
  freeRegularSpots: number
  freeReservedSpots: number
  occupiedRegularSpots: number
  occupiedReservedSpots: number
  regularSpots: number
  reservedSpots: number
}
