<template>
  <div class="row">
    <div style="display: flex; align-items: baseline">
      <label>Dodaj suplemente:</label>
      <b-button class="ml-2" variant="info" size="sm" @click="addSupplements()"
        ><b-icon-plus font-scale="2"></b-icon-plus
      ></b-button>
      <span class="ml-2" style="font-style: italic">(test!)</span>
    </div>

    <div v-if="isAdd" class="w-100">
      <div
        v-for="index in countSupp"
        :key="index"
        class="d-flex mb-2"
        style="justify-content: space-between"
      >
        <b-input id="inptName" type="text"></b-input>
        <b-input
          id="inptName"
          class="w-25 ml-2 d-inline"
          type="number"
          min="0"
          v-model="grams"
        ></b-input>
        <b-button
          class="ml-2"
          variant="danger"
          size="sm"
          @click="removeSupplements()"
          ><b-icon-plus rotate="45" font-scale="1.8"></b-icon-plus
        ></b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Supplements",
  data() {
    return {
      isAdd: false,
      countSupp: 0,
      grams: 0,
    };
  },
  methods: {
    async addSupplements() {
      this.isAdd = true;
      this.countSupp++;
    },
  },
};
</script>

<style scoped>
label {
  font-size: 24px;
}
</style>
