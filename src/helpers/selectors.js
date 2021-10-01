//Reviews days and extracts appointments for specific day
export function getAppointmentsForDay(state, day) { 

  const dayAppointments = state.days.find((element) => element.name === day);
  if(!dayAppointments) return [];

  const appointments = dayAppointments.appointments.map(appointmentId => {
    if (state.appointments[appointmentId]){
      return state.appointments[appointmentId];
    }
  })

  return appointments;
} 