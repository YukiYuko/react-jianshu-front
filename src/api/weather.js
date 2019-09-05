import ajax from "axios";

const BASE_URL = "https://free-api.heweather.net/s6/weather/";

const weather = {
  getNormalWeather(
    type = "now",
    params = {
      key: "105ffd7e157a4f209db983160bb8544a",
      location: "chengdu"
    }
  ) {
    return ajax.get(BASE_URL + `${type}`, {
      params
    });
  }
};

export default weather;
