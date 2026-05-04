package com.example.demo.domain.position.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PositionRequsetDTO {

    String userID;

    double entryPrice;

    String positionType;

    int quantityPercent;

}
