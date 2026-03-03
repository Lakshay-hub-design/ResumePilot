import React, { useState } from 'react'
import '../auth.form.scss'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

  const { error, loading, handleLogin } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await handleLogin({ email, password })
    if (success) {
      navigate('/')
    }
  }

  return (
    <main>
      <div className="form-container">
          <h1>Login</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" id="email" name="email" placeholder='Enter email address' required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                type="password" id="password" name="password" placeholder='Enter password' required />
            </div>

              {error && <p className='error'>{error}</p>}

            <button className='button primary-button' disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
          </form>
          <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
      </div>
    </main>
  )
}

export default Login