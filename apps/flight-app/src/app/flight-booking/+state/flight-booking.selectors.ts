import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.State>(
  fromFlightBooking.flightBookingFeatureKey
);

export const selectFlights = createSelector(
  // Selectors
  selectFlightBookingState,
  // Projector
  state => state.flights
);
export const selectPassengers = createSelector(
  // Selectors
  selectFlightBookingState,
  // Projector
  state => state.flights
);
export const selectUser = createSelector(
  // Selectors
  selectFlightBookingState,
  // Projector
  state => state.flights
);
export const selectActivePassenger = createSelector(
  // Selectors
  selectFlightBookingState,
  // Projector
  state => state.flights
);
export const selectBookings = createSelector(
  // Selectors
  selectFlightBookingState,
  // Projector
  state => state.flights
);

export const selectFlightsByActiveUser = createSelector(
  // Selectors
  selectFlights,
  /* selectPassengers,
  selectUser, */
  selectActivePassenger,
  selectBookings,
  // Projector
  (flights, activePassenger, bookings) => {

    return {
      firstname: activePassenger.firstname,
      myBookedFlights: [

      ]
    };
  }
);
