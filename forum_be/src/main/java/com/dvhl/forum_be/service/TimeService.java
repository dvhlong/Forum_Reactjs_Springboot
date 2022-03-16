package com.dvhl.forum_be.service;

import java.sql.Timestamp;
import java.util.Date;

public class TimeService {
    public Timestamp getCurrentTimestamp(){
        Date jDate=new Date();
        long currentTime=jDate.getTime();
        Timestamp result=new Timestamp(currentTime);
        return result;
    }
}
