<template>
  <b-col sm="12" md="10" lg="10" xl="10">
    <form>
        <b>Преподаватель:</b>
        <b-form-select class="schedule-create-form-margin" :options="optionsTeacher" size="sm" v-model="selectedTeacher" />
        <b>Услуга:</b>
        <b-form-select class="schedule-create-form-margin" :disabled="!selectedTeacher" :options="optionsService" size="sm" v-model="selectedService" />
        <b>Офис:</b>
        <b-form-select class="schedule-create-form-margin" :options="optionsOffice" size="sm" v-model="selectedOffice" />
        <b>Кабинет:</b>
        <b-form-select class="schedule-create-form-margin" :disabled="!selectedOffice" :options="optionsRoom" size="sm" v-model="selectedRoom" />
        <b>Время начала:</b>
        <b-row>
          <b-col>
            <b-form-select class="schedule-create-form-margin" :options="optionsHours" size="sm" v-model="startHour" />  
          </b-col>
          <b-col>
            <b-form-select class="schedule-create-form-margin" :options="optionsMinutes" size="sm" v-model="startMinute" />
          </b-col>
        </b-row>
        <b>Время конца:</b>
        <b-row>
          <b-col>
            <b-form-select class="schedule-create-form-margin" :options="optionsHours" size="sm" v-model="endHour" />  
          </b-col>
          <b-col>
            <b-form-select class="schedule-create-form-margin" :options="optionsMinutes" size="sm" v-model="endMinute" />
          </b-col>
        </b-row>
        <b>День недели:</b>
        <b-form-select class="schedule-create-form-margin" :options="optionsDay" size="sm" v-model="selectedDay" />
        <b-button variant="success">Создать</b-button>
    </form>
  </b-col>
</template>

<script>
import bButton from "bootstrap-vue/es/components/button/button";
import bCol from "bootstrap-vue/es/components/layout/col";
import bFormSelect from "bootstrap-vue/es/components/form-select/form-select";
import bRow from "bootstrap-vue/es/components/layout/row";
import moment from "moment";

moment.locale("ru");

export default {
  components: {
    "b-button": bButton,
    "b-col": bCol,
    "b-form-select": bFormSelect,
    "b-row": bRow
  },
  computed: {
    optionsDay() {
      const days = [{
        value: null,
        text: '-выбрать-'
      }];
      for(let i = 1; i < 8; i++) {
        days.push({
          value: i,
          text: moment().day(i).format('dddd')
        });
      }
      return days;
    },
    optionsHours() {
      const hours = [{
        value: null,
        text: '-часы-'
      }];
      for(let i = 8; i < 20; i++) {
        hours.push({
          value: i < 10 ? `0${i}` : i,
          text: i < 10 ? `0${i}` : i
        });
      }
      return hours;
    },
    optionsMinutes() {
      const minutes = [{
        value: null,
        text: '-минуты-'
      }];
      for(let i = 0; i < 60; i = i + 5) {
        minutes.push({
          value: i < 10 ? `0${i}` : i,
          text: i < 10 ? `0${i}` : i,
        });
      }
      return minutes;
    },
    optionsOffice() {
      const options = [{ value: null, text: "-выбрать-" }].concat(this.offices);
      return options;
    },
    optionsRoom() {
      const options = [{ value: null, text: "-выбрать-" }].concat(this.rooms);
      return options;
    },
    optionsService() {
      const options = [{ value: null, text: "-выбрать-" }].concat(
        this.services
      );
      return options;
    },
    optionsTeacher() {
      const options = [{ value: null, text: "-выбрать-" }].concat(
        this.teachers
      );
      return options;
    }
  },
  data() {
    return {
      endHour: null,
      endMinute: null,
      rooms: [],
      selectedDay: null,
      selectedOffice: null,
      selectedService: null,
      selectedRoom: null,
      selectedTeacher: null,
      services: [],
      startHour: null,
      startMinute: null,
    };
  },
  methods: {
    create() {}
  },
  props: {
    offices: {
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