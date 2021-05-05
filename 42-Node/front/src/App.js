import React, { useState, useEffect } from 'react'

import MyInfoService from './services/me'
import Info from './components/Info'

const App = () => {
  const [myInfo, setMyinfo] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const resp = await MyInfoService.getMyInfo()
      setMyinfo(resp)
    }
    try {
      const access_token = window.localStorage.getItem('auth')
      if (!access_token) {
        return window.location.href = process.env.REACT_APP_AUTHURL
      }
      MyInfoService.setToken(access_token)
      fetchData()
    } catch (e) {
      window.localStorage.clear('auth')
      console.error('Token not valid', e.message)
    }
  }, [])

  return (
    <div className="App">

      <Info info={myInfo} />
    </div>
  )
}

export default App;
