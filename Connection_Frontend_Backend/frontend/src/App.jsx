import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [jokes, setJokes] = useState([])
  const fetchJokes = () => {
    axios.get(`/api/jokes`)
    .then((res) => {
      setJokes(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    fetchJokes()
  }, [])

  return (
    <div>
      <p>JOKES: {jokes.length}</p>
      {jokes && jokes.map((joke) => (
        <div key={joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))}
    </div>
  )
}

export default App
