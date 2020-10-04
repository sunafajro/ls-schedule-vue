<template>
<form @submit.prevent="onSubmit" style="margin-bottom: 2rem">
      <div style="margin-bottom: 0.5rem">
        <b>Преподаватель:</b>
        <span style="color: red">*</span>
        <select
          class="form-control input-sm"
          @change="selectGroup($event.target.value)"
          v-model="formData.selectedTeacher"
        >
          <option
            :key="'opt-teacher-' + i"
            :value="option.value"
            v-for="(option, i) in optionsTeacher"
          >{{ option.text }}</option>
        </select>
      </div>
      <div style="margin-bottom: 0.5rem">
        <b>Группа:</b>
        <span style="color: red">*</span>
        <select
          class="form-control input-sm"
          :disabled="!groups.length"
          v-model="formData.selectedGroup"
        >
          <option
            :key="`opt-groups-${i}`"
            :value="option.value"
            v-for="(option, i) in optionsGroup"
          >{{ option.text }}</option>
        </select>
      </div>
      <div style="margin-bottom: 0.5rem">
        <b>Офис:</b>
        <span style="color: red">*</span>
        <select
          class="form-control input-sm"
          @change="selectRoom($event.target.value)"
          v-model="formData.selectedOffice"
        >
          <option
            :key="`opt-offices-${i}`"
            :value="option.value"
            v-for="(option, i) in optionsOffice"
          >{{ option.text }}</option>
        </select>
      </div>
      <div style="margin-bottom: 0.5rem">
        <b>Кабинет:</b>
        <span style="color: red">*</span>
        <select
          class="form-control input-sm"
          :disabled="!rooms.length"
          v-model="formData.selectedRoom"
        >
          <option
            :key="`opt-rooms-${i}`"
            :value="option.value"
            v-for="(option, i) in optionsRoom"
          >{{ option.text }}</option>
        </select>
      </div>
      <div>
        <b>Время начала:</b>
        <span style="color: red">*</span>
        <div class="row">
          <div class="col-sm-6" style="margin-bottom: 0.5rem">
            <select
              class="form-control input-sm"
              @change="adjustEndHour"
              v-model="formData.startHour"
            >
              <option
                :key="`opt-start-hours-${i}`"
                :value="option.value"
                v-for="(option, i) in optionsHours"
              >{{ option.text }}</option>
            </select>
          </div>
          <div class="col-sm-6" style="margin-bottom: 0.5rem">
            <select
              class="form-control input-sm"
              @change="adjustEndMinute"
              v-model="formData.startMinute"
            >
              <option
                :key="`opt-start-minutes-${i}`"
                :value="option.value"
                v-for="(option, i) in optionsMinutes"
              >{{ option.text }}</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <b>Время конца:</b>
        <span style="color: red">*</span>
        <div class="row">
          <div class="col-sm-6" style="margin-bottom: 0.5rem">
            <select class="form-control input-sm" v-model="formData.endHour">
              <option
                :key="`opt-end-hours-${i}`"
                :value="option.value"
                v-for="(option, i) in optionsHours"
              >{{ option.text }}</option>
            </select>
          </div>
          <div class="col-sm-6" style="margin-bottom: 0.5rem">
            <select class="form-control input-sm" v-model="formData.endMinute">
              <option
                :key="`opt-end-minutes-${i}`"
                :value="option.value"
                v-for="(option, i) in optionsMinutes"
              >{{ option.text }}</option>
            </select>
          </div>
        </div>
      </div>
      <div style="margin-bottom: 0.5rem">
        <b>День недели:</b>
        <span style="color: red">*</span>
        <select class="form-control input-sm" v-model="formData.selectedDay">
          <option
            :key="`opt-days-${i}`"
            :value="option.value"
            v-for="(option, i) in optionsDay"
          >{{ option.text }}</option>
        </select>
      </div>
      <div style="margin-bottom: 0.5rem">
        <b>Примечания:</b>
        <input class="form-control input-sm" v-model="formData.notes">
      </div>
      <div style="margin-bottom: 0.5rem">
        <button class="btn btn-info" type="submit" style="margin-right: 0.5rem">
          <i class="fa fa-save" aria-hidden="true"></i> Сохранить
        </button>
        <button class="btn btn-warning" type="button" @click.prevent="clearForm" v-if="!formData.id">
          <i class="fa fa-eraser" aria-hidden="true"></i> Очистить
        </button>
      </div>
    </form>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import moment from 'moment';
import {
  createDaysSelectItems,
  createHoursSelectItems,
  createMinutesSelectItems,
  splitTimePeriodToHoursMinutes,
} from '../utils';

const defaultState = {
  id: null,
  endHour: null,
  endMinute: null,
  selectedDay: null,
  selectedOffice: null,
  selectedGroup: null,
  selectedRoom: null,
  selectedTeacher: null,
  startHour: null,
  startMinute: null,
  notes: '',
};

export default {
  computed: {
    ...mapState([
      'filterParams',
      'groups',
      'offices',
      'rooms',
      'scheduleRows',
      'teachers',
      'urlPrefix',
    ]),
    optionsDay() {
      const options = [{ value: null, text: '-выбрать-' }].concat(
        createDaysSelectItems()
      );
      return options;
    },
    optionsHours() {
      const options = [{ value: null, text: '-часы-' }].concat(
        createHoursSelectItems()
      );
      return options;
    },
    optionsMinutes() {
      const options = [{ value: null, text: '-минуты-' }].concat(
        createMinutesSelectItems()
      );
      return options;
    },
    optionsOffice() {
      const options = [{ value: null, text: '-выбрать-' }].concat(
        Array.isArray(this.offices) ? this.offices : []
      );
      return options;
    },
    optionsRoom() {
      const options = [{ value: null, text: '-выбрать-' }].concat(
        Array.isArray(this.rooms) ? this.rooms : []
      );
      return options;
    },
    optionsGroup() {
      const options = [{ value: null, text: '-выбрать-' }].concat(
        Array.isArray(this.groups) ? this.groups : []
      );
      return options;
    },
    optionsTeacher() {
      const options = [{ value: null, text: '-выбрать-' }].concat(
        Array.isArray(this.teachers) ? this.teachers : []
      );
      return options;
    },
  },
  created() {
      const lessonId = this.$route.params.id;
      if (lessonId) {
          let lesson = null;
          Object.keys(this.scheduleRows).forEach(officeId => {
              const officeLEssons = this.scheduleRows[officeId]['rows'];
              const result = officeLEssons.filter(lesson => {
                  return lesson.id === lessonId;
              })[0];
              if (result) {
                  lesson = result;
              }
          });
          if (lesson) {
              this.formData.id = lessonId;
              this.formData.selectedTeacher = lesson.teacherId;
              this.selectGroup(lesson.teacherId);
              this.formData.selectedGroup = lesson.groupId;
              this.formData.selectedOffice  = lesson.officeId;
              this.selectRoom(lesson.officeId);
              this.formData.selectedRoom = lesson.roomId;
              const {startHour, startMinute, endHour, endMinute } = splitTimePeriodToHoursMinutes(lesson.time);
              this.formData.startHour = startHour;
              this.formData.startMinute = startMinute;
              this.formData.endHour = endHour;
              this.formData.endMinute = endMinute;
              this.formData.selectedDay = lesson.day;
              this.formData.notes = lesson.notes;
          }
      }
  },
  data() {
    return {
      formData: { ...defaultState },
    };
  },
  methods: {
    ...mapActions([
      'createScheduleLesson',
      'updateScheduleLesson',
      'getOfficeRooms',
      'getTeacherGroups',
      'showNotification',
    ]),
    ...mapMutations([
      'updateRooms',
      'updateTeacherGroups',
    ]),
    adjustEndHour(e) {
      this.adjustEndTime(e.target.value, this.formData.startMinute);
    },
    adjustEndMinute(e) {
      this.adjustEndTime(this.formData.startHour, e.target.value);
    },
    adjustEndTime(startHour, startMinute) {
      if (startHour && startMinute) {
        const startDate = moment();
        startDate.set('hour', parseInt(startHour));
        startDate.set('minute', parseInt(startMinute));
        const endDate = startDate.add(1, 'h');
        this.formData.endHour =
          endDate.get('hour') < 10
            ? '0' + endDate.get('hour')
            : String(endDate.get('hour'));
        this.formData.endMinute =
          endDate.get('minute') < 10
            ? '0' + endDate.get('minute')
            : String(endDate.get('minute'));
      }
    },
    clearForm() {
      this.formData = { ...defaultState };
    },
    async onSubmit() {
      let validForm = true;
      const data = {
        Schedule: {},
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
        if (this.formData.id) {
            await this.updateScheduleLesson({ id: this.formData.id, schedule: data });
            this.$router.push(this.urlPrefix + '/schedule/index');
        } else {
            await this.createScheduleLesson({ schedule: data });
        }
      } else {
        this.showNotification(null, {
          text: 'Заполнены не все поля формы!',
          type: 'error',
        });
      }
    },
    async selectGroup(id) {
      const newFormData = { ...this.formData };
      newFormData.selectedGroup = null;
      this.formData = newFormData;
      if (id) {
        await this.getTeacherGroups({ id });
      } else {
        this.updateTeacherGroups([]);
      }
    },
    async selectRoom(id) {
      const newFormData = { ...this.formData };
      newFormData.selectedRoom = null;
      this.formData = newFormData;
      if (id) {
        await this.getOfficeRooms({ id });
      } else {
        this.updateRooms([]);
      }
    },
  },
}
</script>