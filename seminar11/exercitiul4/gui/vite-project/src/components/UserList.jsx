import { useEffect, useState } from 'react'
import User from './User'
import UserForm from './UserForm'
import './UserList.css'

const SERVER = 'http://localhost:8080'

const UserDetails = (props) => {
  const { user } = props

  if (!user) {
    return <div style={{ padding: '20px', fontWeight: 'bold' }}>Selecteaza un user din lista</div>
  }

  return (
    <div style={{ padding: '20px', border: '2px solid #333', marginTop: '20px', backgroundColor: '#f9f9f9' }}>
      <h3>Detalii User: {user.username}</h3>
      <p>ID: {user.id}</p>
      <p>Nume complet: {user.fullName}</p>
      <p>Tip: {user.type}</p>
    </div>
  )
}

function UserList (props) {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  const getUsers = async () => {
    const response = await fetch(`${SERVER}/users`)
    const data = await response.json()
    setUsers(data)
  }

  const addUser = async (user) => {
    await fetch(`${SERVER}/users`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  const regularList = users.filter(user => user.type === 'regular-user')
  const powerList = users.filter(user => user.type === 'power-user')

  return (
    <div className='user-list-container'>
      <h2>Regular Users</h2>
      <div className='user-list'>
        {regularList.map(e => (
          <div key={e.id} onClick={() => setSelectedUser(e)} style={{ cursor: 'pointer' }}>
            <User item={e} />
          </div>
        ))}
      </div>

      <h2>Power Users</h2>
      <div className='user-list'>
        {powerList.map(e => (
          <div key={e.id} onClick={() => setSelectedUser(e)} style={{ cursor: 'pointer', border: '2px dashed red' }}>
            <User item={e} />
          </div>
        ))}
      </div>

      <UserDetails user={selectedUser} />

      <UserForm onAdd={addUser} />
    </div>
  )
}

export default UserList









// import { useEffect, useState } from 'react'
// import User from './User'
// import UserForm from './UserForm'
// import './UserList.css'

// const SERVER = 'http://localhost:8080'

// function UserList (props) {
//   const [users, setUsers] = useState([])

//   const getUsers = async () => {
//     const response = await fetch(`${SERVER}/users`)
//     const data = await response.json()
//     setUsers(data)
//   }

//   const addUser = async (user) => {
//     await fetch(`${SERVER}/users`, {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(user)
//     })
//     getUsers()
//   }

//   useEffect(() => {
//     getUsers()
//   }, [])

//   return (
//     <div className='user-list'>
//       {
//         users.map(e => <User key={e.id} item={e} />)
//       }
//       <UserForm onAdd={addUser} />
//     </div>
//   )
// }

// export default UserList