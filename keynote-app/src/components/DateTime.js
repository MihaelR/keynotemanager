import React, { useState, useEffect } from "react";
export const DateTime = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <p> Current Time is: {date.toLocaleTimeString()}</p>
      <p> Here you can see streams from : {date.toLocaleDateString()}</p>
    </div>
  );
};

export default DateTime;
