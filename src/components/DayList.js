import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { day, setDay, days } = props;

  const dayItem = days.map((cDay) => (
    <DayListItem
      key={cDay.id}
      name={cDay.name}
      spots={cDay.spots}
      selected={cDay.name === day}
      setDay={setDay}
    />
  ));

  return <ul>{dayItem}</ul>;
}
