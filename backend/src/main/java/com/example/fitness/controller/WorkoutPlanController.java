package com.example.fitness.controller;

import com.example.fitness.model.Exercise;
import com.example.fitness.model.SingleExercise;
import com.example.fitness.model.WorkoutPlan;
import com.example.fitness.config.StartUp;
import com.example.fitness.util.JsonUtil;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/plan")
public class WorkoutPlanController {

    @Autowired
    private StartUp startUp;

    @GetMapping
    public ResponseEntity<List<WorkoutPlan>> getPlan() {
        return ResponseEntity.ok(startUp.getAllPlans());
    }

    @PostMapping("/add/{index}")
    public ResponseEntity<String> addExercise(
            @PathVariable int index,
            @RequestBody SingleExercise singleExercise) {

        List<WorkoutPlan> plans = startUp.getAllPlans();

        if (plans.isEmpty() || index < 0 || index >= plans.size()) {
            return ResponseEntity.badRequest().body("Invalid plan index.");
        }

        WorkoutPlan targetPlan = plans.get(index);
        if (targetPlan.getExerciseList().size() < 10) {
            targetPlan.addToExerciseList(singleExercise);
            JsonUtil.writePlanToJson(plans);
            return ResponseEntity.ok("Exercise added to plan");
        } else {
            return ResponseEntity.badRequest().body("Too many exercises in workout");
        }

    }

    @DeleteMapping("/remove/{index}")
    public ResponseEntity<String> removeExercise(@PathVariable int index) {
        try {
            startUp.getWorkoutPlan().removeFromExerciseList(index);
            return ResponseEntity.ok("Exercise removed");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid index");
        }
    }

    @PutMapping("/update/{index}")
    public ResponseEntity<String> updateExercise(@PathVariable int index, @RequestBody SingleExercise updatedExercise) {
        WorkoutPlan plan = startUp.getWorkoutPlan();
        if (index < 0 || index >= plan.getExerciseList().size()) {
            return ResponseEntity.badRequest().body("Index out of bounds");
        }
        plan.getExerciseList().set(index, updatedExercise);
        return ResponseEntity.ok("Exercise updated");
    }
}
