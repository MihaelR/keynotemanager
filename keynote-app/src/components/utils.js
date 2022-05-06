/* Validate event time and date.
   Returns true/false based on funstion attributes.
 */
export const  validateEventDateTime = (startDateTime,endDateTime, currentDateTime) => {
  if (startDateTime < currentDateTime  && currentDateTime< endDateTime) {
    return true
  }
  return false;
}

//Current date time contants.
//Get current date and time.
var date = new Date();

export const currentDate = date.toLocaleDateString('de-DE', { 
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).replace(/[^0-9]/g, '');

export const currentTime = date.toLocaleTimeString('de-DE').replace(/[^0-9]/g, '');

//Get current hours,minutes and date.
export const currentTimeMinutes = currentTime.slice(2, 4);
export const currentTimeHours = currentTime.slice(0, 2);
export const currentDateDay = currentDate.slice(0, 2);
export const currentDateMonth = currentDate.slice(2, 4);
export const currentDateYear = currentDate.slice(4, 8);

