import axios from "axios";

async function getSubjects(idStructure) {
  try {
    const request = {
      method: "GET",
      url: `${
        global.config.auth.endpoint
      }/directory/timetable/subjects/${idStructure}`
    };
    const { data } = await axios(request);
    return data;
  } catch (err) {
    throw err;
  }
}

export default {
  getSubjects
};
