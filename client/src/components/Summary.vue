<template>
  <q-form>
    <q-card flat class="my-card q-pa-md">
      <q-card-section class="text-green text-center text-h4 text-weight-medium">
        <span v-if="isUpdate">Update Profile</span>
        <span v-else>Patient Details</span>
      </q-card-section>
      <div class="q-pl-md text-grey-9 text-h5">Health and Medical History</div>
      <q-separator spaced />
    </q-card>
  </q-form>
</template>

<script>
export default {
  name: "Summary",
  data() {
    return {
      pDeatils: {},
      mHistory: {},
      cQuestionaire: {},
      hDetails: {},
      isUpdate: false
    };
  },
  mounted() {
    this.pDeatils = this.$store.state.patient.personalDetails;
    this.mHistory = this.$store.state.patient.medicalHistory;
    this.cQuestionaire = this.$store.state.patient.covidQuestionaire;
    this.hDetails = this.$store.state.patient.healthDetails;
    console.log(
      this.pDeatils,
      this.mHistory,
      this.cQuestionaire,
      this.hDetails
    );
  }
};
</script>

<style></style>
