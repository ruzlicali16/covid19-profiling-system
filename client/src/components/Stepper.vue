<template>
  <q-stepper
    v-model="step"
    alternative-labels
    ref="stepper"
    active-color="green"
    done-color="green"
    animated
    keep-alive
    @transition="scrollToTop"
  >
    <q-step :name="1" title="Personal Details" icon="person" :done="step > 1">
      <PersonalDetails />
    </q-step>

    <q-step
      :name="2"
      title="Health and Medical History"
      icon="health_and_safety"
      :done="step > 2"
    >
      <HealthAndMedicalHistory />
    </q-step>

    <q-step
      :name="3"
      title="COVID-19 Questionaire"
      icon="help"
      :done="step > 3"
    >
      <CovidQuestionaire />
    </q-step>

    <q-step
      :name="4"
      title="Health Actions"
      icon="accessibility"
      :done="step > 4"
    >
      <HealthActions />
    </q-step>

    <template v-slot:navigation>
      <q-stepper-navigation class="float-right">
        <q-btn
          v-if="step > 1"
          flat
          color="green"
          @click="$refs.stepper.previous()"
          label="Back"
          class="q-ml-sm"
        />
        <q-btn
          @click="$refs.stepper.next()"
          color="green"
          :label="step === 4 ? 'Add Patient' : 'Continue'"
        />
      </q-stepper-navigation>
    </template>
  </q-stepper>
</template>

<script>
import PersonalDetails from "./patient-components/add-form/PersonalDetails.vue";
import HealthAndMedicalHistory from "./patient-components/add-form/HealthAndMedicalHistory.vue";
import CovidQuestionaire from "./patient-components/add-form/CovidQuestionaire.vue";
import HealthActions from "./health-components/add-form/HealthActions.vue";

export default {
  name: "Stepper",
  components: {
    PersonalDetails,
    HealthAndMedicalHistory,
    CovidQuestionaire,
    HealthActions
  },

  data() {
    return {
      step: 1
    };
  },

  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style></style>
