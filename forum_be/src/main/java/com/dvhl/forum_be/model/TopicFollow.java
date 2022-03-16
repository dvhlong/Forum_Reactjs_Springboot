package com.dvhl.forum_be.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "topic_follow")
public class TopicFollow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne(targetEntity = Account.class)
    @JoinColumn(name = "acc_id",referencedColumnName = "id")
    private Account acc;
    @ManyToOne(targetEntity = Topic.class)
    @JoinColumn(name = "topic_id",referencedColumnName = "id")
    private Topic topic;
    @Column(nullable = false)
    private boolean isdeleted;
    private Timestamp created_at;
    private Timestamp deleted_at;
    
    public TopicFollow(Account acc, Topic topic, boolean isdeleted, Timestamp created_at, Timestamp deleted_at) {
        this.acc = acc;
        this.topic = topic;
        this.isdeleted = isdeleted;
        this.created_at = created_at;
        this.deleted_at = deleted_at;
    }
    
    public boolean isIsdeleted() {
        return isdeleted;
    }

    public void setIsdeleted(boolean isdeleted) {
        this.isdeleted = isdeleted;
    }

    public TopicFollow() {
    }
    
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public Account getAcc() {
        return acc;
    }
    public void setAcc(Account acc) {
        this.acc = acc;
    }
    public Topic getTopic() {
        return topic;
    }
    public void setTopic(Topic topic) {
        this.topic = topic;
    }
    public Timestamp getCreated_at() {
        return created_at;
    }
    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }
    public Timestamp getDeleted_at() {
        return deleted_at;
    }
    public void setDeleted_at(Timestamp deleted_at) {
        this.deleted_at = deleted_at;
    }
    
}
