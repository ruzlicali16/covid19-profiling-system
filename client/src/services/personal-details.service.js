import http from "../utils/http-common";

class PersonalDetails {
  getAll() {
    return http.get("/personal-details");
  }

  get(id) {
    return http.get(`/personal-details/${id}`);
  }

  create(data) {
    return http.post("/personal-details", data);
  }

  update(id, data) {
    return http.put(`/personal-details/${id}`, data);
  }

  delete(id) {
    return http.delete(`/personal-details/${id}`);
  }

  deleteAll() {
    return http.delete(`/personal-details`);
  }

  findByTitle(fName) {
    return http.get(`/personal-details?title=${fName}`);
  }
}

let personalDetails = new PersonalDetails();
export default personalDetails;
