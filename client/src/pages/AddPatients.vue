<template>
  <q-page class="q-pa-md text-center">
    <q-form @submit="isUpdate ? updateProfile() : addPatient()">
      <q-card class="my-card q-pa-md">
        <q-card-section class="text-green text-center text-h4">
          <span v-if="isUpdate">Update Profile</span>
          <span v-else>Add Patient</span>
        </q-card-section>
        <q-card-section class="row q-col-gutter-x-lg">
          <div class="col-6">
            <q-input v-model="patient.fName" type="text" label="First Name" />
          </div>
          <div class="col-6">
            <q-input v-model="patient.lName" type="text" label="Last Name" />
          </div>
          <div class="col-6">
            <q-input v-model="patient.gender" type="text" label="Gender" />
          </div>
          <div class="col-6">
            <q-input
              v-model="patient.contactNum"
              type="number"
              label="Contact Number"
            />
          </div>
          <div class="col-6">
            <q-input v-model="patient.age" type="number" label="Age" />
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            :label="isUpdate ? 'Update Profile' : 'Add Patient'"
            type="submit"
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import patientDataService from "../services/patient-data.service.js";
export default {
  name: "AddPatient",
  data() {
    return {
      patient: {
        fName: "",
        lName: "",
        gender: "",
        contactNum: "",
        age: ""
      },
      id: null,
      isUpdate: false
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.getPatientByID();
    }
  },
  methods: {
    addPatient() {
      let data = this.patient;
      patientDataService
        .create(data)
        .then(response => {
          console.log(response.data);
          this.patient = {};
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err.message);
        });
    },

    getPatientByID() {
      let id = this.$route.params.id;
      patientDataService
        .get(id)
        .then(response => {
          console.log(response.data);
          this.patient = response.data;
          this.isUpdate = true;
        })
        .catch(err => {
          console.log(err.message);
        });
    },

    updateProfile() {
      let data = this.patient;
      let id = this.$route.params.id;
      patientDataService
        .update(id, data)
        .then(response => {
          console.log(response.data);
          this.patient = {};
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }
};
</script>

<style></style>
