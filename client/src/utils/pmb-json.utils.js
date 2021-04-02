import json from "../../phil-pmb.json";

class ProvinceJson {
  async getProvinces() {
    let provArr = [];
    for (const [key, value] of Object.entries(json.province_list)) {
      provArr.push(
        key.replace(/\S*/g, function(word) {
          return word.charAt(0) + word.slice(1).toLowerCase();
        })
      );
    }
    return provArr.sort();
  }

  async getMunicipalities(selectedMunicipality) {
    let prov = selectedMunicipality.toUpperCase();
    let munArr = [];
    for (const [key, value] of Object.entries(
      json.province_list[prov].municipality_list
    )) {
      munArr.push(
        key.replace(/\S*/g, function(word) {
          return word.charAt(0) + word.slice(1).toLowerCase();
        })
      );
    }
    return munArr.sort();
  }

  async getBrgys(selectedProvince, selectedMunicipality) {
    let province = selectedProvince.toUpperCase();
    let municipal = selectedMunicipality.toUpperCase();
    let brgyArr = [
      json.province_list[province].municipality_list[municipal].barangay_list
    ];
    let newBrgyArr = [];
    brgyArr[0].forEach(brgy => {
      let brgyCapitalize = brgy.replace(/\S*/g, function(word) {
        return word.charAt(0) + word.slice(1).toLowerCase();
      });
      newBrgyArr.push(brgyCapitalize);
    });
    return newBrgyArr.sort();
  }
}

let provinceJson = new ProvinceJson();
export default provinceJson;
