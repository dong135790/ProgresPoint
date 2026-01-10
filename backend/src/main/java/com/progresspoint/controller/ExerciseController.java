package com.progresspoint.controller;

import com.progresspoint.service.ExerciseService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {
  private final ExerciseService service;

  public ExerciseController(ExerciseService service) {
    this.service = service;
  }

  @GetMapping("/")
  public String allExercises() {
    return service.getAllExercises();
  }

  @GetMapping("/bodyPartList")
  public String bodyPartList() {
    return service.bodyPartList();
  }

  @GetMapping("/bodyPart/{bodyPart}")
  public String getExerciseByBodyPart(@PathVariable String bodyPart) {
    return service.exerciseByBodyPart(bodyPart);
  }

  @GetMapping("/equipmentList")
  public String equipmentList() {
    return service.equipmentList();
  }

  @GetMapping("/equipment/{equipment}")
  public String getExerciseByEquipment(@PathVariable String equipment) {
    return service.exerciseByEquipment(equipment);
  }
  
  @GetMapping("/targetList")
  public String targetList() {
    return service.targetList();
  }

  @GetMapping("/target/{target}")
  public String getExerciseByTarget(@PathVariable String target) {
    return service.exerciseByTarget(target);
  }

  @GetMapping("/{id}")
  public String getExerciseById(@PathVariable String id) {
    return service.exerciseById(id);
  }
  @GetMapping("/image")
  public ResponseEntity<byte[]> image(
      @RequestParam String exerciseId,
      @RequestParam(defaultValue = "360") String resolution
  ) {
    ResponseEntity<byte[]> upstream = service.exerciseGif(resolution, exerciseId);

    // Forward Content-Type if provided, otherwise default to gif
    String contentType = upstream.getHeaders().getFirst(HttpHeaders.CONTENT_TYPE);
    return ResponseEntity.status(upstream.getStatusCode())
        .header(HttpHeaders.CONTENT_TYPE, contentType != null ? contentType : "image/gif")
        .body(upstream.getBody());
  }
}
