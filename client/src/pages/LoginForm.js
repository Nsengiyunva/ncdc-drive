import React, { useState } from 'react';
import fixture_data from './fixtures'

const LoginForm = () => {

  const { staff : data } = fixture_data;

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { email, password } = formData;

    //validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    //login the user
    let user = data.filter( result => {
        return email === result.email && password === result.password 
    } )

    if( user?.length > 0 ) {
        await localStorage.setItem( "token", user?.[ 0 ]?.token )
        await localStorage.setItem( "user", JSON.stringify( user?.[ 0 ] ) )
        window.location.reload()
    }
    else {
        setError('Invalid credentials.')
        return alert( "Your credentials are invalid. You may not login at this moment." )
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-[500px]">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {`Login to NCDC Files Repository`}
      </h2>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="username@example.com"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded pr-10"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2 right-2 text-sm"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
