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
        <div class="col-6">
          <q-option-group
            :options="firstHealthIssueOpt"
            label="Notifications"
            color="green"
            type="checkbox"
            v-model="healthIssue.firstHealthIssue"
          />
        </div>
        <div class="col-6">
          <q-option-group
            :options="secondHealthIssueOpt"
            label="Notifications"
            color="green"
            type="checkbox"
            v-model="healthIssue.secondHealthIssue"
          />
        </div>
        <div class="col-6 q-pt-none">
          <q-checkbox
            v-model="otherHealthIssueOpt"
            label="Other"
            color="green"
          />
          <q-input
            v-if="otherHealthIssueOpt"
            dense
            outlined
            v-model="healthIssue.otherHealthIssue"
            label="Please type another option here"
            color="green"
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
export default {
  name: "HealthAndMedicalHistory",
  data() {
    return {
      healthIssue: {
        firstHealthIssue: [],
        secondHealthIssue: [],
        smokingHealthIssue: "",
        otherHealthIssue: "",
        famMedHistory: ""
      },
      firstHealthIssueOpt: [
        { label: "Anemia", value: "Anemia" },
        { label: "Arthritis", value: "Arthritis" },
        { label: "Gout", value: "Gout" },
        { label: "Epilepsy Seizures", value: "Epilepsy Seizures" },
        { label: "Heart Attack", value: "Heart Attack" },
        { label: "High Blood Pressure", value: "High Blood Pressure" },
        { label: "Ulcerative Colitis", value: "Ulcerative Colitis" },
        { label: "Kidney Disease", value: "Kidney Disease" },
        { label: "Thyroid Problems", value: "Thyroid Problems" },
        { label: "Venereal Disease", value: "Venereal Disease" },
        { label: "Bleeding Disorders", value: "Bleeding Disorders" }
      ],
      secondHealthIssueOpt: [
        { label: "Asthma", value: "Asthma" },
        { label: "Cancer", value: "Cancer" },
        { label: "Diabetes", value: "Diabetes" },
        { label: "Heart Disease", value: "Heart Disease" },
        { label: "Rheumatic Fever", value: "Rheumatic Fever" },
        { label: "Digestive Problems", value: "Digestive Problems" },
        { label: "Hepatitis", value: "Hepatitis" },
        { label: "Liver Disease", value: "Liver Disease" },
        { label: "Tuberculosis", value: "Tuberculosis" },
        { label: "Neurological Disorders", value: "Neurological Disorders" },
        {
          label: "Lung Disease (Chronic Obstructive Pulmonary Disease)",
          value: "Lung Disease (Chronic Obstructive Pulmonary Disease)"
        }
      ],
      smokingHealthIssueOpt: [
        { label: "No", value: "No" },
        { label: "0-1 pack/day", value: "0-1 pack/day" },
        { label: "1-2 packs/day", value: "1-2 packs/day" },
        { label: "2+ packs/day", value: "2+ packs/day" }
      ],
      isUpdate: false,
      otherHealthIssueOpt: false
    };
  }
};
</script>

<style></style>
