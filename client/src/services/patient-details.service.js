import http from "../utils/http-common";

class PatientDetails {
  getAll() {
    return http.get("/patient-details");
  }

  get(id) {
    return http.get(`/patient-details/${id}`);
  }

  create(data) {
    return http.post("/patient-details", data);
  }

  update(id, data) {
    return http.put(`/patient-details/${id}`, data);
  }

  delete(id) {
    return http.delete(`/patient-details/${id}`);
  }

  deleteAll() {
    return http.delete(`/patient-details`);
  }
}

let patientDetails = new PatientDetails();
export default patientDetails;
