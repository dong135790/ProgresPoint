package com.example.fitness.model;

import java.util.ArrayList;
import java.util.List;


public class WorkoutPlan {

    private String name;
    private List<SingleExercise> listOfExercises = new ArrayList<>();

    public WorkoutPlan() {}

    public WorkoutPlan(String name) {
        this.name = name;
        this.listOfExercises = new ArrayList<>();
    }

    public String getName() { return this.name; }

    public List<SingleExercise> getExerciseList() { return this.listOfExercises; }

    public void setName(String name) { this.name = name; }

    public void setExerciseList(List<SingleExercise> list) { this.listOfExercises = list; }

    public void addToExerciseList(SingleExercise singleExercise) { listOfExercises.add(singleExercise); }

    public void removeFromExerciseList(int index) {
        if (index >= 0 && index < listOfExercises.size()) {
            listOfExercises.remove(index);
        } else {
            System.out.println("Exercise NOT found in list");
        }
    }

    @Override
    public String toString() {
        return "Workout Plan: \n" + this.name + " ExerciseList: " + this.listOfExercises;
    }
}
