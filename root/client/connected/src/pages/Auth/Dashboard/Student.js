import React from 'react'
import { useParams } from 'react-router';

function Student({id}) {

  console.log(id, 'route params')
  return (
    <div>Student dashboard</div>
  )
}

export default Student