<template>
  <div class="col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <nav-component v-if="mode === 'bitrix'"/>
    <c-info/>
    <div v-if="scheduleActions.view || scheduleActions.hours">
      <h4 style="margin-top: 1rem">Действия:</h4>
      <button
        class="btn btn-secondary btn-sm btn-block"
        type="button"
        @click="$router.push(urlPrefix + '/schedule/index')"
        v-if="scheduleActions.view"
      >
        <i class="fa fa-calendar" aria-hidden="true"></i> Расписание
      </button>
      <button
        class="btn btn-secondary btn-sm btn-block"
        type="button"
        @click="$router.push(urlPrefix + '/schedule/hours')"
        v-if="scheduleActions.create"
      >
        <i class="fa fa-clock-o" aria-hidden="true"></i> Почасовка
      </button>
    </div>
    <h4 style="margin-top: 1rem">Подсказки:</h4>
    <div class="panel panel-default" style="margin-top: 0.5rem; padding: 0.5rem">
      <small>Список "Группа" динамический и разблокируется только после выбора преподавателя.</small>
    </div>
    <div class="panel panel-default" style="margin-top: 0.5rem; padding: 0.5rem">
      <small>Список "Кабинет" динамический и разблокируется только после выбора офиса.</small>
    </div>
    <div class="panel panel-default" style="margin-top: 0.5rem; padding: 0.5rem">
      <small>Время окончания занятия автоматически подстраивается на +1 час, после выбора времени начала занятия.</small>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Info from './UserInfo.vue';
import Navigation from '../helpers/Navigation';

export default {
  components: {
    'c-info': Info,
    'nav-component': Navigation,
  },
  computed: {
    ...mapState(['mode', 'scheduleActions', 'urlPrefix']),
  },
};
</script>


