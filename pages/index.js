import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/router"

function Login(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard")
    }
  })
  return (
    //
    <div className="min-h-screen bg-gray-100 flex items-center">
      <img
        className="w-full h-full m-auto z-1 object-cover opacity-900 absolute"
        src='/images/login-background.jpg'
        width="62"
        height="62"
        alt="User"
      />
      <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300 z-0 left-0 right-0 absolute">
        <div className="py-12 p-10 bg-white/75 rounded-xl">
          <Image
            className="w-32 h-32 m-auto rounded-full"
            src='/images/logo.png'
            width="32"
            height="32"
            alt="User"
          />

          <form>
            <div className="mb-2">
              <label
                className="mr-4 text-lg font-semibold text-gray-700 inline-block mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                className="border bg-gray-100 py-2 px-4 w-full outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="Username"
                onChange={(event) => {
                  setUsername(event.target.value)
                }}
              />
            </div>

            <div className="mb-2">
              <label
                className="mr-4 text-lg font-semibold text-gray-700 inline-block mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                className="border bg-gray-100 py-2 px-4 w-full outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 text-indigo-50 text-lg font-semibold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300"
              onClick={() => {
                if (username == "admin" && password == "admin") {
                  setIsLoggedIn(true)
                } else {
                  alert("Wrong email or password")
                  setIsLoggedIn(false)
                }
              }}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
