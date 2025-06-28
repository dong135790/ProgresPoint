package com.example.fitness.util;

import com.example.fitness.model.WorkoutPlan;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

import com.example.fitness.model.Exercise;
import com.example.fitness.model.SingleExercise;

import java.io.File;
import java.io.InputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.core.io.ClassPathResource;

public class JsonUtil {

    public static List<WorkoutPlan> createListFromJson() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream inputStream = new ClassPathResource("workout-plans.json").getInputStream();
            List<WorkoutPlan> list = objectMapper.readValue(inputStream, new TypeReference<List<WorkoutPlan>>() {});
            return list;
        } catch (IOException error) {
            System.out.println("Error reading JSON File: " + error);
            return new ArrayList<>();
        }
    }

    public static void writePlanToJson(List<WorkoutPlan> plan) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            File file = new File("src/main/resources/workout-plans.json");
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, plan);
            System.out.println("Successfully wrote to JSON");
        } catch (IOException e) {
            System.out.println("Error writing JSON File: " + e.getMessage());
        }
    }
}