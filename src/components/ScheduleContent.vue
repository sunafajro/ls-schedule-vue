<template>
  <div class="col-sm-12 col-md-10 col-lg-10 col-xl-10">
    <div :key="`office-${o.value}`" v-for="o in offices">
      <h3>{{ o.text }}</h3>
      <table class="table table-bordered table-hover table-condensed table-striped small">
        <thead>
          <tr>
            <th :style="c.style" v-for="c in columns" :key="`th-${c.id}`" v-if="c.show">{{ c.title }}</th>
          </tr>
        </thead>
        <tbody v-if="lessons.length">
          <tr :key="`tr-${l.id}`" v-for="l in lessons" v-if="l.officeId === o.value">
            <td :key="`td-${l.id}-${c.id}`" v-for="c in columns" v-if="c.show">
              <span v-if="c.id === 'day'">{{ dayName(l[c.id]) }}</span>
              <span v-if="c.id === 'group'"><a :href="`/groupteacher/view?id=${l.groupId}`">{{ l[c.id] }}</a></span>
              <span v-if="c.id === 'teacher'"><a :href="`/teacher/view?id=${l.teacherId}`">{{ l[c.id] }}</a></span>
              <span v-if="c.id !== 'group' && c.id !== 'teacher' && c.id !== 'day'">{{ l[c.id] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { createDaysObjectItems } from "../utils";

export default {
  data() {
    return {
      days: createDaysObjectItems()
    };
  },
  methods: {
    dayName(num) {
      return this.days[num];
    }
  },
  props: {
    columns: {
      required: true,
      type: Array
    },
    lessons: {
      required: true,
      type: Array
    },
    offices: {
      required: true,
      type: Array
    }
  }
};
</script>
