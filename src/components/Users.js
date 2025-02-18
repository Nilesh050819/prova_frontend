import { useState, useEffect } from 'react'
import {Link,Outlet,useNavigate } from "react-router-dom";
import axios from '../api/axios';
import useRefreshToken from '../hooks/useRefreshToken';
 
const Users = () => {
    const [users, setUsers] = useState([]);
    const refresh = useRefreshToken();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers  = async () => {
            try {
                const response = await axios.get('/logins/',{
                    signal: controller.signal
                });
                console.log(response);
                isMounted && setUsers(response.data);
            } catch(err){
                console.error(err);
            }
        }
        getUsers();

        return  () => {
            isMounted = false;
            controller.abort();
        }

    },[])

  return (
    <section>
        <h1>Admin Pages</h1>
        <br />
    <article>
        <h2>user List</h2>
       
        { users.map((user, i) => 
                    <li key={i}>
                    {user.email}
                    </li>)
                }
         <button onClick={() => refresh()}>Refresh</button>
    </article>
    <br />

    <div className="flexGrow">
        <Link to="/">Home</Link>
    </div>
    </section>
  )
}

export default Users