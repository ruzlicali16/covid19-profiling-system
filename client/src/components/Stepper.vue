<template>
  <q-stepper
    v-model="step"
    alternative-labels
    ref="stepper"
    :active-color="hasErrorInPD || hasErrorInHD ? 'red' : 'green'"
    :done-color="hasErrorInPD || hasErrorInHD ? 'red' : 'green'"
    :active-icon="hasErrorInPD || hasErrorInHD ? 'warning' : 'edit'"
    animated
    keep-alive
    :header-nav="step != 1"
    @transition="scrollToTop"
    @input="clearData()"
  >
    <q-step
      :name="1"
      :title="hasErrorInPD ? 'All Fields Required *' : 'Personal Details'"
      icon="person"
      :done="step > 1"
    >
      <PersonalDetails @check-inputs="checkPersonalDetails" />
    </q-step>

    <q-step
      :name="2"
      title="Health and Medical History"
      icon="health_and_safety"
      :done="step > 2"
    >
      <HealthAndMedicalHistory @check-inputs="checkMedicalHistory" />
    </q-step>

    <q-step
      :name="3"
      title="COVID-19 Questionaire"
      icon="help"
      :done="step > 3"
    >
      <CovidQuestionaire @check-inputs="checkCovidQuestionaire" />
    </q-step>

    <q-step
      :name="4"
      :title="hasErrorInPD ? 'All Fields Required *' : 'Health Actions'"
      icon="accessibility"
      :done="step > 4"
    >
      <HealthDetails @check-inputs="checkHealthDetails" />
    </q-step>
    <q-step
      :name="5"
      title="Summary"
      active-icon="remove_red_eye"
      icon="article"
      :done="step > 5"
    >
      <Summary />
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
          v-if="!isUpdate"
          color="green"
          :label="step === 5 ? 'Add Patient' : 'Continue'"
          @click.prevent.stop="addDetials()"
        />
        <q-btn
          v-else
          color="green"
          :label="step === 5 ? 'Update Details' : 'Continue'"
          @click.prevent.stop="updateDetails()"
        />
      </q-stepper-navigation>
    </template>
  </q-stepper>
</template>

<script>
// Components
import PersonalDetails from "./patient-components/add-form/PersonalDetails.vue";
import HealthAndMedicalHistory from "./patient-components/add-form/HealthAndMedicalHistory.vue";
import CovidQuestionaire from "./patient-components/add-form/CovidQuestionaire.vue";
import HealthDetails from "./health-components/add-form/HealthDetails.vue";
import Summary from "./Summary.vue";

// Service
import personalDetails from "../services/personal-details.service.js";
import medicalHistory from "../services/medical-history.service.js";
import covidQuestionaire from "../services/covid-questionaire.service.js";
import healthDetails from "../services/health-details.service.js";
import patientDetails from "../services/patient-details.service.js";

export default {
  name: "Stepper",
  components: {
    PersonalDetails,
    HealthAndMedicalHistory,
    CovidQuestionaire,
    HealthDetails,
    Summary
  },
  data() {
    return {
      step: 1,
      hasErrorInPD: false,
      hasErrorInHD: false,
      detailsObj: {},
      pDetails: {},
      mHistory: {},
      cQuestionaire: {},
      hDetails: {},
      isUpdate: false
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.isUpdate = true;
    }
  },
  methods: {
    checkPersonalDetails(val) {
      this.pDetails = val;
    },
    checkMedicalHistory(val) {
      this.mHistory = val;
    },
    checkCovidQuestionaire(val) {
      this.cQuestionaire = val;
    },
    checkHealthDetails(val) {
      this.hDetails = val;
    },
    clearData() {
      if (this.step === 1) {
        this.$store.commit("patient/personalDetails", {});
      } else if (this.step === 2) {
        this.$store.commit("patient/medicalHistory", {});
      } else if (this.step === 3) {
        this.$store.commit("patient/covidQuestionaire", {});
      } else if (this.step === 4) {
        this.$store.commit("patient/healthDetails", {});
      } else if (this.step === 5) {
        // submit
      } else {
        console.log("Something went wrong!");
      }
    },
    addDetials() {
      if (this.step === 1) {
        // validate required inputs
        if (
          this.pDetails.citizenType === "" ||
          this.pDetails.fName === "" ||
          this.pDetails.lName === "" ||
          this.pDetails.gender === "" ||
          this.pDetails.contactNum === "" ||
          this.pDetails.age === "" ||
          this.pDetails.province === "" ||
          this.pDetails.municipal === "" ||
          this.pDetails.brgy === "" ||
          this.pDetails.currentAddress === "" ||
          this.pDetails.brghomeAddressy === ""
        ) {
          this.hasErrorInPD = true;
          this.scrollToTop();
        } else {
          this.hasErrorInPD = false;
          this.$refs.stepper.next();
        }
        // add personal details
      } else if (this.step === 4) {
        // add health details
        console.log(this.hDetails);
        if (
          this.hDetails.obeservation === "" ||
          this.hDetails.fName === "" ||
          this.hDetails.lName === ""
        ) {
          this.hasErrorInHD = true;
          this.scrollToTop();
        } else {
          this.hasErrorInHD = false;
          this.$refs.stepper.next();
        }
      } else if (this.step === 5) {
        this.$q.loading.show();
        let pDeatils = this.$store.state.patient.personalDetails;
        let mHistory = this.$store.state.patient.medicalHistory;
        let cQuestionaire = this.$store.state.patient.covidQuestionaire;
        let hDetails = this.$store.state.patient.healthDetails;

        let pID = "";
        let mID = "";
        let qID = "";
        let hID = "";
        personalDetails
          .create(pDeatils)
          .then(res => {
            pID = res.data.id;
            medicalHistory
              .create(mHistory)
              .then(res => {
                mID = res.data.id;
                covidQuestionaire
                  .create(cQuestionaire)
                  .then(res => {
                    qID = res.data.id;
                    healthDetails
                      .create(hDetails)
                      .then(res => {
                        hID = res.data.id;
                        let detailsID = {
                          personalID: pID,
                          medicalID: mID,
                          questionaireID: qID,
                          healthID: hID
                        };
                        console.log(detailsID);
                        patientDetails.create(detailsID).then(res => {
                          console.log(res.data);
                          this.$router.replace("/").then(() => {
                            this.$q.loading.hide();
                          });
                        });
                      })
                      .catch(err => console.log(err));
                  })
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      } else {
        this.$refs.stepper.next();
        console.log("Something went wrong!");
      }
    },
    updateDetails() {
      this.$refs.stepper.next();
      this.pDeatils = this.$store.state.patient.personalDetails;
      this.mHistory = this.$store.state.patient.medicalHistory;
      this.cQuestionaire = this.$store.state.patient.covidQuestionaire;
      this.hDetails = this.$store.state.patient.healthDetails;

      if (this.step === 1) {
        // validate required inputs
        if (
          this.pDetails.citizenType === "" ||
          this.pDetails.fName === "" ||
          this.pDetails.lName === "" ||
          this.pDetails.gender === "" ||
          this.pDetails.contactNum === "" ||
          this.pDetails.age === "" ||
          this.pDetails.province === "" ||
          this.pDetails.municipal === "" ||
          this.pDetails.brgy === "" ||
          this.pDetails.currentAddress === "" ||
          this.pDetails.brghomeAddressy === ""
        ) {
          this.hasErrorInPD = true;
          this.scrollToTop();
        } else {
          this.hasErrorInPD = false;
          this.$refs.stepper.next();
        }
        // add personal details
      } else if (this.step === 4) {
        // add health details
        console.log(this.hDetails);
        if (
          this.hDetails.obeservation === "" ||
          this.hDetails.fName === "" ||
          this.hDetails.lName === ""
        ) {
          this.hasErrorInHD = true;
          this.scrollToTop();
        } else {
          this.hasErrorInHD = false;
          this.$refs.stepper.next();
        }
      } else if (this.step === 5) {
        this.$q.loading.show();
        let pDeatils = this.$store.state.patient.personalDetails;
        let mHistory = this.$store.state.patient.medicalHistory;
        let cQuestionaire = this.$store.state.patient.covidQuestionaire;
        let hDetails = this.$store.state.patient.healthDetails;

        let pID = "";
        let mID = "";
        let qID = "";
        let hID = "";
        personalDetails
          .update(this.$route.params.id, pDeatils)
          .then(res => {
            console.log(res.data);
            medicalHistory
              .update(this.$route.params.id, mHistory)
              .then(res => {
                console.log(res.data);
                covidQuestionaire
                  .update(this.$route.params.id, cQuestionaire)
                  .then(res => {
                    console.log(res.data);
                    healthDetails
                      .update(this.$route.params.id, hDetails)
                      .then(res => {
                        console.log(res.data);
                        this.$q.loading.hide();
                      })
                      .catch(err => console.log(err));
                  })
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      } else {
        this.$refs.stepper.next();
        console.log("Something went wrong!");
      }
    },
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
