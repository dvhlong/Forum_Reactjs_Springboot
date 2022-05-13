package com.dvhl.forum_be.controller;

import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.service.StatisticService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// @CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(path = "/statistic")
public class StatisticController {
    
    @Autowired
    StatisticService statisticService;
    
    @GetMapping("/get")
    ResponseEntity<Response> getStatistic(){
        return statisticService.getStatistic();
    }
}
