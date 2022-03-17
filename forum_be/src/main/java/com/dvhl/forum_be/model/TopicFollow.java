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
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "acc_id",referencedColumnName = "id")
    private User acc;
    @ManyToOne(targetEntity = Topic.class)
    @JoinColumn(name = "topic_id",referencedColumnName = "id")
    private Topic topic;
    @Column(nullable = false)
    private boolean isdeleted;
    @Column(name = "created_at")
    private Timestamp createdat;
    @Column(name = "deleted_at")
    private Timestamp deletedat;
    
    public TopicFollow(User acc, Topic topic, boolean isdeleted, Timestamp created_at, Timestamp deleted_at) {
        this.acc = acc;
        this.topic = topic;
        this.isdeleted = isdeleted;
        this.createdat = created_at;
        this.deletedat = deleted_at;
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
    public User getAcc() {
        return acc;
    }
    public void setAcc(User acc) {
        this.acc = acc;
    }
    public Topic getTopic() {
        return topic;
    }
    public void setTopic(Topic topic) {
        this.topic = topic;
    }
    public Timestamp getCreated_at() {
        return createdat;
    }
    public void setCreated_at(Timestamp created_at) {
        this.createdat = created_at;
    }
    public Timestamp getDeleted_at() {
        return deletedat;
    }
    public void setDeleted_at(Timestamp deleted_at) {
        this.deletedat = deleted_at;
    }
    
}
