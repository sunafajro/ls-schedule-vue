<template>
  <div>
    <div v-if="mode === 'view'">
      {{ comment }}
      <a href="#" @click.prevent="updateValue()" title="Редактировать описание">
        <i class="fa fa-edit" aria-hidden="true"></i>
      </a>
    </div>
    <div class="input-group" v-if="mode === 'edit'">
      <input type="text" class="form-control input-sm" v-model="comment" />
      <span class="input-group-btn">
        <button class="btn btn-default btn-sm" type="button" @click.prevent="saveValue()">
          <i class="fa fa-save" aria-hidden="true"></i>
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      mode: 'view',
      comment: '',
    };
  },
  computed: {
    ...mapState(['filterParams']),
  },
  created() {
    this.comment = this.value;
  },
  methods: {
    ...mapActions(['getScheduleLessons', 'updateScheduleLesson']),
    updateValue() {
      this.mode = 'edit';
    },
    async saveValue() {
      this.mode = 'view';
      await this.updateScheduleLesson({
        id: this.lessonId,
        schedule: {
          Schedule: {
            notes: this.comment,
          },
        },
      });
      await this.getScheduleLessons(this.filterParams);
    },
  },
  props: {
    lessonId: {
      required: true,
      type: Number,
    },
    value: {
      required: true,
      type: String,
    },
  },
};
</script>