import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
        <div>
            <h1>Progress Point</h1>
            <div>Talent is something you make bloom, instinct is something you polish</div>
            <Link to="/Exercise">
                <button>Exercises</button>
            </Link>
        </div>
        <div>
            <img src="" alt="" />
        </div>
    </>
  )
}

export default HomePage