import {useReducer} from "react";
import {useReducerSelector} from "../../hook/use-reducer-selector.ts";
import {globalState} from "../../hook/globalState.ts";
import {BookedCars} from "../../molecules/BookedCars.tsx";

export const BookCarRental = () => {
    const {reducer} = useReducerSelector()
    const [state, dispatch] = useReducer(reducer, globalState)

    const handleReservation = (id: number, type: 'CREATE' | 'CANCEL') => {
        dispatch({type: `${type}_RESERVATION`, payload: {id}})
    }

    return (
        <div>
            <h1>Car Rental System</h1>
            <h3>Available Cars</h3>
            {
                state.cars.map(car => {
                    return (
                        <div key={car.id}>
                            <h2>{car.name}</h2>
                            <p>Available: {car.available ? 'Yes' : 'No'}</p>

                            <button onClick={() => handleReservation(car.id, 'CREATE')} disabled={!car.available}
                                    style={{marginRight: '10px'}}>Book
                            </button>

                            <button onClick={() => handleReservation(car.id, 'CANCEL')}
                                    disabled={car.available}>Cancel
                            </button>
                        </div>
                    )
                })
            }

            <h3>Cars currently Booked</h3>
            <BookedCars bookings={state.bookings} event={dispatch} bookedCars={state.bookedCars} />
        </div>
    )
}
