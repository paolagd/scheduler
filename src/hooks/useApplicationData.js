import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(baseState) {
  const [state, setState] = useState(baseState || {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //Loads information from API and updates state
  useEffect(() => {
    const days = axios.get("/api/days");
    const appointments = axios.get("/api/appointments");
    const interviewers = axios.get("/api/interviewers");

    Promise.all([days, appointments, interviewers]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //Updates an already existing appointment record with a new interview.
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { ...appointment }).then(() => {
      setState({
        ...state,
        appointments,
      });
    });
  }

  //Deletes an interview from an appointment(appointment:id), setting the value to null.
  const deleteInterview = function(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
      });
    });
  }

  //Updates current day being reviewed (sidebar)
  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, deleteInterview };
}
