import React, {useState} from 'react';
import "./register.css"
import axios from "axios"
import { Link } from "react-router-dom";

const Register = () => {
    //const history = useHistory();
    const [user, setUser] = useState({
        email:"",
        password:""
    })
    const submitRegister = () => {
        axios.post("http://localhost:8080/api/logins/register/",user)
        .then(res => {
               // alert(res.data.user.id)
               if(res.data.user.id > 0)
               {
                
               // history.push("/")
               }
                
        })
      .catch(err => {
             //alert("invalid cred")
      });
     }
    const handleChange = e => {
            const { name, value} = e.target
            setUser({
                ...user,
                [name]:value
            })
    }

    return (
       
        <div className ="container">
          
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2>Register</h2>
                <form method="">
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="text" name="email" className="form-control" id="email" value={user.email} placeholder="Enter your username" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="text" name="password" className="form-control" id="password" value={user.password} placeholder="Enter your password" onChange={handleChange} />
                    </div>
                    <button type="button" onClick={submitRegister} className="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    </div>
    )
}
export default Register;
