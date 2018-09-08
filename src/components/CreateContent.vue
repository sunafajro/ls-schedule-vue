<template>
  <b-col sm="12" md="10" lg="10" xl="10">
    <form>
        <b>Преподаватель:</b>
        <b-form-select class="schedule-create-form-margin" @change="getTeacherGroups" :options="optionsTeacher" size="sm" v-model="selectedTeacher" />
        <b>Группа:</b>
        <b-form-select class="schedule-create-form-margin" :disabled="!groups.length" :options="optionsGroup" size="sm" v-model="selectedGroup" />
        <b>Офис:</b>
        <b-form-select class="schedule-create-form-margin" @change="getOfficeRooms" :options="optionsOffice" size="sm" v-model="selectedOffice" />
        <b>Кабинет:</b>
        <b-form-select class="schedule-create-form-margin" :disabled="!rooms.length" :options="optionsRoom" size="sm" v-model="selectedRoom" />
        <b>Время начала:</b>
        <b-row>
          <b-col>
            <b-form-select class="schedule-create-form-margin" @change="adjustEndHour" :options="optionsHours" size="sm" v-model="startHour" />  
          </b-col>
          <b-col>
            <b-form-select class="schedule-create-form-margin" @change="adjustEndMinute" :options="optionsMinutes" size="sm" v-model="startMinute" />
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
import moment from "moment";
import bButton from "bootstrap-vue/es/components/button/button";
import bCol from "bootstrap-vue/es/components/layout/col";
import bFormSelect from "bootstrap-vue/es/components/form-select/form-select";
import bRow from "bootstrap-vue/es/components/layout/row";
import {
  createDaysSelectItems,
  createHoursSelectItems,
  createMinutesSelectItems
} from "../utils";

export default {
  components: {
    "b-button": bButton,
    "b-col": bCol,
    "b-form-select": bFormSelect,
    "b-row": bRow
  },
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
      const options = [{ value: null, text: "-выбрать-" }].concat(this.offices);
      return options;
    },
    optionsRoom() {
      const options = [{ value: null, text: "-выбрать-" }].concat(this.rooms);
      return options;
    },
    optionsGroup() {
      const options = [{ value: null, text: "-выбрать-" }].concat(this.groups);
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
      groups: [],
      rooms: [],
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
    async getTeacherGroups(tid) {
      try {
        const { groupsData } = await fetch(
          `/schedule/get-teacher-groups?tid=${tid}`
        ).then(r => {
          if (r.ok) {
            return r.json();
          } else {
            throw new Error();
          }
        });
        // модифицируем массив
        const groups = groupsData.map(item => {
          return {
            value: item.value,
            text: `#${item.value} ${item.text}`
          };
        });
        this.groups = groups;
      } catch (e) {
        throw new Error("Ошибка получения групп преподавателя!");
      }
    },
    async getOfficeRooms(oid) {
      try {
        const { roomsData } = await fetch(
          `/room/index?type=bootstrap&oid=${oid}`
        ).then(r => {
          if (r.ok) {
            return r.json();
          } else {
            throw new Error();
          }
        });
        this.rooms = roomsData;
      } catch (e) {
        throw new Error("Ошибка получения кабинетов офиса!");
      }
    },
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
        this.endHour = endDate.get("hour") < 10 ? `0${endDate.get("hour")}` : String(endDate.get("hour"));
        this.endMinute = endDate.get("minute") < 10 ? `0${endDate.get("minute")}` : String(endDate.get("minute"));
      }
    }
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