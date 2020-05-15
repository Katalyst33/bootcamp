/* eslint-disable no-async-promise-executor */

import axios from "axios";

const url = "http://localhost:5000/api/v1/bootcamps/";

class apiServices {
  //get resources

  static async getPosts() {
    const res = await axios.get(url);
    try {
      const data = res.data;
      return data.map((resource) => ({
        ...resource,
        createdAt: new Date(resource.createdAt),
      }));
    } catch (err) {
      return err;
    }
  }

  //create resources

  static insertResource(text) {
    return axios.post(url, {
      text,
    });
  }

  //delete resources
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default apiServices;
