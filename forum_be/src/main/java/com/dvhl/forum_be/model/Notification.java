package com.dvhl.forum_be.model;

import java.sql.Timestamp;

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
    @ManyToOne(targetEntity = Account.class)
    @JoinColumn(name = "notified_acc",referencedColumnName = "id")
    private Account notified_acc;
    private Timestamp notified_at;
    public Notification() {
    }
    public Notification(String content, Post post, Account notified_acc, Timestamp notified_at) {
        this.content = content;
        this.post = post;
        this.notified_acc = notified_acc;
        this.notified_at = notified_at;
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
    public Account getNotified_acc() {
        return notified_acc;
    }
    public void setNotified_acc(Account notified_acc) {
        this.notified_acc = notified_acc;
    }
    public Timestamp getNotified_at() {
        return notified_at;
    }
    public void setNotified_at(Timestamp notified_at) {
        this.notified_at = notified_at;
    }
    
}
