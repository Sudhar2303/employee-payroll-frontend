import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';


const CardContainerComponent = ({data,isLoading}) => 
{
  const location = useLocation();
  const [arraySize, setArraySize] = useState(0);

  useEffect(() => {

    if (location.pathname.includes('/people') || location.pathname === ('/hr')) {
      setArraySize(4);
    } else {
      setArraySize(2);
    }
  }, [location.pathname]); 

  const renderPlaceholders = () => {
    return Array(arraySize).fill().map((_, index) => (
      <div className='card-container' key={index}>
        <div className='card-value placeholder-item'></div>
        <div className='card-header placeholder-item'></div>
      </div>
    ));
  };

  return (
    <React.Fragment>
      { isLoading ? (
        renderPlaceholders()
      ) : (
        data && data.map((iterator)=>(
            <div className='card-container' key = {iterator._id}>
                <div className='card-value'> {iterator.isCurrency ? '₹' : ''} {iterator.value}</div>
                <div className='card-header'>{iterator.heading}</div>
            </div>
        )))
      }
    </React.Fragment>
  )
}

export default CardContainerComponent