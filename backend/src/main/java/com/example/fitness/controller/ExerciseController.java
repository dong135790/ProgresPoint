package com.example.fitness.controller;

import com.example.fitness.model.Exercise;
import com.example.fitness.model.SingleExercise;
import com.example.fitness.model.WorkoutPlan;
import com.example.fitness.config.StartUp;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

@RestController
public class ExerciseController {

    @Value("${rapidapi.host}")
    private String rapidapiHost;

    @Value("${rapidapi.key}")
    private String rapidapiKey;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private StartUp startUp;

    public HttpEntity<String> getHttpEntity() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-host", rapidapiHost);
        headers.set("x-rapidapi-key", rapidapiKey);
        return new HttpEntity<>(headers);
    }

    @GetMapping("/api/exercises")
    public ResponseEntity<String> getExercises() {
        String url = "https://exercisedb.p.rapidapi.com/exercises?limit=2000&offset=0";
        ResponseEntity<String> response = restTemplate.exchange(
            url, HttpMethod.GET, getHttpEntity(), String.class
        );
        return ResponseEntity.ok(response.getBody());
    }

    @GetMapping("/api/exercises/name/{name}")
    public ResponseEntity<String> getExerciseByName(@PathVariable String name) {
        String url = "https://exercisedb.p.rapidapi.com/exercises/name/" + name;
        ResponseEntity<String> response = restTemplate.exchange(
            url, HttpMethod.GET, getHttpEntity(), String.class
        );
        return ResponseEntity.ok(response.getBody());
    }

    @GetMapping("/api/exercises/exercise/{id}")
    public ResponseEntity<String> getExerciseById(@PathVariable String id) {
        String url = "https://exercisedb.p.rapidapi.com/exercises/exercise/" + id;
        ResponseEntity<String> response = restTemplate.exchange(
            url, HttpMethod.GET, getHttpEntity(), String.class
        );
        return ResponseEntity.ok(response.getBody());
    }

    @GetMapping("/api/exercises/target/{target}")
    public ResponseEntity<String> getExerciseByTarget(@PathVariable String target) {
        String url = "https://exercisedb.p.rapidapi.com/exercises/target/" + target;
        ResponseEntity<String> response = restTemplate.exchange(
            url, HttpMethod.GET, getHttpEntity(), String.class
        );
        return ResponseEntity.ok(response.getBody());
    }

    @GetMapping("/api/exercises/equipment/{type}")
    public ResponseEntity<String> getExerciseByEquipmentType(@PathVariable String type) {
        String url = "https://exercisedb.p.rapidapi.com/exercises/equipment/" + type;
        ResponseEntity<String> response = restTemplate.exchange(
            url, HttpMethod.GET, getHttpEntity(), String.class
        );
        return ResponseEntity.ok(response.getBody());
    }

    @GetMapping("/api/exercises/bodyPart/{bodyPart}")
    public ResponseEntity<String> getExerciseByBodyPart(@PathVariable String bodyPart) {
        String url = "https://exercisedb.p.rapidapi.com/exercises/bodyPart/" + bodyPart;
        ResponseEntity<String> response = restTemplate.exchange(
            url, HttpMethod.GET, getHttpEntity(), String.class
        );
        return ResponseEntity.ok(response.getBody());
    }

    @GetMapping("/api/exercises/bodyPartList")
    public ResponseEntity<String> getExerciseByBodyPartList() {
        String url = "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";
        ResponseEntity<String> response = restTemplate.exchange(
            url, HttpMethod.GET, getHttpEntity(), String.class
        );
        return ResponseEntity.ok(response.getBody());
    }

    @GetMapping("/api/exercises/equipmentList")
    public ResponseEntity<String> getExerciseByEquipmentList() {
        String url = "https://exercisedb.p.rapidapi.com/exercises/equipmentList";
        ResponseEntity<String> response = restTemplate.exchange(
            url, HttpMethod.GET, getHttpEntity(), String.class
        );
        return ResponseEntity.ok(response.getBody());
    }

    @GetMapping("/api/exercises/targetList")
    public ResponseEntity<String> getExerciseByTargetList() {
        String url = "https://exercisedb.p.rapidapi.com/exercises/targetList";
        ResponseEntity<String> response = restTemplate.exchange(
            url, HttpMethod.GET, getHttpEntity(), String.class
        );
        return ResponseEntity.ok(response.getBody());
    }

    // Mapping of backend
    @GetMapping("/api/exercises/model/{id}")
    public ResponseEntity<Exercise> getSingleExerciseAsModel(@PathVariable String id) {
        String url = "https://exercisedb.p.rapidapi.com/exercises/exercise/" + id;
        ResponseEntity<Exercise> response = restTemplate.exchange(
            url, HttpMethod.GET, getHttpEntity(), Exercise.class
        );
        return ResponseEntity.ok(response.getBody());
    }

    // Mapping of startup
    @GetMapping("/api/exercises/start")
    public ResponseEntity<List<WorkoutPlan>> getStartUpClass() {
        List<WorkoutPlan> exercises = startUp.getAllPlans();
        if (exercises.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(exercises);
    }

    @GetMapping("/api/exercises/mock")
    public ResponseEntity<WorkoutPlan> getWorkoutPlanClass() {
        WorkoutPlan workout = startUp.getWorkoutPlan();
        if (workout.getExerciseList().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(workout);
    }
}
