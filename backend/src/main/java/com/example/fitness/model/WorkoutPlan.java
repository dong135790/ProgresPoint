package com.example.fitness.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.ArrayList;
import java.util.List;

@Entity
public class WorkoutPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<SingleExercise> listOfExercises = new ArrayList<>();

    
    public WorkoutPlan() {}

    public WorkoutPlan(String name) {
        this.name = name;
        this.listOfExercises = new ArrayList<>();
    }


    public Long getId() { return id; }

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
