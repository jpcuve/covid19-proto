import React from 'react'
import { RouteComponentProps } from 'react-router'
import PageTemplate from './PageTemplate'

const CardTemplate: React.FC<RouteComponentProps> = props => {
  return (
    <PageTemplate {...props}>
      <button>Previous</button>
      <button>Next</button>
      <div>
        {props.children}
      </div>
    </PageTemplate>
  )
}

export default CardTemplate