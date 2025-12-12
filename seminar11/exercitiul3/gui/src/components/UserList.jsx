// import { useEffect, useState } from 'react'
// import User from './User'
// import './UserList.css'

// const SERVER = 'http://localhost:8080'

// function UserList (props) {
//   const [users, setUsers] = useState([])

//   const getUsers = async () => {
//     const response = await fetch(`${SERVER}/users`)
//     const data = await response.json()
//     console.warn(data)
//     setUsers(data)
//   }

//   useEffect(() => {
//     getUsers()
//   }, [])

//   return (
//     <div className='user-list'>
//       {
//         users.map(e => <User key={e.id} item={e} />)
//       }
//     </div>
//   )
// }

// export default UserList

import { useEffect, useState } from 'react'
import User from './User'
import './UserList.css'

const SERVER = 'http://localhost:8080'

const RegularSection = (props) => {
  const { list } = props
  return (
    <div>
      <h3>Regular Users</h3>
      <div className='user-list'>
        {list.map(e => <User key={e.id} item={e} />)}
      </div>
    </div>
  )
}

const PowerSection = (props) => {
  const { list } = props
  return (
    <div style={{ border: '2px dashed red', padding: '10px', marginTop: '20px' }}>
      <h3 style={{ color: 'red' }}>Power Users Zone</h3>
      <div className='user-list'>
        {list.map(e => <User key={e.id} item={e} />)}
      </div>
    </div>
  )
}

function UserList (props) {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const response = await fetch(`${SERVER}/users`)
      const data = await response.json()
      console.log(data)
      setUsers(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  const regularList = users.filter(user => user.type === 'regular-user')
  const powerList = users.filter(user => user.type === 'power-user')

  return (
    <div>
      <RegularSection list={regularList} />
      <PowerSection list={powerList} />
    </div>
  )
}

export default UserList