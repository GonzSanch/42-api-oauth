import axios from 'axios'
const baseurl = 'https://api.intra.42.fr/v2/me'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getMyInfo = async () => {
    const config = {
        headers: { Authorization: token }
    }
    const resp = await axios.get(baseurl, config)
    return resp.data;
}

export default { setToken, getMyInfo }