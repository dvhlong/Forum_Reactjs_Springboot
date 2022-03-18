package com.dvhl.forum_be.service;

import java.sql.Timestamp;
import java.util.Date;

import org.springframework.stereotype.Service;

@Service
public class TimeService {
    public Timestamp getCurrentTimestamp(){
        Date jDate=new Date();
        long currentTime=jDate.getTime();
        Timestamp result=new Timestamp(currentTime);
        return result;
    }
}
