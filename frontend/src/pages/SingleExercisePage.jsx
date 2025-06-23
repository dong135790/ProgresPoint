import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom' 

const SingleExercisePage = () => {
    const { id } = useParams()
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchSingleExeriseData = async () => {
            const exerciseData = await fetch('http://localhost:8080/api/exercises/exercise/' + id)
            .then(res => res.json())
            setData(exerciseData)
            console.log("success")
        }
        fetchSingleExeriseData();
    }, [])

    if (!data) return <div>Loading...</div>
    return (
        <div>{data.name}</div>
    )
}

export default SingleExercisePage