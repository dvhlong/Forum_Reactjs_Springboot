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
@Table(name = "topic")
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String topicname;
    @Column(columnDefinition = "bigint default 0")
    private long post_amount;
    @Column(nullable = false)
    private boolean isdeleted;
    private Timestamp deleted_at;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "deleted_acc",referencedColumnName = "id")
    private User deleted_acc;
    private Timestamp created_at;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "created_acc",referencedColumnName = "id")
    private User created_acc;
    private Timestamp updated_at;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "updated_acc",referencedColumnName = "id")
    private User updated_acc;
    public Topic() {
    }
    
    public Topic(String topicname, long post_amount, boolean isdeleted, Timestamp deleted_at, User deleted_acc,
            Timestamp created_at, User created_acc, Timestamp updated_at, User updated_acc) {
        this.topicname = topicname;
        this.post_amount = post_amount;
        this.isdeleted = isdeleted;
        this.deleted_at = deleted_at;
        this.deleted_acc = deleted_acc;
        this.created_at = created_at;
        this.created_acc = created_acc;
        this.updated_at = updated_at;
        this.updated_acc = updated_acc;
    }
    
    public boolean isIsdeleted() {
        return isdeleted;
    }

    public void setIsdeleted(boolean isdeleted) {
        this.isdeleted = isdeleted;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getTopicname() {
        return topicname;
    }
    public void setTopicname(String topicname) {
        this.topicname = topicname;
    }
    public long getPost_amount() {
        return post_amount;
    }
    public void setPost_amount(long post_amount) {
        this.post_amount = post_amount;
    }
    public Timestamp getDeleted_at() {
        return deleted_at;
    }
    public void setDeleted_at(Timestamp deleted_at) {
        this.deleted_at = deleted_at;
    }
    public User getDeleted_acc() {
        return deleted_acc;
    }
    public void setDeleted_acc(User deleted_acc) {
        this.deleted_acc = deleted_acc;
    }
    public Timestamp getCreated_at() {
        return created_at;
    }
    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }
    public User getCreated_acc() {
        return created_acc;
    }
    public void setCreated_acc(User created_acc) {
        this.created_acc = created_acc;
    }
    public Timestamp getUpdated_at() {
        return updated_at;
    }
    public void setUpdated_at(Timestamp updated_at) {
        this.updated_at = updated_at;
    }
    public User getUpdated_acc() {
        return updated_acc;
    }
    public void setUpdated_acc(User updated_acc) {
        this.updated_acc = updated_acc;
    }
    
}
