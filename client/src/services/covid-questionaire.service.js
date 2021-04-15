import http from "../utils/http-common";

class CovidQuestionaire {
  getAll() {
    return http.get("/covid-questionaire");
  }

  get(id) {
    return http.get(`/covid-questionaire/${id}`);
  }

  create(data) {
    return http.post("/covid-questionaire", data);
  }

  update(id, data) {
    return http.put(`/covid-questionaire/${id}`, data);
  }

  delete(id) {
    return http.delete(`/covid-questionaire/${id}`);
  }

  deleteAll() {
    return http.delete(`/covid-questionaire`);
  }
}

let covidQuestionaire = new CovidQuestionaire();
export default covidQuestionaire;
