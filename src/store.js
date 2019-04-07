import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Noty from 'noty';
import { createDaysSelectItems } from './utils';
import moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    addedLessons: [],
    csrfToken: null,
    defaultFilter: {
      did: moment().isoWeekday(),
      oid: null,
      tid: null,
    },
    filterParams: {},
    groups: [],
    hoursColumns: [],
    hoursRows: [],
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
      const filter = { ...this.defaultFilter };
      if (data.hasOwnProperty('roleId') && data.roleId === '5') {
        filter.tid = data.teacherId;
      }
      if (data.hasOwnProperty('roleId') && data.roleId === '4') {
        filter.oid = data.officeId;
      }
      this.defaultFilter = { ...filter };
    },
  },
  actions: {
    /**
     * добавление записи в расписание
     */
    async createScheduleLesson({ dispatch, commit, state }, { schedule }) {
      try {
        const { data } = await axios.post(
          '/api/schedule/create',
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
    /**
     * удаление записи из расписания
     */
    async deleteScheduleLesson({ dispatch, commit, state }, { id, params }) {
      try {
        const { data } = await axios.post(
          '/api/schedule/delete?id=' + id,
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
        const { data } = await axios.get('/site/csrf');
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
    /**
     * список офисов
     */
    async getOffices({ commit, dispatch }) {
      try {
        const { data } = await axios.get('/api/schedule/offices');
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
        const { data } = await axios.get('/api/schedule/rooms?oid=' + id);
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
        const { data } = await axios.get('/api/schedule/actions');
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
        const { data } = await axios.get('/api/schedule/filters');
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
          '/api/schedule/lessons' +
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
        const { data } = await axios.get('/api/schedule/teachers');
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
        const { data } = await axios.get('/api/schedule/groups?tid=' + id);
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
          '/api/schedule/hours' + urlParams.join('&')
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
        const { data } = await axios.get('/api/user/info');
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
});
