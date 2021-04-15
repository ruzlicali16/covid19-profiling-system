import http from "../utils/http-common";

class MedicalHistory {
  getAll() {
    return http.get("/medical-history");
  }

  get(id) {
    return http.get(`/medical-history/${id}`);
  }

  create(data) {
    return http.post("/medical-history", data);
  }

  update(id, data) {
    return http.put(`/medical-history/${id}`, data);
  }

  delete(id) {
    return http.delete(`/medical-history/${id}`);
  }

  deleteAll() {
    return http.delete(`/medical-history`);
  }
}

let medicalHistory = new MedicalHistory();
export default medicalHistory;
