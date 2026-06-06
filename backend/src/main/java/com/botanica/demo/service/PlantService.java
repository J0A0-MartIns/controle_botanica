package com.botanica.demo.service;

import com.botanica.demo.entity.CareRecord;
import com.botanica.demo.entity.Plant;
import com.botanica.demo.entity.User;
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
    private final com.botanica.demo.repository.UserRepository userRepository;

    @Autowired
    public PlantService(PlantRepository plantRepository, 
                        CareRecordRepository careRecordRepository,
                        com.botanica.demo.repository.UserRepository userRepository) {
        this.plantRepository = plantRepository;
        this.careRecordRepository = careRecordRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<Plant> getAllPlants(String username) {
        return plantRepository.findByUserUsername(username);
    }

    @Transactional(readOnly = true)
    public Plant getPlantById(Long id, String username) {
        return plantRepository.findByIdAndUserUsername(id, username)
                .orElseThrow(() -> new ResourceNotFoundException("Planta não encontrada com o ID: " + id));
    }

    public Plant savePlant(Plant plant, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado: " + username));
        plant.setUser(user);
        return plantRepository.save(plant);
    }

    public CareRecord addCareRecord(Long plantId, CareRecord careRecord, String username) {
        Plant plant = plantRepository.findByIdAndUserUsername(plantId, username)
                .orElseThrow(() -> new ResourceNotFoundException("Planta não encontrada com o ID: " + plantId));
        
        careRecord.setPlant(plant);
        return careRecordRepository.save(careRecord);
    }

    @Transactional(readOnly = true)
    public List<CareRecord> getCareHistory(Long plantId, String username) {
        if (!plantRepository.existsByIdAndUserUsername(plantId, username)) {
            throw new ResourceNotFoundException("Planta não encontrada com o ID: " + plantId);
        }
        return careRecordRepository.findByPlantIdOrderByDateDesc(plantId);
    }
}
