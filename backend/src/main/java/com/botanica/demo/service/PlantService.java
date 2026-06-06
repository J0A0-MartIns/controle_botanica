package com.botanica.demo.service;

import com.botanica.demo.entity.CareRecord;
import com.botanica.demo.entity.Plant;
import com.botanica.demo.exception.ResourceNotFoundException;
import com.botanica.demo.repository.CareRecordRepository;
import com.botanica.demo.repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PlantService {

    private final PlantRepository plantRepository;
    private final CareRecordRepository careRecordRepository;

    @Autowired
    public PlantService(PlantRepository plantRepository, CareRecordRepository careRecordRepository) {
        this.plantRepository = plantRepository;
        this.careRecordRepository = careRecordRepository;
    }

    @Transactional(readOnly = true)
    public List<Plant> getAllPlants() {
        return plantRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Plant getPlantById(Long id) {
        return plantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Planta não encontrada com o ID: " + id));
    }

    public Plant savePlant(Plant plant) {
        return plantRepository.save(plant);
    }

    public CareRecord addCareRecord(Long plantId, CareRecord careRecord) {
        Plant plant = plantRepository.findById(plantId)
                .orElseThrow(() -> new ResourceNotFoundException("Planta não encontrada com o ID: " + plantId));
        
        careRecord.setPlant(plant);
        return careRecordRepository.save(careRecord);
    }

    @Transactional(readOnly = true)
    public List<CareRecord> getCareHistory(Long plantId) {
        if (!plantRepository.existsById(plantId)) {
            throw new ResourceNotFoundException("Planta não encontrada com o ID: " + plantId);
        }
        return careRecordRepository.findByPlantIdOrderByDateDesc(plantId);
    }
}
