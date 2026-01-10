package com.progresspoint.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class ExerciseApiClient {
  private final RestClient client;

  public ExerciseApiClient(
      @Value("${rapidapi.baseUrl}") String baseUrl,
      @Value("${rapidapi.key}") String apiKey,
      @Value("${rapidapi.host}") String apiHost
  ) {
    this.client = RestClient.builder()
        .baseUrl(baseUrl)
        .defaultHeader("X-RapidAPI-Key", apiKey)
        .defaultHeader("X-RapidAPI-Host", apiHost)
        // Default for JSON endpoints (image calls will override Accept below)
        .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
        .build();
  }

  // JSON endpoints
  public String get(String path) {
    return client.get()
        .uri(path)
        .retrieve()
        .body(String.class);
  }

  public ResponseEntity<byte[]> getBytes(String path) {
    return client.get()
        .uri(path)
        .header(HttpHeaders.ACCEPT, "image/*,*/*")
        .retrieve()
        .toEntity(byte[].class);
  }
}
