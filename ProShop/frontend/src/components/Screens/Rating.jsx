import React from 'react'
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { FaStarHalfAlt } from "react-icons/fa"

function Rating({ value, text, color }) {
  return (
    <div className="my-3">
      {value > 1 ? <AiFillStar style={{ color }} /> : value > 0.5 ? <FaStarHalfAlt style={{ color }} /> : <AiOutlineStar />}
      {value > 2 ? <AiFillStar style={{ color }} /> : value > 1.5 ? <FaStarHalfAlt style={{ color }} /> : <AiOutlineStar />}
      {value > 3 ? <AiFillStar style={{ color }} /> : value > 2.5 ? <FaStarHalfAlt style={{ color }} /> : <AiOutlineStar />}
      {value > 4 ? <AiFillStar style={{ color }} /> : value > 3.5 ? <FaStarHalfAlt style={{ color }} /> : <AiOutlineStar />}
      {value >= 5 ? <AiFillStar style={{ color }} /> : value > 4.5 ? <FaStarHalfAlt style={{ color }} /> : <AiOutlineStar />}

      <span>{text}Reviews</span>

    </div>
  )
}

Rating.defaultProps = {
  color: "yellow"
}

export default Rating