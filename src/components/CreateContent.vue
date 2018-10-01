<template>
  <div class="col-sm-12 col-md-10 col-lg-10 col-xl-10">
    <form @submit.prevent="onSubmit" style="margin-bottom: 2rem">
      <div style="margin-bottom: 0.5rem">
        <b>Преподаватель:</b><span style="color: red">*</span>
        <select class="form-control input-sm" @change="getTeacherGroups" v-model="formData.selectedTeacher">
          <option :key="`opt-teacher-${i}`" :value="option.value" v-for="(option, i) in optionsTeacher">{{ option.text }}</option> 
        </select>
      </div>
      <div style="margin-bottom: 0.5rem">
        <b>Группа:</b><span style="color: red">*</span>
        <select class="form-control input-sm" :disabled="!groups.length" v-model="formData.selectedGroup">
          <option :key="`opt-groups-${i}`" :value="option.value" v-for="(option, i) in optionsGroup">{{ option.text }}</option>
        </select>
      </div>
      <div style="margin-bottom: 0.5rem">
        <b>Офис:</b><span style="color: red">*</span>
        <select class="form-control input-sm" @change="getOfficeRooms" v-model="formData.selectedOffice">
          <option :key="`opt-offices-${i}`" :value="option.value" v-for="(option, i) in optionsOffice">{{ option.text }}</option>
        </select>
      </div>
      <div style="margin-bottom: 0.5rem">
        <b>Кабинет:</b><span style="color: red">*</span>
        <select class="form-control input-sm" :disabled="!rooms.length" v-model="formData.selectedRoom">
          <option :key="`opt-rooms-${i}`" :value="option.value" v-for="(option, i) in optionsRoom">{{ option.text }}</option>
        </select>
      </div>
      <div>
        <b>Время начала:</b><span style="color: red">*</span>
        <div class="row">
          <div class="col-sm-6" style="margin-bottom: 0.5rem">
            <select class="form-control input-sm" @change="adjustEndHour" v-model="formData.startHour">
              <option :key="`opt-start-hours-${i}`" :value="option.value" v-for="(option, i) in optionsHours">{{ option.text }}</option>
            </select>
          </div>
          <div class="col-sm-6" style="margin-bottom: 0.5rem">
            <select class="form-control input-sm" @change="adjustEndMinute" v-model="formData.startMinute">
              <option :key="`opt-start-minutes-${i}`" :value="option.value" v-for="(option, i) in optionsMinutes">{{ option.text }}</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <b>Время конца:</b><span style="color: red">*</span>
        <div class="row">
          <div class="col-sm-6" style="margin-bottom: 0.5rem">
            <select class="form-control input-sm" v-model="formData.endHour">
              <option :key="`opt-end-hours-${i}`" :value="option.value" v-for="(option, i) in optionsHours">{{ option.text }}</option>
            </select>  
          </div>
          <div class="col-sm-6" style="margin-bottom: 0.5rem">
            <select class="form-control input-sm" v-model="formData.endMinute">
              <option :key="`opt-end-minutes-${i}`" :value="option.value" v-for="(option, i) in optionsMinutes">{{ option.text }}</option>
            </select>
          </div>
        </div>
      </div>
      <div style="margin-bottom: 0.5rem">
        <b>День недели:</b><span style="color: red">*</span>
        <select class="form-control input-sm" v-model="formData.selectedDay">
          <option :key="`opt-days-${i}`" :value="option.value" v-for="(option, i) in optionsDay">{{ option.text }}</option> 
        </select>
      </div>
      <div style="margin-bottom: 0.5rem">
        <b>Примечания:</b>
        <input class="form-control input-sm" v-model="formData.notes" />
      </div>
      <div style="margin-bottom: 0.5rem">
        <button class="btn btn-info" type="submit" style="margin-right: 0.5rem"><i class="fa fa-save" aria-hidden="true"></i> Сохранить</button>
        <button class="btn btn-warning" type="button" @click.prevent="clearForm"><i class="fa fa-eraser" aria-hidden="true"></i> Очистить</button>
      </div>
    </form>
    <div>
      <h4>Добавленные занятия:</h4>
      <table class="table table-striped table-hover table-bordered table-condensed small">
        <thead>
          <tr>
            <th>День</th>
            <th>Офис</th>
            <th>Кабинет</th>
            <th>Время</th>
            <th>Преподаватель</th>
            <th>Группа</th>
            <th>Примечания</th>
            <th>Действ.</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(item, index) in addedLessons">
            <td>{{ idToValue(item.calc_denned,'day') }}</td>
            <td>{{ idToValue(item.calc_office, 'office') }}</td>
            <td>{{ idToValue(item.calc_cabinetoffice, 'room') }}</td>
            <td>{{ item.time_begin }} - {{ item.time_end }}</td>
            <td>{{ idToValue(item.calc_teacher, 'teacher') }}</td>
            <td>{{ idToValue(item.calc_groupteacher, 'group') }}</td>
            <td>{{ item.notes }}</td>
            <td><i class="fa fa-trash" aria-hidden="true"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import {
  createDaysSelectItems,
  createHoursSelectItems,
  createMinutesSelectItems,
  getCsrfTocken,
  notify
} from "../utils";

const defaultState = {
  endHour: null,
  endMinute: null,
  selectedDay: null,
  selectedOffice: null,
  selectedGroup: null,
  selectedRoom: null,
  selectedTeacher: null,
  startHour: null,
  startMinute: null,
  notes: ""
};

export default {
  computed: {
    optionsDay() {
      const options = [{ value: null, text: "-выбрать-" }].concat(
        createDaysSelectItems()
      );
      return options;
    },
    optionsHours() {
      const options = [{ value: null, text: "-часы-" }].concat(
        createHoursSelectItems()
      );
      return options;
    },
    optionsMinutes() {
      const options = [{ value: null, text: "-минуты-" }].concat(
        createMinutesSelectItems()
      );
      return options;
    },
    optionsOffice() {
      const options = [{ value: null, text: "-выбрать-" }].concat(
        Array.isArray(this.offices) ? this.offices : []
      );
      return options;
    },
    optionsRoom() {
      const options = [{ value: null, text: "-выбрать-" }].concat(
        Array.isArray(this.rooms) ? this.rooms : []
      );
      return options;
    },
    optionsGroup() {
      const options = [{ value: null, text: "-выбрать-" }].concat(
        Array.isArray(this.groups) ? this.groups : []
      );
      return options;
    },
    optionsTeacher() {
      const options = [{ value: null, text: "-выбрать-" }].concat(
        Array.isArray(this.teachers) ? this.teachers : []
      );
      return options;
    }
  },
  data() {
    return {
      addedLessons: [],
      formData: { ...defaultState }
    };
  },
  methods: {
    adjustEndHour(e) {
      this.adjustEndTime(e.target.value, this.formData.startMinute);
    },
    adjustEndMinute(e) {
      this.adjustEndTime(this.formData.startHour, e.target.value);
    },
    adjustEndTime(startHour, startMinute) {
      if (startHour && startMinute) {
        const startDate = moment();
        startDate.set("hour", parseInt(startHour));
        startDate.set("minute", parseInt(startMinute));
        const endDate = startDate.add(1, "h");
        this.formData.endHour =
          endDate.get("hour") < 10
            ? `0${endDate.get("hour")}`
            : String(endDate.get("hour"));
        this.formData.endMinute =
          endDate.get("minute") < 10
            ? `0${endDate.get("minute")}`
            : String(endDate.get("minute"));
      }
    },
    clearForm() {
      this.formData = { ...defaultState };
    },
    async createLesson(schedule = {}) {
      const token = await getCsrfTocken();
      const body = { ...token, ...schedule };
      try {
        const { data } = await axios.post(
          "/schedule/create",
          JSON.stringify(body),
          {
            headers: { "Content-Type": "application/json" }
          }
        );
        this.addedLessons.push(schedule.Schedule);
        notify("success", data.message);
      } catch (e) {
        notify("error", "Не удалось добавить занятие в расписание!");
        throw new Error("Не удалось добавить занятие в расписание!");
      }
    },
    idToValue(id, key) {
      let result = "";
      switch (key) {
        case "day":
          {
            const tmp = this.optionsDay.filter(item => item.value === id)[0];
            result = tmp ? tmp.text : "";
          }
          break;
        case "office":
          {
            const tmp = this.optionsOffice.filter(item => item.value === id)[0];
            result = tmp ? tmp.text : "";
          }
          break;
        case "room":
          {
            const tmp = this.optionsRoom.filter(item => item.value === id)[0];
            result = tmp ? tmp.text : "";
          }
          break;
        case "teacher":
          {
            const tmp = this.optionsTeacher.filter(item => item.value === id)[0];
            result = tmp ? tmp.text : "";
          }
          break;
        case "group":
          {
            const tmp = this.optionsGroup.filter(item => item.value === id)[0];
            result = tmp ? tmp.text : "";
          }
          break;
      }
      return result;
    },
    onSubmit() {
      let validForm = true;
      const data = {
        Schedule: {}
      };
      if (this.formData.selectedTeacher) {
        data.Schedule.calc_teacher = this.formData.selectedTeacher;
      } else {
        validForm = false;
      }
      if (this.formData.selectedGroup) {
        data.Schedule.calc_groupteacher = this.formData.selectedGroup;
      } else {
        validForm = false;
      }
      if (this.formData.selectedOffice) {
        data.Schedule.calc_office = this.formData.selectedOffice;
      } else {
        validForm = false;
      }
      if (this.formData.selectedRoom) {
        data.Schedule.calc_cabinetoffice = this.formData.selectedRoom;
      } else {
        validForm = false;
      }
      if (this.formData.startHour && this.formData.startMinute) {
        data.Schedule.time_begin = `${this.formData.startHour}:${
          this.formData.startMinute
        }`;
      } else {
        validForm = false;
      }
      if (this.formData.endHour && this.formData.endMinute) {
        data.Schedule.time_end = `${this.formData.endHour}:${
          this.formData.endMinute
        }`;
      } else {
        validForm = false;
      }
      if (this.formData.selectedDay) {
        data.Schedule.calc_denned = this.formData.selectedDay;
      } else {
        validForm = false;
      }
      if (validForm) {
        data.Schedule.notes = this.formData.notes;
        this.addedLessons.push(data.Schedule);
        //this.createLesson(data);
      } else {
        notify("error", "Заполнены не все поля формы!");
      }
    }
  },
  props: {
    getOfficeRooms: {
      required: true,
      type: Function
    },
    getTeacherGroups: {
      required: true,
      type: Function
    },
    groups: {
      required: true,
      type: Array
    },
    offices: {
      required: true,
      type: Array
    },
    rooms: {
      required: true,
      type: Array
    },
    teachers: {
      required: true,
      type: Array
    }
  }
};
</script>