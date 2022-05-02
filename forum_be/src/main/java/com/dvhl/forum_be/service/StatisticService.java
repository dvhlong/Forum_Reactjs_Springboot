package com.dvhl.forum_be.service;

import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Statistic;
import com.dvhl.forum_be.repositories.AccountRepo;
import com.dvhl.forum_be.repositories.PostRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class StatisticService {
    @Autowired
    PostRepo postRepo;
    @Autowired
    AccountRepo accountRepo;
    public ResponseEntity<Response> getStatistic(){
        Statistic statistic=new Statistic();
        statistic.setPostQuantity(postRepo.count());
        statistic.setMemberQuantity(accountRepo.count());
        statistic.setNewMember(accountRepo.findFirstByOrderByCreatedatDesc());
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", "Successful", statistic));
    }
}
