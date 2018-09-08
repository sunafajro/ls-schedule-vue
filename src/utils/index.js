import moment from "moment";
moment.locale("ru");

export const createDaysSelectItems = () => {
  const days = [];
  for (let i = 1; i < 8; i++) {
    days.push({
      value: i,
      text: moment()
        .day(i)
        .format("dddd")
    });
  }
  return days;
};

export const createHoursSelectItems = () => {
  const hours = [];
  for (let i = 8; i < 20; i++) {
    hours.push({
      value: i < 10 ? `0${i}` : String(i),
      text: i < 10 ? `0${i}` : String(i)
    });
  }
  return hours;
};

export const createMinutesSelectItems = () => {
  const minutes = [];
  for (let i = 0; i < 60; i = i + 5) {
    minutes.push({
      value: i < 10 ? `0${i}` : String(i),
      text: i < 10 ? `0${i}` : String(i)
    });
  }
  return minutes;
};
