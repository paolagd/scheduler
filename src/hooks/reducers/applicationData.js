import { getDay } from "../../helpers/selectors";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  const { day, days, appointments, interviewers } = action;

  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day,
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days,
        appointments,
        interviewers,
      };
    case SET_INTERVIEW: {
      const dayAppointments = getDay(state, state.day);

      const spots = dayAppointments.appointments
        .map((appointmentId) => appointments[appointmentId])
        .filter((appointment) => !appointment.interview);

      const dayIndex = dayAppointments.id - 1;
      const spotsAvailable = spots.length;

      //Creating new day with updated spots
      const updatedDay = {
        ...state.days[dayIndex],
        spots: spotsAvailable,
      };

      //New days array with updated information before updated the state
      const days = [...state.days];
      days[dayIndex] = updatedDay;

      return {
        ...state,
        days,
        appointments,
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, reducer };
