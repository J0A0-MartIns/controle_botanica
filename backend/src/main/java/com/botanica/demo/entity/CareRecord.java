package com.botanica.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "care_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CareRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plant_id", nullable = false)
    @JsonIgnoreProperties({"careRecords", "hibernateLazyInitializer", "handler"})
    private Plant plant;

    @Column(nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name = "care_type", nullable = false)
    private CareType careType;

    @Column(columnDefinition = "TEXT")
    private String description;
}
