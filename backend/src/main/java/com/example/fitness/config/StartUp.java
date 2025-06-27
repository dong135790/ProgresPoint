package com.example.fitness.config;

import com.example.fitness.model.Exercise;
import com.example.fitness.model.SingleExercise;
import com.example.fitness.model.WorkoutPlan;
import com.example.fitness.util.JsonUtil;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.util.List;

// Tells spring to manage this class
@Component
public class StartUp {

    List<SingleExercise> listOfExercises;
    
    WorkoutPlan initialPlan;

    // Spring immediately starts this when it finishes setting up
    @PostConstruct
    public void start() {
        listOfExercises = JsonUtil.createListFromJson();
        System.out.println("Json successfully loaded " + listOfExercises.size());
        initialPlan = new WorkoutPlan("Step One");

        for (SingleExercise ex: listOfExercises) {
            initialPlan.addToExerciseList(ex);
        }

        System.out.println(initialPlan.toString());
    }

    public List<SingleExercise> getListOfExercises() { return this.listOfExercises; }

    public WorkoutPlan getWorkoutPlan() { return this.initialPlan; }
}
