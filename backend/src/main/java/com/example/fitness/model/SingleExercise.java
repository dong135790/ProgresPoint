package com.example.fitness.model;

public class SingleExercise {
    
    private Exercise exercise;
    private int sets;
    private int reps;
    private String notes;

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

    public Exercise getExercise() { return this.exercise; }

    public int getSets() { return this.sets; }

    public int getReps() { return this.reps; }
    
    public String getNotes() { return this.notes; }

    public String getExerciseId() { return exercise.getId(); }

    public String getExerciseName() { return exercise.getName(); }

    public String getExerciseBodyPart() { return exercise.getBodyPart(); }

    public String getExerciseEquipment() { return exercise.getEquipment(); }

    public String getExerciseGifUrl() { return exercise.getGifUrl(); }

    public String getExerciseTarget() { return exercise.getTarget(); }

    public void setExercise(Exercise exerciseData) { this.exercise = exerciseData; }

    public void setSets(int number) { this.sets = number; }

    public void setReps(int number) { this.reps = number; }

    public void setNotes(String notes) { this.notes = notes; }
}
