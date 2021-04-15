<template>
  <q-form>
    <q-card flat class="my-card q-pa-md">
      <q-card-section class="text-green text-center text-h4 text-weight-medium">
        <span v-if="isUpdate">Update Profile</span>
        <span v-else>Patient Details</span>
      </q-card-section>
      <div class="q-pl-md text-grey-9 text-h5">COVID-19 Questionaire</div>
      <q-separator spaced />
      <q-card-section class="row q-col-gutter-x-lg q-col-gutter-y-md">
        <div class="col-12">
          <div class="text-grey-9">
            Please list down your travel history for last 1 month
          </div>
          <q-input
            outlined
            v-model="patient.travelHistory"
            label="Type here.."
            color="green"
            type="textarea"
            stack-label
            hint="Format: Location / Return Date"
          />
        </div>
        <div class="col-12">
          <div class="text-grey-9">
            If you have travelled in the last 1 month, please list down people
            you have contacted
          </div>
          <q-input
            outlined
            v-model="patient.peopleContacted"
            label="Type here.."
            color="green"
            type="textarea"
            stack-label
            hint="Format: Name / Age / Contact Information"
          />
        </div>
        <div class="col-12">
          <div class="text-grey-9">
            Please list down all your connections that have visited a foreign
            country in the last 1 month
          </div>
          <q-input
            outlined
            v-model="patient.visitedCountry"
            label="Type here.."
            color="green"
            type="textarea"
            stack-label
            hint="Format: Name / Age / Last Contact Date"
          />
        </div>
        <div class="col-12">
          <div class="text-grey-9">
            Please list out your household
          </div>
          <q-input
            outlined
            v-model="patient.household"
            label="Type here.."
            color="green"
            type="textarea"
            stack-label
            hint="Format: Name / Age / Gender"
          />
        </div>
        <div class="col-12">
          <div class="text-grey-9">
            Please list out the symptoms
          </div>
          <q-input
            outlined
            v-model="patient.symptoms"
            label="Type here.."
            color="green"
            type="textarea"
            stack-label
            hint="Format: High Fever / Cough / Difficulty Breathing"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script>
import covidQuestionaire from "../../../services/covid-questionaire.service.js";

export default {
  name: "CovidQuestionaire",
  emits: ["check-inputs"],
  data() {
    return {
      patient: {
        travelHistory: "",
        peopleContacted: "",
        visitedCountry: "",
        household: "",
        symptoms: ""
      },

      isUpdate: false
    };
  },
  updated() {
    let patient = this.patient;
    this.$emit("check-inputs", patient);
  },
  mounted() {
    if (this.$route.params.id) {
      this.getQuestionaireByID();
    }
  },
  methods: {
    getQuestionaireByID() {
      let id = this.$route.params.id;
      covidQuestionaire
        .get(id)
        .then(response => {
          console.log(response.data);
          this.patient = response.data;
          this.isUpdate = true;
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  },
  deactivated() {
    let patient = this.patient;
    this.$store.dispatch("patient/covidQuestionaire", patient);
  }
};
</script>

<style></style>
