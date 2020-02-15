import moment from 'moment';

moment.locale('ru');

/**
 * объект со списком дней недели
 */
export const createDaysObjectItems = () => {
  const days = {};
  for (let i = 1; i < 8; i++) {
    days[String(i)] = moment()
      .day(i)
      .format('dddd');
  }
  return days;
};

/**
 * массив со списком дней недели
 */
export const createDaysSelectItems = () => {
  const days = [];
  for (let i = 1; i < 8; i++) {
    days.push({
      value: String(i),
      text: moment()
        .day(i)
        .format('dddd'),
    });
  }
  return days;
};

/**
 * массив со списком часов
 */
export const createHoursSelectItems = () => {
  const hours = [];
  for (let i = 8; i < 22; i++) {
    hours.push({
      value: i < 10 ? '0' + i : String(i),
      text: i < 10 ? '0' + i : String(i),
    });
  }
  return hours;
};

/**
 * массив со списком минут, с шагом 5
 */
export const createMinutesSelectItems = () => {
  const minutes = [];
  for (let i = 0; i < 60; i = i + 5) {
    minutes.push({
      value: i < 10 ? '0' + i : String(i),
      text: i < 10 ? '0' + i : String(i),
    });
  }
  return minutes;
};

/**
 * подготавливает и возвращает массив данных почасовки для вывода в таблице
 * @param {Array} rows
 */
export const prepareRows = rows => {
  const hours = [];
  if (Object.keys(rows).length) {
    Object.keys(rows).forEach(item => {
      const languages = Object.keys(rows[item].languages);
      languages.forEach((l, i) => {
        hours.push({
          id: item + '-' + l,
          teacher: rows[item].teacher,
          language: rows[item].languages[l].name,
          hoursByService: rows[item].languages[l].hoursByService,
          hoursBySchedule: rows[item].languages[l].hoursBySchedule,
          actualHours: rows[item].actualHours,
          rowspan: languages.length > 1 ? (i === 0 ? languages.length : 1) : 0,
        });
      });
    });
  }
  return hours;
};
