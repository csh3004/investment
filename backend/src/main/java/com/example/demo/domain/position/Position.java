package com.example.demo.domain.position;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "position_id", unique = true, nullable = false)
    private Long id;

    @Column(length = 15, nullable = false)
    private String userID;

    @Column(length = 15, nullable = false)
    private double entryPrice;

    @Column(length = 100, nullable = false)
    private String positionType;

    @Column(length = 50, nullable = false)
    private int quantity;

    @Builder
    public Position(String userID, double entryPrice, String positionType, int quantity) {
        this.userID = userID;
        this.entryPrice = entryPrice;
        this.positionType = positionType;
        this.quantity = quantity;
    }
}
