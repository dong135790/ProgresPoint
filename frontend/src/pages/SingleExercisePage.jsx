import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom' 
import ExerciseDetailCard from '../components/singleExercise/ExerciseDetailCard'
import SimilarExercise from '../components/singleExercise/SimilarExercise'
import SimilarExerciseByEquipment from '../components/singleExercise/SimilarExerciseByEquipment'

const SingleExercisePage = ({ exercises }) => {
    const { id } = useParams()
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchSingleExeriseData = async () => {
            const exerciseData = await fetch('http://18.117.229.9:8080/api/exercises/exercise/' + id)
            .then(res => res.json())
            setData(exerciseData)
        }
        fetchSingleExeriseData();
    }, [id])

    
    if (!data) return <div>Loading...</div>

    const similarExercises = exercises.filter((exercise) => {
        return (
            (exercise.bodyPart.toLowerCase() === data.bodyPart.toLowerCase()
            || exercise.target.toLowerCase() == data.target.toLowerCase())
            && exercise.id !== data.id
        )
    })

    const exercisesByEquipment = exercises.filter((exercise) => (
        exercise.equipment.toLowerCase() === data.equipment.toLowerCase()
        && exercise.id !== data.id
    ))
    return (
        <>
            <ExerciseDetailCard singleExercise={data}/>
            <SimilarExercise similarExercises={similarExercises}/>
            <SimilarExerciseByEquipment exercisesByEquipment={exercisesByEquipment}/>
        </>

    )
}

export default SingleExercisePage