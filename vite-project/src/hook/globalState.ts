import type {GlobalState} from "../types/carRental.types";

export const globalState: GlobalState = {
    cars: [
        {
            id: 1,
            name: 'BMW',
            available: true,
        },
        {
            id: 2,
            name: 'Audi',
            available: true,
        },
        {
            id: 3,
            name: 'Mercedes',
            available: true,
        },
        {
            id: 4,
            name: 'Volvo',
            available: true,
        }
    ],
    bookings: [],
    bookedCars: []
}