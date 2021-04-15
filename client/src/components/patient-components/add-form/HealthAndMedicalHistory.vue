<template>
  <q-form>
    <q-card flat class="my-card q-pa-md">
      <q-card-section class="text-green text-center text-h4 text-weight-medium">
        <span v-if="isUpdate">Update Profile</span>
        <span v-else>Patient Details</span>
      </q-card-section>
      <div class="q-pl-md text-grey-9 text-h5">Health and Medical History</div>
      <q-separator spaced />
      <q-card-section class="row q-col-gutter-x-lg q-col-gutter-y-md">
        <div class="col-12">
          <div class="text-grey-9">Please list down your diseases</div>
          <q-input
            outlined
            v-model="healthIssue.diseases"
            label="Type here.."
            color="green"
            type="textarea"
            stack-label
            hint="Format: Anemia / Atritis / Gout"
          />
        </div>
        <div class="col-12">
          <div class="text-grey-9">Please type down family medical history</div>
          <q-input
            outlined
            v-model="healthIssue.famMedHistory"
            label="Type here.."
            color="green"
            type="textarea"
            stack-label
          />
        </div>
        <div class="col-12">
          <div class="text-grey-9">Do you smoke?</div>
          <q-option-group
            :options="smokingHealthIssueOpt"
            label="Notifications"
            color="green"
            type="radio"
            v-model="healthIssue.smokingHealthIssue"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script>
import medicalHistory from "../../../services/medical-history.service.js";

export default {
  name: "HealthAndMedicalHistory",
  emits: ["check-inputs"],
  data() {
    return {
      healthIssue: {
        diseases: "",
        smokingHealthIssue: "",
        famMedHistory: ""
      },
      smokingHealthIssueOpt: [
        { label: "No", value: "No" },
        { label: "0-1 pack/day", value: "0-1 pack/day" },
        { label: "1-2 packs/day", value: "1-2 packs/day" },
        { label: "2+ packs/day", value: "2+ packs/day" }
      ],
      isUpdate: false,
      otherHealthIssueOpt: false
    };
  },
  updated() {
    let healthIssue = this.healthIssue;
    this.$emit("check-inputs", healthIssue);
  },
  mounted() {
    if (this.$route.params.id) {
      this.getMedHistoryByID();
    }
  },
  methods: {
    getMedHistoryByID() {
      let id = this.$route.params.id;
      medicalHistory
        .get(id)
        .then(response => {
          console.log(response.data);
          this.healthIssue = response.data;
          this.isUpdate = true;
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  },
  deactivated() {
    let patient = this.healthIssue;
    this.$store.dispatch("patient/medicalHistory", patient);
  }
};
</script>

<style></style>
