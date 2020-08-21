import axios from 'axios'

const SERVER_ROOT = 'http://api.sendagifttosomeone.com'

export async function createGift(postData) {
  await axios.post(`${SERVER_ROOT}/gifts`, postData)
}
