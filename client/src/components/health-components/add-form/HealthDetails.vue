<template>
  <q-form>
    <q-card flat class="my-card q-pa-md" style="width: 899px">
      <q-card-section class="text-green text-center text-h4 text-weight-medium">
        <span v-if="isUpdate">Update Profile</span>
        <span v-else>Patient Details</span>
      </q-card-section>
      <div class="q-pl-md text-grey-9 text-h5">Actions</div>
      <div class="q-pl-md text-grey-9 text-caption">
        This area will be filled out by the health personnel
      </div>
      <q-separator spaced />
      <q-card-section class="row q-col-gutter-x-lg q-col-gutter-y-md">
        <div class="col-12">
          <div class="text-grey-9">
            Observations and Further Actions to be taken
          </div>
          <q-input
            outlined
            v-model="patient.obeservation"
            label="Type here.."
            color="green"
            type="textarea"
            stack-label
            :rules="[
              val =>
                (val && val.length > 0) ||
                'Observations and Actions is required'
            ]"
          />
        </div>
        <div class="col-12 text-grey-9">Health Personnel Name</div>
        <div class="col-6 q-pt-none">
          <q-input
            outlined
            ref="fName"
            v-model="patient.fName"
            color="green"
            label="First Name"
            stack-label
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'First name is required'
            ]"
            hide-bottom-space
          />
        </div>
        <div class="col-6 q-pt-none">
          <q-input
            outlined
            ref="lName"
            v-model="patient.lName"
            color="green"
            label="Last Name"
            stack-label
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Last name is required']"
            hide-bottom-space
          />
        </div>
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script>
import healthDetails from "../../../services/health-details.service.js";

export default {
  name: "Action",
  emits: ["check-inputs"],
  data() {
    return {
      patient: {
        obeservation: "",
        fName: "",
        lName: ""
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
      this.getHDetailsByID();
    }
  },
  methods: {
    getHDetailsByID() {
      let id = this.$route.params.id;
      healthDetails
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
    this.$store.dispatch("patient/healthDetails", patient);
  }
};
</script>

<style></style>
