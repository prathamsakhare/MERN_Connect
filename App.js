import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [users, setUsers] = useState([]);
  const handleForm = (e) => {
    console.log(e.target.value, e.target.name);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/demo', {
      method : "POST",
      body : JSON.stringify(form),
      headers : {
        'Content-Type' : 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  };


  const getUsers = async () => {
   
    const response = await fetch('http://localhost:8000/demo', {
      method : "GET",
      
    });
    const data = await response.json();
    console.log(data);
    setUsers(data)
  }

  useEffect(() => {
    getUsers();
  },[])

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <span>username</span>
        <input
          type="text"
          value={form.username}
          name="username"
          onChange={handleForm}
        ></input>
        <span>password</span>
        <input
          type="text"
          value={form.password}
          name="password"
          onChange={handleForm}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <div>
        <ul>
        
          {
            users.map(user => <li key={user._id}>{user.username}, {user.password}</li>)
          }
        </ul>
      </div>

    </div>
  );
}

export default App;
