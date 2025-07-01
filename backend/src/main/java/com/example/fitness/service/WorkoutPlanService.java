// WorkoutPlanService.java
package com.example.fitness.service;

import com.example.fitness.model.SingleExercise;
import com.example.fitness.model.WorkoutPlan;
import com.example.fitness.repository.SingleExerciseRepository;
import com.example.fitness.repository.WorkoutPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WorkoutPlanService {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    @Autowired
    private SingleExerciseRepository singleExerciseRepository;

    // Save or update a plan
    public WorkoutPlan savePlan(WorkoutPlan plan) {
        return workoutPlanRepository.save(plan);
    }

    // Get all plans
    public List<WorkoutPlan> getAllPlans() {
        return workoutPlanRepository.findAll();
    }

    // Get plan by ID
    public Optional<WorkoutPlan> getPlanById(Long id) {
        return workoutPlanRepository.findById(id);
    }

    // Delete plan by ID
    public void deletePlan(Long id) {
        workoutPlanRepository.deleteById(id);
    }

    // Find plan(s) by name
    public List<WorkoutPlan> findPlansByName(String name) {
        return workoutPlanRepository.findByName(name);
    }

    // Update plan (optional: could just call save again with existing ID)
    public WorkoutPlan updatePlan(Long id, WorkoutPlan updatedPlan) {
        return workoutPlanRepository.findById(id)
            .map(plan -> {
                plan.setName(updatedPlan.getName());
                plan.setExerciseList(updatedPlan.getExerciseList());
                return workoutPlanRepository.save(plan);
            })
            .orElseThrow(() -> new RuntimeException("Workout plan not found"));
    }

    @Transactional
    public void removeExerciseFromPlan(Long planId, int exerciseIndex) {
        Optional<WorkoutPlan> maybePlan = workoutPlanRepository.findById(planId);
        if (maybePlan.isEmpty()) {
            throw new RuntimeException("Workout plan not found");
        }

        WorkoutPlan plan = maybePlan.get();
        if (exerciseIndex < 0 || exerciseIndex >= plan.getExerciseList().size()) {
            throw new RuntimeException("Exercise index out of bounds");
        }

        SingleExercise exerciseToRemove = plan.getExerciseList().get(exerciseIndex);
        plan.removeFromExerciseList(exerciseIndex);
        workoutPlanRepository.save(plan);  // Save the updated plan

        // Explicitly delete the exercise from the database
        singleExerciseRepository.delete(exerciseToRemove);
    }

}
