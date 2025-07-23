import React from 'react';
import Drive from './pages/Drive';
import LoginForm from './pages/LoginForm';

function App() {
  var isLoggedIn = localStorage.getItem( "token" )

  if( isLoggedIn ) {
    return <Drive />
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  )
}

export default App;
