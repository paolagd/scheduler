import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { setDay, name, spots, selected } = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots,
  });

  const formatSpots = (spots) => {
    if (spots === 1) {
      return `${spots} spot remaining`;
    }
    if (spots > 1) {
      return `${spots} spots remaining`;
    }

    return `no spots remaining`;
  };

  return (
    <li className={dayClass} onClick={() => setDay(name)} data-testid={name}> 
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
