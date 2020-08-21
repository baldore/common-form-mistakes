import axios from 'axios'

const SERVER_ROOT = 'http://api.sendagifttosomeone.com'

export async function createGift(postData) {
  return axios
    .post(`${SERVER_ROOT}/gifts`, postData)
    .then(() => ({ success: true }))
    .catch((error) => ({ error }))
}
