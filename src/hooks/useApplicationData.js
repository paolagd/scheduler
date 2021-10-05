import { useState, useEffect } from "react";
import axios from "axios";

import { getDay } from "helpers/selectors";

export default function useApplicationData(baseState) {
  const [state, setState] = useState(
    baseState || {
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {},
    }
  );
  
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
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { ...appointment })
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      })
      .then(() => {
        updateSpots();
      });
  };

  //Deletes an interview from an appointment(appointment:id), setting the value to null.
  const deleteInterview = (id) => {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      })
      .then(() => {
        updateSpots(false);
      });
  };

  const updateSpots = (add = true) => {
    const dayAppointments = getDay(state, state.day);

    const spots = dayAppointments.appointments
      .map((appointmentId) => state.appointments[appointmentId])
      .filter((appointment) => !appointment.interview);

    const dayIndex = dayAppointments.id - 1;
    let spotsAvailable = spots.length;

    //if called from delete spots have to be reduced by 1
    if (!add){
      spotsAvailable+=1;
    }else{
      spotsAvailable-=1;
    }

    //Creating new day with updated spots
    const updatedDay = {
      ...state.days[dayIndex],
      spots: spotsAvailable,
    };

    //New days array with updated information before updated the state
    const days = [...state.days];
    days[dayIndex] = updatedDay;

    setState((prev) => ({ ...prev, days }));
  };

  //Updates current day being reviewed (sidebar)
  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, deleteInterview };
}
