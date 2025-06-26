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

    List<Exercise> listOfExercises;
    
    WorkoutPlan initialPlan;

    // Spring immediately starts this when it finishes setting up
    @PostConstruct
    public void start() {
        listOfExercises = JsonUtil.createListFromJson();
        System.out.println("Json successfully loaded " + listOfExercises.size());

        initialPlan = new WorkoutPlan("Step One");

        for (Exercise ex: listOfExercises) {
            SingleExercise exercise = new SingleExercise(ex, 5, 10, "Stored");
            initialPlan.addToExerciseList(exercise);
        }

        System.out.println(initialPlan.toString());
    }

    public List<Exercise> getListOfExercises() { return this.listOfExercises; }

    public WorkoutPlan getWorkoutPlan() { return this.initialPlan; }
}
