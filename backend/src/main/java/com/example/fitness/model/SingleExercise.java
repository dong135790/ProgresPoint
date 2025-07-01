package com.example.fitness.model;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
public class SingleExercise {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int sets;
    private int reps;
    private String notes;

    @ManyToOne
    @JsonBackReference
    private WorkoutPlan workoutPlan;


    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Exercise exercise;

    public SingleExercise() {}

    public SingleExercise (Exercise exercise, int sets, int reps, String notes) {
        this.exercise = exercise;
        this.sets = sets;
        this.reps = reps;
        if (notes == null || notes.isEmpty()) {
            this.notes = "";
        } else {
            this.notes = notes;
        }
    }
    public Long getId() { return this.id; }

    public Exercise getExercise() { return this.exercise; }

    public int getSets() { return this.sets; }

    public int getReps() { return this.reps; }
    
    public String getNotes() { return this.notes; }

    // public String getExerciseId() { return exercise.getId(); }

    // public String getExerciseName() { return exercise.getName(); }

    // public String getExerciseBodyPart() { return exercise.getBodyPart(); }

    // public String getExerciseEquipment() { return exercise.getEquipment(); }

    // public String getExerciseGifUrl() { return exercise.getGifUrl(); }

    // public String getExerciseTarget() { return exercise.getTarget(); }

    public void setExercise(Exercise exerciseData) { this.exercise = exerciseData; }

    public void setSets(int number) { this.sets = number; }

    public void setReps(int number) { this.reps = number; }

    public void setNotes(String notes) { this.notes = notes; }

    public void setWorkoutPlan(WorkoutPlan workoutPlan) {
    this.workoutPlan = workoutPlan;
    }

    
}
