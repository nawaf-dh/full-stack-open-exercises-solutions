import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
    const request = axios.get(baseUrl)
    
    return request.then(response => response.data)
}


const add = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, updatedPerson) => {
    return axios.put(`${baseUrl}/${id}`, updatedPerson).then((response) => response.data);
  };

const del = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}


export default { getAll, add, update, del }