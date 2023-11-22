import React from 'react'
import { useParams } from 'react-router';
function Teacher({id}) {

  console.log(id, 'route params')
  return (
    <div>Teacher dashboard</div>
  )
}

export default Teacher