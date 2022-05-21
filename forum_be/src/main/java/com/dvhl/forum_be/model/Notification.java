package com.dvhl.forum_be.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
// import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String content;

    @ManyToOne(targetEntity = Post.class)
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private Post post;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "notified_acc", referencedColumnName = "id")
    private User notifiedacc;

    @ManyToOne(targetEntity = User.class)
    @JsonIgnore
    @JoinColumn(name = "received_acc", referencedColumnName = "id")
    private User receivedacc;

    @Column(name = "notified_at")
    private Timestamp notifiedat;

    @Column(columnDefinition = "boolean default false")
    private boolean isReaded;

    public Notification() {
    }

    public Notification(String content, Post post, User notifiedacc, User receivedacc, Timestamp notifiedat,
            boolean isReaded) {
        this.content = content;
        this.post = post;
        this.notifiedacc = notifiedacc;
        this.receivedacc = receivedacc;
        this.notifiedat = notifiedat;
        this.isReaded = isReaded;
    }

    public boolean isReaded() {
        return isReaded;
    }

    public void setReaded(boolean isReaded) {
        this.isReaded = isReaded;
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

    public User getNotifiedacc() {
        return notifiedacc;
    }

    public void setNotifiedacc(User notifiedacc) {
        this.notifiedacc = notifiedacc;
    }

    public User getReceivedacc() {
        return receivedacc;
    }

    public void setReceivedacc(User receivedacc) {
        this.receivedacc = receivedacc;
    }

    public Timestamp getNotifiedat() {
        return notifiedat;
    }

    public void setNotifiedat(Timestamp notifiedat) {
        this.notifiedat = notifiedat;
    }

}
