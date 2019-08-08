import axios from 'axios';


class Api {
  get(url) {
    return axios.get(url);
  }
}

export default new Api();