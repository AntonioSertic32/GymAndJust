<template>
  <div class="container">
    <h1 class="mb-5">Evidentiraj trening</h1>

    <b-form class="border border-secondary rounded p-5 w-75 m-auto">
      <!-- Datum -->
      <div class="row my-3">
        <label for="datepicker">Odaberi datum:</label>
        <b-form-datepicker id="datepicker" v-model="workoutDate" size="lg"></b-form-datepicker>
      </div>
      <!-- Opis -->
      <div class="row my-3">
        <label for="textarea">Unesi opis:</label>
        <b-form-textarea
          id="textarea"
          v-model="workoutDescription"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
          size="lg"
        ></b-form-textarea>
      </div>
      <!-- Spremanje -->
      <div class="row my-3">
        <b-button variant="success" class="w-100" size="lg" @click="addWorkouts()">Save</b-button>
      </div>
    </b-form>
  
  </div>
</template>

<script>
import { db } from "../firebase";
import moment from 'moment';

export default {
  name: 'Workouts',
  data() {
    return {
      Workouts: [],
      workoutDate: "",
      workoutDescription: ""
    };
  },
  methods: {
    deleteWorkouts(id) {
      db.collection("Workouts")
        .doc(id)
        .delete();
    },
    async addWorkouts() {
      if (this.workoutDescription && this.workoutDate) {
        var workout = {
          date: moment(String(this.workoutDate)).format('DD-MM-YYYY'),
          description: this.workoutDescription
        }

        await db.collection("Workouts").doc('0').set(workout);

        this.workoutDate = "";
        this.workoutDescription = "";
      }
    }
  },
  firestore: {
    Workouts: db.collection("Workouts")
  }
};
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  label {
    font-size:28px;
  }
</style>
