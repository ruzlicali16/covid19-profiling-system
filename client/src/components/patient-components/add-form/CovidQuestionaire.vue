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
        <div class="col-12 text-grey-9">
          Please check the symptoms that apply
        </div>
        <div class="col-6 q-pt-none">
          <q-option-group
            :options="symptomsOptOne"
            label="Notifications"
            type="checkbox"
            v-model="patient.symptomsOne"
          />
        </div>
        <div class="col-6 q-pt-none">
          <q-option-group
            :options="symptomsOptTwo"
            label="Notifications"
            color="green"
            type="checkbox"
            v-model="patient.symptomsTwo"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script>
export default {
  name: "CovidQuestionaire",
  data() {
    return {
      patient: {
        symptomsOne: [],
        symptomsTwo: [],
        travelHistory: "",
        peopleContacted: "",
        visitedCountry: "",
        household: ""
      },
      symptomsOptOne: [
        { label: "High Fever", value: "High Fever" },
        { label: "Difficulty in Breathing", value: "Difficulty in Breathing" },
        { label: "Body Aches", value: "Body Aches" },
        { label: "Runny Nose", value: "Runny Nose" },
        { label: "Diarrhea", value: "Diarrhea" }
      ],
      symptomsOptTwo: [
        { label: "Cought", value: "Cought" },
        {
          label: "Persistent Pain or Pressure in the Chest",
          value: "Persistent Pain or Pressure in the Chest"
        },
        { label: "Nasal congestion", value: "Nasal congestion" },
        { label: "Sore Throat", value: "Sore Throat" }
      ],
      isUpdate: false
    };
  }
};
</script>

<style></style>
