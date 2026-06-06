package com.botanica.demo.controller;

import com.botanica.demo.entity.CareRecord;
import com.botanica.demo.entity.Plant;
import com.botanica.demo.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plants")
public class PlantController {

    private final PlantService plantService;

    @Autowired
    public PlantController(PlantService plantService) {
        this.plantService = plantService;
    }

    @GetMapping
    public ResponseEntity<List<Plant>> getAllPlants(java.security.Principal principal) {
        List<Plant> plants = plantService.getAllPlants(principal.getName());
        return ResponseEntity.ok(plants);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plant> getPlantById(@PathVariable Long id, java.security.Principal principal) {
        Plant plant = plantService.getPlantById(id, principal.getName());
        return ResponseEntity.ok(plant);
    }

    @PostMapping
    public ResponseEntity<Plant> createPlant(@RequestBody Plant plant, java.security.Principal principal) {
        Plant savedPlant = plantService.savePlant(plant, principal.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPlant);
    }

    @PostMapping("/{plantId}/records")
    public ResponseEntity<CareRecord> addCareRecord(
            @PathVariable Long plantId,
            @RequestBody CareRecord careRecord,
            java.security.Principal principal) {
        CareRecord savedRecord = plantService.addCareRecord(plantId, careRecord, principal.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecord);
    }

    @GetMapping("/{plantId}/records")
    public ResponseEntity<List<CareRecord>> getCareHistory(
            @PathVariable Long plantId,
            java.security.Principal principal) {
        List<CareRecord> history = plantService.getCareHistory(plantId, principal.getName());
        return ResponseEntity.ok(history);
    }
}
