//Reviews days and extracts appointments for specific day
export function getAppointmentsForDay(state, day) {
  const dayAppointments = state.days.find((element) => element.name === day);
  if (!dayAppointments) return [];

  //retrieves appointments for the specific day found
  const appointments = dayAppointments.appointments.map((appointmentId) => {
    if (state.appointments[appointmentId]) {
      return state.appointments[appointmentId];
    }
  });

  return appointments;
}

//returns a new object containing the interview data when it receives an object that contains the interviewer
export function getInterview(state, interview) { 
  if (!interview) {
    return null;
  } else {
    const interviewInfo = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer] 
    }; 
    return interviewInfo;
  }
}
