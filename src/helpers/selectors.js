//Reviews days and extracts appointments for specific day
export function getAppointmentsForDay(state, day) {
  if (!state.days) {
    return [];
  }
  const dayAppointments = state.days.find((element) => element.name === day);
  if (!dayAppointments) return [];

  //Reviews the Daily appointments returning the matching appointments information in the state
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
      interviewer: state.interviewers[interview.interviewer],
    };
    return interviewInfo;
  }
}

//Reviews days and returns an array of interviewers for specific day
export function getInterviewersForDay(state, day) {
  if (!state.days) {
    return [];
  }
   
  const dayInterviewers = state.days.find((element) => element.name === day); 
  if (!dayInterviewers || !dayInterviewers.interviewers) return [];

  const interviewers = dayInterviewers.interviewers.map((interviewerId) => {
    if (state.interviewers[interviewerId]) {
      return state.interviewers[interviewerId];
    }
  });

  return interviewers;
}
