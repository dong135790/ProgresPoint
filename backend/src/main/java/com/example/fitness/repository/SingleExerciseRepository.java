package com.example.fitness.repository;

import com.example.fitness.model.SingleExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SingleExerciseRepository extends JpaRepository<SingleExercise, Long> {
}
