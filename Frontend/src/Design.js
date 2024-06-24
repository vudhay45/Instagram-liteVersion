// Design.js
import React, { useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css'
import axios from 'axios'

function Design() {
  const [userData, setuserData] = useState()
  const fetchPosts = async () => {
    const data = await axios.get('https://jsonplaceholder.typicode.com/photos')
    console.log(data.data)
    setuserData(data.data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="bg-gray-100 min-h-screen">
      {userData &&
        userData.map((user, index) => (
          <div
            key={index}
            className="max-w-sm mx-auto my-5 bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold text-indigo-700">
                {user.title}
              </h2>
              <img
                src={user.thumbnailUrl}
                alt="img"
                className="my-3 w-full rounded-md shadow-md hover:shadow-lg transition-shadow"
              />
            </div>
          </div>
        ))}
    </div>
  )
}

export default Design
