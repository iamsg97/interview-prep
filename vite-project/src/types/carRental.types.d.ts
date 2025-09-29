export interface Car {
    id: number,
    name: string,
    available: boolean
}

export type Booking = Pick<Car, 'id'> & {bookedAt?: number}

export interface GlobalState {
    cars: Car[],
    bookings: Booking[]
    bookedCars: Car[]
}
