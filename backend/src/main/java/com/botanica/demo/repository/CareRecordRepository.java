package com.botanica.demo.repository;

import com.botanica.demo.entity.CareRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareRecordRepository extends JpaRepository<CareRecord, Long> {
    List<CareRecord> findByPlantId(Long plantId);
    List<CareRecord> findByPlantIdOrderByDateDesc(Long plantId);
}
