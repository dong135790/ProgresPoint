package com.example.fitness.controller;

import com.example.fitness.model.SingleExercise;
import com.example.fitness.model.WorkoutPlan;
import com.example.fitness.service.WorkoutPlanService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plan")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanService workoutPlanService;

    //Get all plans from DB
    @GetMapping
    public ResponseEntity<List<WorkoutPlan>> getAllPlans() {
        try {
            List<WorkoutPlan> plans = workoutPlanService.getAllPlans();
            if (plans.isEmpty()) {
                return ResponseEntity.noContent().build();  // 204 if no plans exist
            }
            return ResponseEntity.ok(plans);  // 200 OK if plans exist
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("COCO: ");
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(null);  // 500 if something goes wrong
        }
    }
    //Get a specific plan by ID
    @GetMapping("/{id}")
    public ResponseEntity<WorkoutPlan> getPlanById(@PathVariable Long id) {
        Optional<WorkoutPlan> maybePlan = workoutPlanService.getPlanById(id);
        return maybePlan.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Create a new workout plan
    @PostMapping("/create")
    public ResponseEntity<WorkoutPlan> createPlan(@RequestBody WorkoutPlan newPlan) {
        WorkoutPlan saved = workoutPlanService.savePlan(newPlan);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    //Add an exercise to a plan
    @PostMapping("/add/{planId}")
    public ResponseEntity<String> addExerciseToPlan(@PathVariable Long planId, @RequestBody SingleExercise exercise) {
        try {

        Optional<WorkoutPlan> maybePlan = workoutPlanService.getPlanById(planId);
        if (maybePlan.isEmpty()) {
            return ResponseEntity.badRequest().body("Plan not found");
        }
        WorkoutPlan plan = maybePlan.get();
        exercise.setWorkoutPlan(plan);
        System.out.println("YKD\n\n\n\n\n\n\n\n\n");
        System.out.println(exercise);
        plan.addToExerciseList(exercise);

        System.out.println(plan);

        
        workoutPlanService.savePlan(plan); // Save updated plan
        return ResponseEntity.ok("Exercise added to plan");
        } catch (Exception e) {
            System.out.println("FAILUREEEE: \n");
            System.out.println(e);
            return ResponseEntity.badRequest().body("Could not add to workoutPlan");

        }
    }

    //Remove an exercise by index from a plan
    @DeleteMapping("/remove/{planId}/{exerciseIndex}")
    public ResponseEntity<String> removeExercise(@PathVariable Long planId, @PathVariable int exerciseIndex) {
        Optional<WorkoutPlan> maybePlan = workoutPlanService.getPlanById(planId);
        if (maybePlan.isEmpty()) {
            return ResponseEntity.badRequest().body("Plan not found");
        }

        WorkoutPlan plan = maybePlan.get();
        if (exerciseIndex < 0 || exerciseIndex >= plan.getExerciseList().size()) {
            return ResponseEntity.badRequest().body("Exercise index out of bounds");
        }

        plan.removeFromExerciseList(exerciseIndex);
        workoutPlanService.savePlan(plan);
        return ResponseEntity.ok("Exercise removed from plan");
    }

    //Delete a whole plan by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePlan(@PathVariable Long id) {
        workoutPlanService.deletePlan(id);
        return ResponseEntity.ok("Workout plan deleted");
    }
}
