import http from "../utils/http-common";

class HealthDetails {
  getAll() {
    return http.get("/health-details");
  }

  get(id) {
    return http.get(`/health-details/${id}`);
  }

  create(data) {
    return http.post("/health-details", data);
  }

  update(id, data) {
    return http.put(`/health-details/${id}`, data);
  }

  delete(id) {
    return http.delete(`/health-details/${id}`);
  }

  deleteAll() {
    return http.delete(`/health-details`);
  }
}

let healthDetails = new HealthDetails();
export default healthDetails;
