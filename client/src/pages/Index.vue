<template>
  <q-page class="q-pa-md q-gutter-y-md">
    <div class="row justify-between items-center">
      <q-btn
        color="green"
        icon="check"
        label="add patient"
        to="/patient/add-profile"
      />
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Home" icon="home" />
        <q-breadcrumbs-el label="Components" icon="widgets" />
        <q-breadcrumbs-el label="Breadcrumbs" icon="navigation" />
      </q-breadcrumbs>
    </div>
    <div>
      <q-table
        :data="patients"
        :columns="columns"
        :filter="filter"
        row-key="id"
      >
        <template v-slot:top="props">
          <div class="col-2 q-table__title">Patients</div>

          <q-space />

          <div>
            <q-input
              outlined
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <div>
            <q-btn
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              class="q-ml-md"
            />
          </div>
        </template>

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
            <q-th auto-width />
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
            <q-td auto-width>
              <q-btn
                class="q-mr-sm"
                size="sm"
                color="green"
                round
                dense
                icon="edit"
                @click="updatePatient(props.key)"
              />
              <q-btn
                size="sm"
                color="red"
                round
                dense
                icon="delete"
                @click="deletePatient(props.key)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import patientDataService from "../services/patient-data.service.js";
export default {
  name: "PageIndex",
  data() {
    return {
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        { name: "fName", label: "First Name", field: "fName", sortable: true },
        { name: "lName", label: "Last Name", field: "lName", sortable: true },
        { name: "gender", label: "Gender", field: "gender" },
        { name: "contactNum", label: "Contact Number", field: "contactNum" },
        { name: "age", label: "Age", field: "age" }
      ],
      patients: [],
      filter: ""
    };
  },
  mounted() {
    this.retrievePatients();
  },
  methods: {
    retrievePatients() {
      patientDataService
        .getAll()
        .then(response => {
          this.patients = response.data;
          console.log(this.patients);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updatePatient(id) {
      this.$router.push(`/patient/edit-profile/${id}`);
    },
    deletePatient(id) {
      patientDataService
        .delete(id)
        .then(response => {
          console.log(response.data);
          this.retrievePatients();
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }
};
</script>
