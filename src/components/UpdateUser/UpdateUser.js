import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {

    const [user, setUser] = useState({});
    const {id} = useParams();

  
    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setUser(data));
    }, []) 

     const handleNameChange = event => {
         const updatedName = event.target.value;
         const updatedUser = {name: updatedName, email: user.email};
         setUser(updatedUser);
     }

     const handleEmailChange = event => {
         const updatedEmail = event.target.value;
         /*         
        // updatedUser a ai bhabe fancy bhabew lekha jay.
         const updatedUser = {...user};
         updatedUser.email = updatedEmail; 
         */
         const updatedUser = {name: user.name, email:updatedEmail}
         setUser(updatedUser);
     }

        const handleUpdateUser = event => {

            const url = `http://localhost:5000/users/${id}`;
              fetch(url, {
                     method: 'PUT',
                     headers: {
                         'content-type' : 'application/json'
                             },
                    body: JSON.stringify(user)
              })
               .then(res => res.json())
               .then(data => {
                
                if(data.modifiedCount > 0) {
                    alert('Updated Successfully.')
                    setUser({});
                }
                console.log(data)
               })

            event.preventDefault();
        }



    return (
        <div>
            
            <h4>User ID: {id}</h4>
            <h4>User Name: {user.name}</h4>
            <h4>User Email: {user.email}</h4>
             <form onSubmit={handleUpdateUser}>
                   <input type="text" onChange={handleNameChange} defaultValue={user.name || ''}/>
                   <input type="email" onChange={handleEmailChange} defaultValue={user.email || ''} name="" id="" />
                   <input type="submit" value = "Update"/>
             </form>

        </div>
    );
};

export default UpdateUser;
