package com.example.demo.domain.position;

import com.example.demo.domain.position.DTO.PositionRequsetDTO;
import com.example.demo.domain.user.DTO.UserRequestDTO;
import com.example.demo.domain.user.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PositionService {

    @Autowired
    private PositionRepository positionRepository;

    @Transactional
    public Position savePosition(PositionRequsetDTO dto) {
        System.out.println(dto);
        Position position = new Position(dto.getUserID(), dto.getEntryPrice(), dto.getPositionType(), dto.getQuantity());
        return positionRepository.save(position);
    }

    public List<Position> getAllPosition() {
        return positionRepository.findAll();
    }
}
