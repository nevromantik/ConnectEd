import React from 'react'
import { useParams } from 'react-router';
function Admin({id}) {

  console.log(id, 'route params')

  return (
    <div>Admin dashboard</div>
  )
}

export default Admin