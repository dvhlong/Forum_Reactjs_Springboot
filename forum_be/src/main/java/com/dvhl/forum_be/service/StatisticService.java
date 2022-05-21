package com.dvhl.forum_be.service;

import com.dvhl.forum_be.model.Response;
import com.dvhl.forum_be.model.Statistic;
import com.dvhl.forum_be.repositories.AccountRepository;
import com.dvhl.forum_be.repositories.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class StatisticService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    AccountRepository accountRepository;

    public ResponseEntity<Response> getStatistic() {
        Statistic statistic = new Statistic();
        statistic.setPostQuantity(postRepository.count());
        statistic.setMemberQuantity(accountRepository.count());
        statistic.setNewMember(accountRepository.findFirstByOrderByCreatedatDesc());
        return ResponseEntity.status(HttpStatus.OK).body(new Response("OK", "Successful", statistic));
    }
}
