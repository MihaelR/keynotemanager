import React from "react";
import { Link } from "react-router-dom";
import KeynoteModal from "./KeynoteModal";
import {
  validateEventDateTime,
  currentTimeMinutes,
  currentTimeHours,
  currentDateDay,
  currentDateMonth,
  currentDateYear,
  currentDate,
} from "./utils";

const KeynoteRow = (props) => {
  const { id, title, description, speaker, endTime, startDate, startTime } =
    props.keynote;

  const startDateDay = startDate.slice(8, 10);
  const startDateMonth = startDate.slice(5, 7);
  const startDateYear = startDate.slice(0, 4);

  // Start date, enddate and current date and time string in YYYY:MM:DD:hh:mm and hh:mm format.
  const startDateTime = (startDate + startTime).replace(/\D/g, "");
  const endDateTime = (startDate + endTime).replace(/\D/g, "");
  const currentDateTime =
    currentDateYear +
    currentDateMonth +
    currentDateDay +
    currentTimeHours +
    currentTimeMinutes;

  return (
    <div
      className={
        validateEventDateTime(startDateTime, endDateTime, currentDateTime)
          ? "item active"
          : "item"
      }
    >
      <div className="row-cell">{title}</div>

      <div className="row-cell">
        {" "}
        {description.replace("<p>", "").replace("</p>", "")}
      </div>

      <div className="row-cell">{speaker}</div>
      <div className="row-cell">{startTime}</div>
      <div className="row-cell">{endTime}</div>
      <div className="row-cell">
        {startDateDay}-{startDateMonth}-{startDateYear}
      </div>

      <div className="icons row-cell">
        {/* delete icon */}
        <KeynoteModal
          title={title}
          deleteKeynote={() => props.clickHander(id)}
        />

        <Link to={{ pathname: `/edit`, state: { keynote: props.keynote } }}>
          <i
            className="edit alternate outline icon"
            style={{ color: "blue", marginTop: "7px" }}
          ></i>
        </Link>
      </div>
    </div>
  );
};

export default KeynoteRow;
