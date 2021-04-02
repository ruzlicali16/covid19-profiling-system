<template>
  <q-form>
    <q-card flat class="my-card q-pa-md" style="width: 899px">
      <q-card-section class="text-green text-center text-h4 text-weight-medium">
        <span v-if="isUpdate">Update Profile</span>
        <span v-else>Health Details</span>
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
            v-model="health.obeservation"
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
            v-model="health.fName"
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
            ref="fName"
            v-model="health.fName"
            color="green"
            label="Last Name"
            stack-label
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Last name is required'
            ]"
            hide-bottom-space
          />
        </div>
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script>
export default {
  name: "Action",
  data() {
    return {
      health: {
        obeservation: "",
        fName: "",
        lName: ""
      },
      isUpdate: false
    };
  }
};
</script>

<style></style>
