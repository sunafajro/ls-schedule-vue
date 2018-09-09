<template>
  <div class="col-sm-12 col-md-10 col-lg-10 col-xl-10">
    <form>
        <b>Преподаватель:</b>
        <select class="form-control form-control-sm custom-select custom-select-sm schedule-create-form-margin" @change="getTeacherGroups" v-model="selectedTeacher">
          <option :key="`opt-teacher-${i}`" :value="option.value" v-for="(option, i) in optionsTeacher">{{ option.text }}</option> 
        </select>
        <b>Группа:</b>
        <select class="form-control form-control-sm custom-select custom-select-sm schedule-create-form-margin" :disabled="!groups.length" v-model="selectedGroup">
          <option :key="`opt-groups-${i}`" :value="option.value" v-for="(option, i) in optionsGroup">{{ option.text }}</option>
        </select>
        <b>Офис:</b>
        <select class="form-control form-control-sm custom-select custom-select-sm schedule-create-form-margin" @change="getOfficeRooms" v-model="selectedOffice">
          <option :key="`opt-offices-${i}`" :value="option.value" v-for="(option, i) in optionsOffice">{{ option.text }}</option>
        </select>
        <b>Кабинет:</b>
        <select class="form-control form-control-sm custom-select custom-select-sm schedule-create-form-margin" :disabled="!rooms.length" v-model="selectedRoom">
          <option :key="`opt-rooms-${i}`" :value="option.value" v-for="(option, i) in optionsRoom">{{ option.text }}</option>
        </select>
        <b>Время начала:</b>
        <div class="row">
          <div class="col">
            <select class="form-control form-control-sm custom-select custom-select-sm schedule-create-form-margin" @change="adjustEndHour" v-model="startHour">
              <option :key="`opt-start-hours-${i}`" :value="option.value" v-for="(option, i) in optionsHours">{{ option.text }}</option>
            </select>
          </div>
          <div class="col">
            <select class="form-control form-control-sm custom-select custom-select-sm schedule-create-form-margin" @change="adjustEndMinute" v-model="startMinute">
              <option :key="`opt-start-minutes-${i}`" :value="option.value" v-for="(option, i) in optionsMinutes">{{ option.text }}</option>
            </select>
          </div>
        </div>
        <b>Время конца:</b>
        <div class="row">
          <div class="col">
            <select class="form-control form-control-sm custom-select custom-select-sm schedule-create-form-margin" v-model="endHour">
              <option :key="`opt-end-hours-${i}`" :value="option.value" v-for="(option, i) in optionsHours">{{ option.text }}</option>
            </select>  
          </div>
          <div class="col">
            <select class="form-control form-control-sm custom-select custom-select-sm schedule-create-form-margin" v-model="endMinute">
              <option :key="`opt-end-minutes-${i}`" :value="option.value" v-for="(option, i) in optionsMinutes">{{ option.text }}</option>
            </select>
          </div>
        </div>
        <b>День недели:</b>
        <select class="form-control form-control-sm custom-select custom-select-sm schedule-create-form-margin" v-model="selectedDay">
          <option :key="`opt-days-${i}`" :value="option.value" v-for="(option, i) in optionsDay">{{ option.text }}</option> 
        </select>
        <button class="btn btn-success" type="button">Создать</button>
    </form>
  </div>
</template>

<script>
import moment from "moment";
import {
  createDaysSelectItems,
  createHoursSelectItems,
  createMinutesSelectItems
} from "../utils";

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
      endHour: null,
      endMinute: null,
      selectedDay: null,
      selectedOffice: null,
      selectedGroup: null,
      selectedRoom: null,
      selectedTeacher: null,
      startHour: null,
      startMinute: null
    };
  },
  methods: {
    create() {},
    adjustEndHour(h) {
      this.adjustEndTime(h, this.startMinute);
    },
    adjustEndMinute(m) {
      this.adjustEndTime(this.startHour, m);
    },
    adjustEndTime(startHour, startMinute) {
      if (startHour && startMinute) {
        const startDate = moment();
        startDate.set("hour", parseInt(startHour));
        startDate.set("minute", parseInt(startMinute));
        const endDate = startDate.add(1, "h");
        this.endHour =
          endDate.get("hour") < 10
            ? `0${endDate.get("hour")}`
            : String(endDate.get("hour"));
        this.endMinute =
          endDate.get("minute") < 10
            ? `0${endDate.get("minute")}`
            : String(endDate.get("minute"));
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

<style>
.schedule-create-form-margin {
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
</style>