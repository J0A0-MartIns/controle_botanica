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
@CrossOrigin(origins = "*")
public class PlantController {

    private final PlantService plantService;

    @Autowired
    public PlantController(PlantService plantService) {
        this.plantService = plantService;
    }

    @GetMapping
    public ResponseEntity<List<Plant>> getAllPlants() {
        List<Plant> plants = plantService.getAllPlants();
        return ResponseEntity.ok(plants);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plant> getPlantById(@PathVariable Long id) {
        Plant plant = plantService.getPlantById(id);
        return ResponseEntity.ok(plant);
    }

    @PostMapping
    public ResponseEntity<Plant> createPlant(@RequestBody Plant plant) {
        Plant savedPlant = plantService.savePlant(plant);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPlant);
    }

    @PostMapping("/{plantId}/records")
    public ResponseEntity<CareRecord> addCareRecord(
            @PathVariable Long plantId,
            @RequestBody CareRecord careRecord) {
        CareRecord savedRecord = plantService.addCareRecord(plantId, careRecord);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecord);
    }

    @GetMapping("/{plantId}/records")
    public ResponseEntity<List<CareRecord>> getCareHistory(@PathVariable Long plantId) {
        List<CareRecord> history = plantService.getCareHistory(plantId);
        return ResponseEntity.ok(history);
    }
}
