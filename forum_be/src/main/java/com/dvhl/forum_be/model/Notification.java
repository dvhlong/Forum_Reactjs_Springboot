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
@Table(name = "notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String content;
    @ManyToOne(targetEntity = Post.class)
    @JoinColumn(name = "post_id",referencedColumnName = "id")
    private Post post;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "notified_acc",referencedColumnName = "id")
    private User notifiedacc;
    @Column(name = "notified_at")
    private Timestamp notifiedat;
    public Notification() {
    }
    public Notification(String content, Post post, User notified_acc, Timestamp notified_at) {
        this.content = content;
        this.post = post;
        this.notifiedacc = notified_acc;
        this.notifiedat = notified_at;
    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public Post getPost() {
        return post;
    }
    public void setPost(Post post) {
        this.post = post;
    }
    public User getNotified_acc() {
        return notifiedacc;
    }
    public void setNotified_acc(User notified_acc) {
        this.notifiedacc = notified_acc;
    }
    public Timestamp getNotified_at() {
        return notifiedat;
    }
    public void setNotified_at(Timestamp notified_at) {
        this.notifiedat = notified_at;
    }
    
}
