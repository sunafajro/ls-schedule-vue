import { createStore } from 'vuex'

import axios from 'axios';
import Noty from 'noty';
import { createDaysSelectItems } from '../utils';
import moment from 'moment';

const el = document.getElementById('app');
const urlPrefix = el.dataset.urlPrefix;

export default createStore({
  state: {
    addedLessons: [],
    breadcrumbs: {},
    csrfToken: null,
    defaultFilter: {
      did: null,
      oid: null,
      tid: null,
    },
    filterParams: {},
    groups: [],
    hoursColumns: [],
    hoursRows: [],
    mode: el.dataset.mode,
    urlPrefix,
    navLinks: [],
    offices: [],
    rooms: [],
    scheduleActions: {
      create: false,
      delete: false,
      hours: false,
      update: false,
      view: false,
    },
    scheduleFilters: {
      days: [],
      eduages: [],
      eduforms: [],
      languages: [],
      offices: [],
      teachers: [],
    },
    scheduleColumns: [],
    scheduleRows: [],
    teachers: [],
    user: null,
  },
  mutations: {
    updateAddedLessons(state, data) {
      state.addedLessons = data;
    },
    updateCSRFToken(state, token) {
      state.csrfToken = token;
    },
    updateNavLinks(state, data) {
      state.navLinks = data;
    },
    updateOffices(state, data) {
      state.offices = data;
    },
    updateScheduleActions(state, data) {
      state.scheduleActions = data;
    },
    updateScheduleFilters(state, data) {
      state.scheduleFilters = data;
    },
    updateScheduleLessons(state, { columns, lessons, params }) {
      state.scheduleColumns = columns;
      state.scheduleRows = lessons;
      state.filterParams = params;
    },
    updateRooms(state, data) {
      state.rooms = data;
    },
    updateTeacherHours(state, { columns, hours }) {
      state.hoursColumns = columns;
      state.hoursRows = hours;
    },
    updateTeachers(state, data) {
      state.teachers = data;
    },
    updateTeacherGroups(state, data) {
      state.groups = data;
    },
    updateUserData(state, data) {
      state.user = data;
      if (Object.prototype.hasOwnProperty.call(data, 'roleId')) {
        const filter = { ...state.defaultFilter };
        if (data.roleId !== '4' && data.roleId !== '5') {
          filter.did = moment().isoWeekday();
        }
        if (data.roleId === '4') {
          filter.oid = data.officeId;
        }
        if (data.roleId === '5') {
          filter.tid = data.teacherId;
        }
        state.defaultFilter = { ...filter };
      }
    },
  },
  actions: {
    /**
     * добавление записи в расписание
     */
    async createScheduleLesson({ dispatch, commit, state }, { schedule }) {
      try {
        const { data } = await axios.post(
          `${urlPrefix}/app/schedule/create`,
          JSON.stringify({ ...state.csrfToken, ...schedule }),
          { headers: { 'Content-Type': 'application/json' } }
        );
        dispatch('showNotification', {
          text: data.message,
          type: 'success',
        });
        schedule.Schedule.id = data.id;
        const newAddedLessons = [...state.addedLessons];
        newAddedLessons.push(schedule.Schedule);
        commit('updateAddedLessons', newAddedLessons);
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Не удалось добавить занятие в расписание!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
        throw new Error('Не удалось добавить занятие в расписание!');
      }
    },
    async updateScheduleLesson({ dispatch, state }, { id, schedule }) {
      try {
        const { data } = await axios.post(
          `${urlPrefix}/app/schedule/update?id=${id}`,
          JSON.stringify({ ...state.csrfToken, ...schedule }),
          { headers: { 'Content-Type': 'application/json' } }
        );
        dispatch('showNotification', {
          text: data.message,
          type: 'success',
        });
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка изменения занятия в расписании!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
        throw new Error('Ошибка изменения занятия в расписании!');
      }
    },
    /**
     * удаление записи из расписания
     */
    async deleteScheduleLesson({ dispatch, commit, state }, { id, params }) {
      try {
        const { data } = await axios.post(
          `${urlPrefix}/app/schedule/delete?id=${id}`,
          JSON.stringify({ ...state.csrfToken, ...params }),
          { headers: { 'Content-Type': 'application/json' } }
        );
        dispatch('showNotification', {
          text: data.message,
          type: 'success',
        });
        commit(
          'updateAddedLessons',
          state.addedLessons.filter(lesson => lesson.id !== id)
        );
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка удаления занятия из расписания!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
        throw new Error('Ошибка удаления занятия из расписания!');
      }
    },
    /**
     * csrf токен для валидации post запросов
     */
    async getCSRFToken({ commit, dispatch }) {
      try {
        const { data } = await axios.get(`${urlPrefix}/site/csrf`);
        commit('updateCSRFToken', data);
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка запроса к серверу!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
        throw new Error('Ошибка запроса к серверу!');
      }
    },
    async getNavLinks({ commit, dispatch, state }) {
      try {
        const { data: nav } = await axios.post(
          `${urlPrefix}/site/nav`,
          JSON.stringify({ ...state.csrfToken, ...{ type: 'all' } })
        );
        commit('updateNavLinks', nav.navElements);
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка загрузки элементов меню навигации! ' +
            (e && e.message ? e.message : ''),
          type: 'error',
        });
      }
    },
    /**
     * список офисов
     */
    async getOffices({ commit, dispatch }) {
      try {
        const { data } = await axios.get(`${urlPrefix}/app/schedule/offices`);
        commit('updateOffices', data.offices);
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка получения списка офисов!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
        throw new Error('Ошибка получения списка офисов!');
      }
    },
    /**
     * список кабинетов офиса
     */
    async getOfficeRooms({ commit, dispatch }, { id }) {
      try {
        const { data } = await axios.get(`${urlPrefix}/app/schedule/rooms?oid=${id}`);
        commit('updateRooms', data.rooms);
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка получения списка кабинетов офиса!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
        throw new Error('Ошибка получения списка кабинетов офиса!');
      }
    },
    /**
     * список действий пользователя
     */
    async getScheduleActions({ commit, dispatch }) {
      try {
        const { data } = await axios.get(`${urlPrefix}/app/schedule/actions`);
        commit('updateScheduleActions', data.actions);
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка получения списка прав пользователя!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
        throw new Error('Ошибка получения списка прав пользователя!');
      }
    },
    /**
     * список фильтров расписания
     */
    async getScheduleFilters({ commit, dispatch }) {
      try {
        const { data } = await axios.get(`${urlPrefix}/app/schedule/filters`);
        commit('updateScheduleFilters', {
          ...data.filters,
          ...{ days: createDaysSelectItems() },
        });
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка получения фильтров расписания!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
        throw new Error('Ошибка получения фильтров расписания!');
      }
    },
    /**
     * список занятий в расписании
     */
    async getScheduleLessons({ commit, dispatch }, params = {}) {
      try {
        const urlParams = Object.keys(params).reduce((a, v) => {
          a.push(v + '=' + (params[v] ? params[v] : ''));
          return a;
        }, []);
        const { data } = await axios.get(
          `${urlPrefix}/app/schedule/lessons` +
            (Array.isArray(urlParams) && urlParams.length
              ? '?' + urlParams.join('&')
              : '')
        );
        data.params = { ...params };
        commit('updateScheduleLessons', data);
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка получения расписания занятий!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
        throw new Error('Ошибка получения расписания занятий!');
      }
    },
    /**
     * список преподавателей
     */
    async getTeachers({ commit, dispatch }) {
      try {
        const { data } = await axios.get(`${urlPrefix}/app/schedule/teachers`);
        commit('updateTeachers', data.teachers);
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка получения списка преподавателей!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
        throw new Error('Ошибка получения списка преподавателей!');
      }
    },
    /**
     * список групп преподавателя
     */
    async getTeacherGroups({ commit, dispatch }, { id }) {
      try {
        const { data } = await axios.get(`${urlPrefix}/app/schedule/groups?tid=${id}`);
        // модифицируем массив
        const groups = data.groups.map(item => {
          return {
            value: item.value,
            text: '#' + item.value + ' ' + item.text,
          };
        });
        commit('updateTeacherGroups', groups);
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка получения списка групп преподавателя!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
        throw new Error('Ошибка получения списка групп преподавателя!');
      }
    },
    /**
     * список почасовок преподавателей
     */
    async getTeacherHours({ commit, dispatch }, params = {}) {
      try {
        const urlParams = Object.keys(params).reduce((a, v) => {
          a.push(v + '=' + (params[v] ? params[v] : ''));
          return a;
        }, []);
        const { data } = await axios.get(
          `${urlPrefix}/app/schedule/hours` +
            (Array.isArray(urlParams) && urlParams.length
              ? '?' + urlParams.join('&')
              : '')
        );
        commit('updateTeacherHours', {
          columns: data.columns,
          hours: data.hours,
        });
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка фильтрации почасовок преподавателей!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
        throw new Error('Ошибка фильтрации почасовок преподавателей!');
      }
    },
    /**
     * информация о текущем пользователе
     */
    async getUserInfo({ commit, dispatch }) {
      try {
        const { data } = await axios.get(`${urlPrefix}/app/user/info`);
        commit('updateUserData', data.userData);
      } catch (e) {
        dispatch('showNotification', {
          text:
            'Ошибка получения сведений о пользователе!' +
            (e && e.message ? ' ' + e.message : ''),
          type: 'error',
        });
        throw new Error('Ошибка получения сведений о пользователе!');
      }
    },
    /**
     * всплывающее уведомление
     * types: alert, success, warning, error, info/information
     * @param {string} type
     * @param {string} text
     */
    showNotification(args, { text, type }) {
      new Noty({
        theme: 'bootstrap-v3',
        text: text,
        timeout: 3000,
        type: type,
        progressBar: false,
      }).show();
    },
  },
  modules: {
  }
})
