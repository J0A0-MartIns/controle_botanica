package com.botanica.demo.seed;

import com.botanica.demo.entity.CareRecord;
import com.botanica.demo.entity.CareType;
import com.botanica.demo.entity.Plant;
import com.botanica.demo.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final PlantService plantService;

    @Autowired
    public DatabaseSeeder(PlantService plantService) {
        this.plantService = plantService;
    }

    @Override
    public void run(String... args) throws Exception {
        if (plantService.getAllPlants().isEmpty()) {
            // Create Plant: Amoreira located in Quintal
            Plant amoreira = Plant.builder()
                    .species("Amoreira")
                    .location("Quintal")
                    .acquisitionDate(LocalDate.now().minusMonths(3))
                    .notes("Planta jovem adquirida de um produtor local. Precisa de sol pleno.")
                    .build();

            Plant savedAmoreira = plantService.savePlant(amoreira);

            // Record 1: WATERING
            CareRecord wateringRecord = CareRecord.builder()
                    .date(LocalDate.now().minusDays(2))
                    .careType(CareType.WATERING)
                    .description("Rega profunda no início da manhã.")
                    .build();

            // Record 2: PEST_CONTROL focused on leaf damage recovery
            CareRecord pestControlRecord = CareRecord.builder()
                    .date(LocalDate.now().minusDays(1))
                    .careType(CareType.PEST_CONTROL)
                    .description("Tratamento com calda bordalesa para recuperação de danos nas folhas causados por fungos.")
                    .build();

            plantService.addCareRecord(savedAmoreira.getId(), wateringRecord);
            plantService.addCareRecord(savedAmoreira.getId(), pestControlRecord);

            System.out.println("--- BANCO DE DADOS POPULADO COM SEED DE TESTE ---");
        }
    }
}
