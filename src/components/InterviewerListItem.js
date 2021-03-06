import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { name, avatar, onChange, selected } = props;

  var itemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={itemClass} onClick={onChange}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
