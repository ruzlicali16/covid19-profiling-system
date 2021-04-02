<template>
  <q-page
    class="q-pa-md flex flex-center"
    :style="
      !$q.screen.lt.md
        ? 'padding-left: 150px; padding-right: 150px; padding-top: 50px; padding-bottom: 50px'
        : ''
    "
  >
    <Stepper />
  </q-page>
</template>

<script>
import AddForm from "../components/patient-components/add-form/PersonalDetails.vue";
import Stepper from "../components/Stepper.vue";
export default {
  name: "AddPatient",
  components: {
    AddForm,
    Stepper
  }
};
</script>

<style></style>
