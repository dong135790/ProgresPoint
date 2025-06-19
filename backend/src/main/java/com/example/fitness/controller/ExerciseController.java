package com.example.fitness.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
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

    @GetMapping("/api/external-exercises")
    public ResponseEntity<String> getExercises() {
        String url = "https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=0";

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-host", rapidapiHost);
        headers.set("x-rapidapi-key", rapidapiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
            url, HttpMethod.GET, entity, String.class
        );

        return ResponseEntity.ok(response.getBody());
    }
}
