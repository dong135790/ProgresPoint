package com.example.fitness.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Exercise {
    
    @Id
    private Long id;
    private String bodyPart;
    private String equipment;
    private String gifUrl;
    private String name;
    private String target;
    private String description;
    private String difficulty;
    private String category;

    @ElementCollection
    private List<String> secondaryMuscles;
    @ElementCollection
    private List<String> instructions;

    public Exercise() {}

    public String getBodyPart() { return this.bodyPart; }

    public void setBodyPart(String bodyPart) { this.bodyPart = bodyPart; }

    public String getEquipment() { return this.equipment; }

    public void setEquipment(String equipment) { this.equipment = equipment; }

    public String getGifUrl() { return this.gifUrl; }

    public void setGifUrl(String gifUrl) { this.gifUrl = gifUrl; }

    public Long getId() { return this.id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return this.name; }

    public void setName(String name) { this.name = name; }

    public String getTarget() { return this.target; }

    public void setTarget(String target) { this.target = target; }

    public List<String> getSecondaryMuscles() { return this.secondaryMuscles; }

    public void setSecondaryMuscles(List<String> secondaryMuscles) { this.secondaryMuscles = secondaryMuscles; }

    public List<String> getInstructions() { return this.instructions; }

    public void setInstructions(List<String> instructions) { this.instructions = instructions; }

    public String getDescription() { return this.description; }

    public void setDescription(String description) { this.description = description; }

    public String getDifficulty() { return this.difficulty; }

    public void setDifficulty(String difficulty) {this.difficulty = difficulty; }

    public String getCategory() { return this.category; }
    
    public void setCategory(String category) { this.category = category; }

}
