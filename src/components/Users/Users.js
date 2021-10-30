import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {

  const [users, setUsers] = useState([]);

   useEffect(() => {
      
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then( data => setUsers(data))

   }, []);


   // handle DELETE an user
   const handleDeleteUser = id => {

    // ai condition use kore user theke akadhik ber permission diya delete confirm korar jonno use kora hoise.
    const proceed = window.confirm('Are you sure, you want to delete?');
    if(proceed) {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
            method: 'DELETE'/* ,
            headers: {
                   'content-type' : 'application/json'
            },
            body: JSON.stringify(id)
             */
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0) {
                 alert('deleted  Successfully')
                 // filter kore ui theke data remove ar por je gula thakbe sei gula dekhabe
                 const remainingUses = users.filter(user => user._id !==id)
                 setUsers(remainingUses);
            }
        })
    }
  
   }



    return (
        <div>
            <h2> Total Users : {users.length}</h2>
            <ul>
                {
                    users.map(user => 
                    
                    <li key={user._id}>Name: {user.name}    ::   Email: {user.email}   ------ 
                     <Link to={`/users/Update/${user._id}`}> <button>Update</button> </Link>

                    {/* onclick a arrow function use korar karon holo ai khane data niddisto id onosare data delete korbe. */}
                    <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Users;