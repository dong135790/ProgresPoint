package com.progresspoint.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class ExerciseApiClient {
  private final RestClient client;

  public ExerciseApiClient(
      @Value("${rapidapi.baseUrl}")
      String baseUrl,

      @Value("${rapidapi.key}")
      String apiKey,

      @Value("${rapidapi.host}")
      String apiHost
  ) {
    this.client = RestClient.builder()
        .baseUrl(baseUrl)
        .defaultHeader("X-RapidAPI-Key", apiKey)
        .defaultHeader("X-RapidAPI-Host", apiHost)
        .defaultHeader(HttpHeaders.ACCEPT, "application/json")
        .build();
  }

  public String get(String path) {
    return client.get().uri(path).retrieve().body(String.class);
  }
}
