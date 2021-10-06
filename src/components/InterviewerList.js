import React from "react";
import PropTypes from "prop-types";

import "components/InterviewerList.scss";

import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  const interviewerItems = interviewers.map((cInterviewer) => (
    <InterviewerListItem
      key={cInterviewer.id}
      name={cInterviewer.name}
      avatar={cInterviewer.avatar}
      selected={cInterviewer.id === value}
      onChange={(event) => onChange(cInterviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerItems}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
