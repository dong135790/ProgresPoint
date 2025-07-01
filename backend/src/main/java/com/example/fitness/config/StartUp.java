// package com.example.fitness.config;

// import com.example.fitness.model.Exercise;
// import com.example.fitness.model.SingleExercise;
// import com.example.fitness.model.WorkoutPlan;
// import com.example.fitness.util.JsonUtil;
// import org.springframework.stereotype.Component;

// import jakarta.annotation.PostConstruct;
// import java.util.List;

// // Tells spring to manage this class
// @Component
// public class StartUp {

//     List<WorkoutPlan> allWorkoutPlans;
    
//     WorkoutPlan initialPlan;

//     // Spring immediately starts this when it finishes setting up
//     @PostConstruct
//     public void start() {
//         allWorkoutPlans = JsonUtil.createListFromJson();
//         System.out.println("Json successfully loaded " + allWorkoutPlans.size());

//         System.out.println(allWorkoutPlans.toString());
//     }

//     public List<WorkoutPlan> getAllPlans() { return this.allWorkoutPlans; }

//     public WorkoutPlan getWorkoutPlan() { return this.initialPlan; }
// }
