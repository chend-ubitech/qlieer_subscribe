import axios from 'axios'
const baseUrl = 'http://localhost:3333/'

const getAllPlans = () => {
  return axios.get(`${baseUrl}/plans`)
}

export default {
  getAllPlans
}