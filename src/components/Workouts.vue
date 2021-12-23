<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-6">
        <h1 class="mb-5 text-center">Evidentiraj trening</h1>

        <b-form class="border rounded p-5 m-auto">
          <!-- Datum -->
          <div class="row mb-3">
            <label for="datepicker">Odaberi datum:</label>
            <b-form-datepicker
              :start-weekday="1"
              id="datepicker"
              v-model="workoutDate"
              size="lg"
            ></b-form-datepicker>
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
          <Supplements></Supplements>
          <!-- Spremanje -->
          <div class="row my-3">
            <b-button
              variant="success"
              class="w-100"
              size="lg"
              @click="addWorkouts()"
              >Save</b-button
            >
          </div>
        </b-form>
      </div>

      <div class="col-6 text-center">
        <h1 class="mb-5">Popis treninga</h1>

        <b-list-group>
          <b-list-group-item
            class="listItem"
            v-for="workout in Workouts"
            :key="workout.key"
          >
            {{ workout.date | formatDate }}
            {{ workout.description }}

            <div class="listActions">
              <b-button variant="primary"
                ><b-icon-pencil-fill></b-icon-pencil-fill
              ></b-button>
              <b-button
                @click="deleteWorkouts(workout.id)"
                class="ml-2"
                variant="danger"
                ><b-icon-trash-fill></b-icon-trash-fill
              ></b-button>
            </div>
          </b-list-group-item>
        </b-list-group>

        <b-calendar
          class="mt-5"
          v-model="value"
          :date-info-fn="dateClass"
          locale="en"
          start-weekday="1"
          :hide-header="true"
        ></b-calendar>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import moment from "moment";
import Vue from "vue";
import Supplements from "./Supplements.vue";

Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("DD.MM.YYYY.");
  }
});

export default {
  name: "Workouts",
  components: {
    Supplements,
  },
  data() {
    return {
      Workouts: [],
      workoutDate: new Date(),
      workoutDescription: "",
      workoutCount: 0,
      value: "",
    };
  },
  methods: {
    deleteWorkouts(id) {
      db.collection("Workouts").doc(id).delete();
    },
    async addWorkouts() {
      if (this.workoutDescription && this.workoutDate) {
        var workout = {
          date: this.workoutDate,
          description: this.workoutDescription,
        };

        await db
          .collection("Workouts")
          .doc(this.Workouts[this.workoutCount.toString() - 1].id + 1)
          .set(workout);

        this.workoutDate = "";
        this.workoutDescription = "";
      }
    },
    dateClass(dmy, date) {
      let datumi = [];
      this.Workouts.forEach((e) => {
        datumi.push(moment(String(e.date)).format("DD"));
      });
      let month = moment(new Date()).format("MM");

      const day = date.getDate();
      return datumi.includes(day.toString()) &&
        moment(date).format("MM") == month
        ? "table-success rounded"
        : "";
    },
  },
  firestore: {
    Workouts: db.collection("Workouts"),
  },
  created: function () {
    let Workouts = db.collection("Workouts");
    Workouts.onSnapshot((querySnapshot) => {
      this.workoutCount = querySnapshot.size;
    });
  },
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
  font-size: 24px;
}
.listItem {
  text-align: start;
}
.listActions {
  float: right;
}
</style>
