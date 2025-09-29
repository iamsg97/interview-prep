import type { Car, GlobalState } from '../types/carRental.types'

/**
 * Represents an action that can either create or cancel a reservation.
 *
 * - `CREATE_RESERVATION`: Used to create a new reservation with a specific id and name.
 * - `CANCEL_RESERVATION`: Used to cancel an existing reservation with a specific id.
 *
 * The `Action` type is a union type that can be one of the following:
 * - An object with `type` set to `'CREATE_RESERVATION'` and a `payload` containing an `id` (numeric) and a `name` (string).
 * - An object with `type` set to `'CANCEL_RESERVATION'` and a `payload` containing an `id` (numeric).
 *
 * Note: "action" type should be a discriminated union with specific action shapes—this gives you safety, autocomplete, and no room for typos.
 */
type Action =
    | { type: 'CREATE_RESERVATION'; payload: { id: number } }
    | {
          type: 'CANCEL_RESERVATION'
          payload: { id: number }
      }
    | {
          type: 'ADD_FLEET'
          payload: { car: Omit<Car, 'id'> }
      }
    | {
          type: 'GET_FLEET_BY_ID'
          payload: { id: number }
      }

export const useReducerSelector = () => {
    function reducer(state: GlobalState, action: Action) {
        switch (action.type) {
            case 'CREATE_RESERVATION':
                /**
                 * @description We do a couple of things
                 * Make that particular car unavailable
                 * Add the car to the list of booked cars
                 * Note: Booking -> a car that is being booked
                 * So that car_id would be there in the booking array
                 */
                return {
                    ...state,
                    cars: state.cars.map(car =>
                        car.id === action.payload.id
                            ? { ...car, available: false }
                            : car
                    ),
                    bookings: [
                        ...state.bookings,
                        {
                            id: action.payload.id,
                            bookedAt: Date.now()
                        }
                    ]
                }
            case 'CANCEL_RESERVATION':
                /**
                 * @description We do a couple of things
                 * Make that particular car available
                 * Remove the car from the list of booked cars
                 */
                return {
                    ...state,
                    cars: state.cars.map(car =>
                        car.id === action.payload.id
                            ? { ...car, available: true }
                            : car
                    ),
                    bookings: state.bookings.filter(
                        booking => booking.id !== action.payload.id
                    ) // we filter the bookings; we don't want the car that was being passed in the payload to be in the bookings
                }
            case 'ADD_FLEET':
                /**
                 *  @description Add the car to the list of cars
                 */
                return {
                    ...state,
                    cars: [
                        ...state.cars,
                        { ...action.payload.car, id: state.cars.length + 1 }
                    ]
                }
            case 'GET_FLEET_BY_ID':
                /**
                 *  @description Get the car by id and add it to the `bookedCars` array
                 *  @todo: We need to add all the cars booked to the `bookedCars` array
                 *  @todo: Do we need the new array `bookedCars`? (can we just use the cars array?)
                 */
                return {
                    ...state,
                    bookedCars: {
                        ...state.bookedCars,
                        ...state.cars.find(car => car.id === action.payload.id)
                    }
                }
            default:
                return state
        }
    }

    return { reducer }
}
