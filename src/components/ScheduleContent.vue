<template>
  <div class="col-sm-12 col-md-10 col-lg-10 col-xl-10">
    <div :key="`office-${o}`" v-for="o in Object.keys(lessons)">
      <h3>{{ lessons[o].name }}</h3>
      <table class="table table-bordered table-hover table-condensed table-striped small">
        <thead>
          <tr>
            <th :style="c.style" v-for="c in columns" :key="`th-${c.id}`" v-if="c.show">{{ c.title }}</th>
          </tr>
        </thead>
        <tbody v-if="Array.isArray(lessons[o].rows) && lessons[o].rows.length">
          <tr :key="`tr-${l.id}`" v-for="l in lessons[o].rows">
            <td :key="`td-${l.id}-${c.id}`" v-for="c in columns" v-if="c.show">
              <span v-if="c.id === 'day'">{{ dayName(l[c.id]) }}</span>
              <span v-if="c.id === 'group'"><a :href="`/groupteacher/view?id=${l.groupId}`">{{ l[c.id] }}</a></span>
              <span v-if="c.id === 'teacher'"><a :href="`/teacher/view?id=${l.teacherId}`">{{ l[c.id] }}</a></span>
              <div v-if="c.id === 'actions'">
                <router-link :to="`/edit/${l.id}`"><i class="fa fa-pencil" aria-hidden="true"></i></router-link>
                <a href="#" @click.prevent="deleteLesson(l.id)"><i class="fa fa-trash" aria-hidden="true"></i></a>
              </div>
              <span v-if="c.id !== 'group' && c.id !== 'teacher' && c.id !== 'day' && c.id !== 'actions'">{{ l[c.id] }}</span>
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
    deleteLesson: {
      required: true,
      type: Function
    },
    lessons: {
      required: true,
      type: Object
    }
  }
};
</script>
