<template>
  <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <c-info :user="user"></c-info>
    <div v-if="actions.create || actions.view">
      <h4 style="margin-top: 0.5rem">Действия:</h4>
      <button class="btn btn-success btn-sm btn-block" type="button" @click="$router.push('/create')" v-if="actions.create">
        <i class="fa fa-plus" aria-hidden="true"></i> Добавить
      </button>
      <button class="btn btn-secondary btn-sm btn-block" type="button" @click="$router.push('/')" v-if="actions.view">
        <i class="fa fa-calendar" aria-hidden="true"></i> Расписание
      </button>
    </div>
    <div v-if="Array.isArray(filters.offices) && filters.offices.length">
      <h4 style="margin-top: 0.5rem">Фильтры:</h4>
      <form @submit.prevent="onSubmit">
        <select class="form-control input-sm" style="margin-bottom: 0.5rem" v-if="offices.length > 1" v-model="oid">
          <option :key="`opt-offices-${i}`" :value="option.value" v-for="(option, i) in offices">{{ option.text }}</option>
        </select>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6" style="margin-bottom: 0.5rem">
            <button class="btn btn-info btn-sm btn-block" type="submit">
              <i class="fa fa-filter" aria-hidden="true"></i> Применить
            </button>
          </div>
          <div class=" col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6" style="margin-bottom: 0.5rem">
            <button class="btn btn-warning btn-sm btn-block" @click="clearFilters" type="button">
              <i class="fa fa-eraser" aria-hidden="true"></i> Сброс
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Info from "./UserInfo.vue";

export default {
  data() {
    return {
      oid: null
    };
  },
  components: {
    "c-info": Info
  },
  computed: {
    offices() {
      const options = [{ value: null, text: "-все офисы-" }].concat(
        Array.isArray(this.filters.offices) ? this.filters.offices : []
      );
      return options;
    }
  },
  methods: {
    clearFilters() {
      this.oid = null;
      this.filter();
    },
    onSubmit() {
      this.filter({ oid: this.oid });
    }
  },
  props: {
    actions: {
      required: true,
      type: Object
    },
    filter: {
      require: true,
      type: Function
    },
    filters: {
      required: true,
      type: Object
    },
    user: {
      required: true,
      type: Object
    }
  }
};
</script>