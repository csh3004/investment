package com.example.demo.domain.position;

import com.example.demo.domain.position.DTO.PositionRequsetDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("position")
public class PositionController {

    @Autowired
    private PositionService positionService;

    @GetMapping("/test")
    private String test(){
        System.out.println("test API");
        return "1";
    }

    @GetMapping("/getAll")
    private List<Position> getAll(){
        return positionService.getAllPosition();
    }

    @PostMapping("/make")
    private Position make(@RequestBody PositionRequsetDTO dto){
        return positionService.savePosition(dto);
    }
}
