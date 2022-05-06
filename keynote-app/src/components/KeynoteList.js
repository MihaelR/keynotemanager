import React, { useRef } from "react";
import { Link } from "react-router-dom";
import KeynoteRow from "./KeynoteRow";
import DateTime from "./DateTime";
import {
  currentDateYear,
  currentDateMonth,
  currentDateDay,
  currentTimeHours,
  currentTimeMinutes,
} from "./utils";

const KeynoteList = (props) => {
  const inputElementRef = useRef("");

  const deleteKeynoteHandler = (id) => {
    props.getKeynoteId(id);
  };

  // Keynote live data and time in YYYY:MM:DD
  const keynoteLiveTime = currentTimeMinutes + currentTimeHours;
  const keynoteLiveDate = currentDateYear + currentDateMonth + currentDateDay;

  console.log("keynotes", props.keynotes);

  // Sort keynotes by date and filter out all the keynotes that already happend.
  const sortedKeynotes = props.keynotes
    .slice()
    // Sort by startDate
    .sort(
      (a, b) =>
        a.startDate.replace(/\D/g, "") - b.startDate.replace(/\D/g, "") ||
        a.startTime.replace(/\D/g, "") - b.startTime.replace(/\D/g, "")
    )
    //Filter out all events that passed.
    .filter(
      (keynote) => keynote.startDate.replace(/\D/g, "") >= keynoteLiveDate
    );

  const renderKeynoteList = sortedKeynotes.map((keynote) => {
    return (
      <KeynoteRow
        keynote={keynote}
        clickHander={deleteKeynoteHandler}
        key={keynote.id}
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputElementRef.current.value);
  };

  return (
    <div className="main">
      <h2>
        Keynote List
        <Link to="/add">
          <button className="ui button blue right">Add Keynote</button>
        </Link>
      </h2>
      {/* Search */}
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputElementRef}
            type="text"
            placeholder="Search keynote"
            value={props.term}
            onChange={getSearchTerm}
            className="prompt"
          />
        </div>
      </div>
      <DateTime />
      {/* List */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          fontSize: "20px",
          alignItems: "center",
          width: "100%",
          height: "50px",

          border: "2px solid #DEDEDF",
          borderTop: "3px solid #DEDEDF",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: "calc(100% / 7)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          title
        </div>
        <div
          style={{
            width: "calc(100% / 7)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          description
        </div>
        <div
          style={{
            width: "calc(100% / 7)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          speaker
        </div>
        <div
          style={{
            width: "calc(100% / 7)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          start time
        </div>
        <div
          style={{
            width: "calc(100% / 7)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          end
        </div>
        <div
          style={{
            width: "calc(100% / 7)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          date
        </div>
        <div
          style={{
            width: "calc(100% / 7)",
            display: "flex",
            justifyContent: "center",
          }}
        ></div>
      </div>
      <div
        className="ui celled list"
        style={{
          border: "2px solid #DEDEDF",
          marginTop: "0px",
        }}
      >
        {renderKeynoteList.length > 0
          ? renderKeynoteList
          : "No keynotes available."}
      </div>
    </div>
  );
};

export default KeynoteList;
