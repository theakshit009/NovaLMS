import React, { useEffect, useState } from 'react'

function Rating({initialRating, onRate}) {

  const [rating, setRating] = useState(initialRating || 0)

  const handleRating = (value) => {
    setRating(value);
    if(onRate) onRate(value)
  } 

  useEffect(() => {
    if(initialRating){
      setRating(initialRating)
    }
  },[initialRating])

  return (
    <div>
       {Array.from({length: 5}, (_, ind) => {
        const startvalue = ind + 1;
        return (
          <span key={ind} className={`text-xl sm:text-2xl cursor-pointer transition-colors  ${startvalue <= rating ? 'text-yellow-500' : 'txt-gray-400' }`}
          onClick={() => handleRating(startvalue)}> &#9733;</span>
        )
       })}
    </div>
  )
}

export default Rating