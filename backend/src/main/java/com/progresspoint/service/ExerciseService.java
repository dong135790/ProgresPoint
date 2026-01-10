package com.progresspoint.service;

import com.progresspoint.client.ExerciseApiClient;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class ExerciseService {
  private final ExerciseApiClient client;

  public ExerciseService(ExerciseApiClient client) {
    this.client = client;
  }

  public String getAllExercises() {
    return client.get("/exercises?limit=0");
  }

  public String bodyPartList() {
    return client.get("/exercises/bodyPartList");
  }

  public String exerciseByBodyPart(String bodyPart) {
    return client.get("/exercises/bodyPart/" + bodyPart + "?limit=0");
  }

  public String equipmentList() {
    return client.get("/exercises/equipmentList");
  }

  public String exerciseByEquipment(String equipment) {
    return client.get("/exercises/equipment/" + equipment + "?limit=0");
  }

  public String targetList() {
    return client.get("/exercises/targetList");
  }

  public String exerciseByTarget(String target) {
    return client.get("/exercises/target/" + target + "?limit=0");
  }

  public String exerciseById(String id) {
    return client.get("/exercises/exercise/" + id);
  }

  public ResponseEntity<byte[]> exerciseGif(String resolution, String exerciseId) {
  String path = UriComponentsBuilder
      .fromPath("/image")
      .queryParam("resolution", resolution)
      .queryParam("exerciseId", exerciseId)
      .build(true)
      .toUriString();

  return client.getBytes(path);
  }
}
