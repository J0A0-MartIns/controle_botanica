package com.botanica.demo.repository;

import com.botanica.demo.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {
    List<Plant> findByUserUsername(String username);
    Optional<Plant> findByIdAndUserUsername(Long id, String username);
    boolean existsByIdAndUserUsername(Long id, String username);
}
