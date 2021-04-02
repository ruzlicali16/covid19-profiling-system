<template>
  <q-form>
    <q-card flat class="my-card q-pa-md">
      <q-card-section class="text-green text-center text-h4 text-weight-medium">
        <span v-if="isUpdate">Update Profile</span>
        <span v-else>Patient Details</span>
      </q-card-section>
      <div class="q-pl-md text-grey-9 text-h5">Personal Information</div>
      <q-separator spaced />
      <q-card-section class="row q-col-gutter-x-lg q-col-gutter-y-md">
        <div class="col-12">
          <q-select
            outlined
            ref="citizenType"
            v-model="patient.citizenType"
            :options="[
              'Civilian',
              'Uniformed Personel',
              'Government Official',
              'Health Worker',
              'Senior Citizen'
            ]"
            color="green"
            label="Citizen Type"
            stack-label
            options-dense
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Citizen type is required'
            ]"
            hide-bottom-space
          />
        </div>
        <div class="col-6">
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
        <div class="col-6">
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
        <div class="col-6">
          <q-select
            outlined
            ref="gender"
            v-model="patient.gender"
            :options="['Male', 'Female']"
            color="green"
            label="Gender"
            stack-label
            options-dense
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Gender is required']"
            hide-bottom-space
          />
        </div>
        <div class="col-6">
          <q-input
            outlined
            ref="age"
            v-model="patient.age"
            color="green"
            label="Age"
            mask="###"
            stack-label
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Age is required']"
            hide-bottom-space
          />
        </div>
        <div class="col-6">
          <q-input
            outlined
            ref="contactNum"
            v-model="patient.contactNum"
            color="green"
            label="Contact Number"
            mask="###########"
            placeholder="09xxxxxxxxx"
            stack-label
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Contact Number is required'
            ]"
            hide-bottom-space
          />
        </div>
        <div class="col-6">
          <q-input
            outlined
            ref="emailAddress"
            v-model="patient.emailAddress"
            color="green"
            label="Email Address (Optional)"
            stack-label
          />
        </div>
      </q-card-section>
      <div class="q-pl-md text-grey-9 text-h5">Address</div>
      <q-card-section class="row q-col-gutter-x-lg q-col-gutter-y-md">
        <div class="col-6">
          <q-select
            outlined
            ref="province"
            v-model="patient.province"
            :options="provinceOpt"
            color="green"
            label="Provincial"
            stack-label
            options-dense
            @input="selectedProvince(patient.province)"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Province is required']"
            hide-bottom-space
          />
        </div>
        <div class="col-6">
          <q-select
            outlined
            ref="municipal"
            v-model="patient.municipal"
            :options="municipalOpt"
            color="green"
            label="Municipal"
            stack-label
            options-dense
            @input="selectedMunicipalities(patient.municipal, patient.province)"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Municipality is required'
            ]"
            hide-bottom-space
          />
        </div>
        <div class="col-12">
          <q-select
            outlined
            ref="brgy"
            v-model="patient.brgy"
            :options="bgryOpt"
            color="green"
            label="Baranggay"
            stack-label
            options-dense
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Barangay is required']"
            hide-bottom-space
          />
        </div>
        <div class="col-12">
          <q-input
            outlined
            ref="currentAddress"
            v-model="patient.currentAddress"
            color="green"
            label="Current Address"
            stack-label
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Current address is required'
            ]"
            hide-bottom-space
          />
        </div>
        <div class="col-12">
          <q-input
            outlined
            ref="homeAddress"
            v-model="patient.homeAddress"
            color="green"
            label="Home Address"
            stack-label
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Home is required']"
            hide-bottom-space
          />
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn label="Action 1" @click="addPatient()" />
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script>
import personalDetails from "../../../services/personal-details.service.js";
import provinceJson from "../../../utils/pmb-json.utils.js";

export default {
  name: "PersonalDetails",
  data() {
    return {
      patient: {
        citizenType: "",
        fName: "",
        lName: "",
        gender: "",
        contactNum: "",
        age: "",
        emailAddress: "",
        province: "",
        municipal: "",
        brgy: "",
        currentAddress: "",
        homeAddress: ""
      },
      id: null,
      isUpdate: false,
      provinceOpt: [],
      municipalOpt: [],
      bgryOpt: []
    };
  },
  mounted() {
    provinceJson.getProvinces().then(res => {
      this.provinceOpt = res;
    });
    if (this.$route.params.id) {
      this.getPatientByID();
    }
  },
  methods: {
    addPatient() {
      let data = this.patient;
      personalDetails
        .create(data)
        .then(response => {
          this.$router.push("/").then(() => {
            this.patient = {};
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },

    getPatientByID() {
      let id = this.$route.params.id;
      personalDetails
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
      personalDetails
        .update(id, data)
        .then(response => {
          console.log(response.data);
          this.patient = {};
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err.message);
        });
    },

    selectedProvince(selectedProvince) {
      this.patient.municipal = "";
      this.patient.brgy = "";
      this.getMunicipalities(selectedProvince);
    },

    getMunicipalities(provincial) {
      provinceJson.getMunicipalities(provincial).then(res => {
        this.municipalOpt = res;
      });
    },

    selectedMunicipalities(selectedMunicipalities) {
      this.patient.brgy = "";
      this.getBrgys(this.patient.province, selectedMunicipalities);
    },

    getBrgys(provincial, municipal) {
      provinceJson.getBrgys(provincial, municipal).then(res => {
        this.bgryOpt = res;
      });
    }
  }
};
</script>

<style></style>
