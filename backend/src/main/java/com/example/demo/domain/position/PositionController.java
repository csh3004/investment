package com.example.demo.domain.position;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("position")
public class PositionController {

    @GetMapping("/test")
    private String test(){
        System.out.println("test API");
        return "1";
    }

    @PostMapping("/make")
    private String make(@RequestBody String id){
        System.out.println(id);
        return "1";
    }
}
