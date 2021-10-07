import { useEffect, useReducer } from "react";
import axios from "axios";

import {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  reducer,
} from "./reducers/applicationData";

export default function useApplicationData(baseState) {
  const initialState = baseState || {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  //Loads information from API and updates state
  useEffect(() => {
    const days = axios.get("/api/days");
    const appointments = axios.get("/api/appointments");
    const interviewers = axios.get("/api/interviewers");

    Promise.all([days, appointments, interviewers]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatch({
        type: SET_APPLICATION_DATA,
        days,
        appointments,
        interviewers,
      });
    });
  }, []);

  //Updates an already existing appointment record with a new interview.
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { ...appointment }).then(() => {
      dispatch({ type: SET_INTERVIEW, appointments });
    });
  };

  //Deletes an interview from an appointment(appointment:id), setting the value to null.
  const deleteInterview = (id) => {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, appointments });
    });
  };

  //Updates current day being reviewed (sidebar)
  const setDay = (day) => dispatch({ type: SET_DAY, day });

  return { state, setDay, bookInterview, deleteInterview };
}
