import type {Booking, Car} from "../types/carRental.types";
import {useEffect} from "react";

export const BookedCars = ({bookings, event, bookedCars}: {
    bookings: Booking[],
    event: (action: ({ type: "CREATE_RESERVATION"; payload: { id: number } } | {
        type: "CANCEL_RESERVATION";
        payload: { id: number }
    } | { type: "ADD_FLEET"; payload: { car: Omit<Car, "id"> } } | {
        type: "GET_FLEET_BY_ID";
        payload: { id: number }
    })) => void,
    bookedCars?: Car[]
}) => {
    useEffect(() => {
        bookings.forEach(booking => {
            event({type: "GET_FLEET_BY_ID", payload: {id: booking.id}})
        })
    }, [bookings]);

    if (bookings.length === 0) {
        return <div>
            <p>No bookings</p>
        </div>
    }

    console.log(bookedCars)

    return (
        <div>
           {bookedCars && bookedCars.length > 0 ? (
                <ul>
                    {bookedCars.map(car => (
                        <li key={car.id}>{car.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No booked cars</p>
            )}
        </div>
    );

}