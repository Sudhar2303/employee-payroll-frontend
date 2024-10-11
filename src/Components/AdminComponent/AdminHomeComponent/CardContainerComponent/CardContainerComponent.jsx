import React from 'react'

const CardContainerComponent = ({data}) => 
{
  return (
    <React.Fragment>
        {data && data.map((iterator)=>(
            <div className='card-container' key = {iterator._id}>
                <div className='card-header'>{iterator.heading}</div>
                <div className='card-value'> {iterator.isCurrency ? '₹' : ''} {iterator.value}</div>
            </div>
        ))}
    </React.Fragment>
  )
}

export default CardContainerComponent