import moment from "moment";
moment.locale("ru");

export const createDaysSelectItems = () => {
  const days = [];
  for (let i = 1; i < 8; i++) {
    days.push({
      value: String(i),
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

export const prepareRows = rows => {
  const hours = [];
  if (Object.keys(rows).length) {
    Object.keys(rows).forEach(item => {
      const languages = Object.keys(rows[item].languages);
      languages.forEach((l, i) => {
        hours.push({
          id: `${item}-${l}`,
          teacher: rows[item].teacher,
          language: rows[item].languages[l].name,
          hours: rows[item].languages[l].hours,
          rowspan: languages.length > 1 ? (i === 0 ? languages.length : 1) : 0
        });
      });
    });
  }
  return hours;
};

/**
 * возвращает url с параметрами
 * @param {string} url
 * @param {Object} params
 * @returns {string}
 */
export const prepareUrlParams = (url, params) => {
  const args = [];
  Object.keys(params).forEach(i => {
    if (params[i]) {
      args.push(`${i}=${params[i]}`);
    }
  });
  return args.length ? `${url}?${args.join("&")}` : url;
};
