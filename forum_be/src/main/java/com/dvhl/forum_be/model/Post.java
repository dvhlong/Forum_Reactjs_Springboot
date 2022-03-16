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
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String content;
    @Column(columnDefinition = "bigint default 0")
    private long view;
    @ManyToOne(targetEntity = Topic.class)
    @JoinColumn(name = "topic_id",referencedColumnName = "id")
    private Topic topic;
    @ManyToOne(targetEntity = Account.class)
    @JoinColumn(name = "created_acc",referencedColumnName = "id")
    private Account created_acc;
    private Timestamp created_at;
    @ManyToOne(targetEntity = Account.class)
    @JoinColumn(name = "updated_acc",referencedColumnName = "id")
    private Account updated_acc;
    private Timestamp updated_at;
    @ManyToOne(targetEntity = Account.class)
    @JoinColumn(name = "deleted_acc",referencedColumnName = "id")
    private Account deleted_acc;
    private Timestamp deleted_at;
    @ManyToOne(targetEntity = Account.class)
    @JoinColumn(name = "approved_acc",referencedColumnName = "id")
    private Account approved_acc;
    private Timestamp approved_at;
    public Post() {
    }
    public Post(String title, String content, long view, Topic topic, Account created_acc, Timestamp created_at,
            Account updated_acc, Timestamp updated_at, Account deleted_acc, Timestamp deleted_at, Account approved_acc,
            Timestamp approved_at) {
        this.title = title;
        this.content = content;
        this.view = view;
        this.topic = topic;
        this.created_acc = created_acc;
        this.created_at = created_at;
        this.updated_acc = updated_acc;
        this.updated_at = updated_at;
        this.deleted_acc = deleted_acc;
        this.deleted_at = deleted_at;
        this.approved_acc = approved_acc;
        this.approved_at = approved_at;
    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public long getView() {
        return view;
    }
    public void setView(long view) {
        this.view = view;
    }
    public Topic getTopic() {
        return topic;
    }
    public void setTopic(Topic topic) {
        this.topic = topic;
    }
    public Account getCreated_acc() {
        return created_acc;
    }
    public void setCreated_acc(Account created_acc) {
        this.created_acc = created_acc;
    }
    public Timestamp getCreated_at() {
        return created_at;
    }
    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }
    public Account getUpdated_acc() {
        return updated_acc;
    }
    public void setUpdated_acc(Account updated_acc) {
        this.updated_acc = updated_acc;
    }
    public Timestamp getUpdated_at() {
        return updated_at;
    }
    public void setUpdated_at(Timestamp updated_at) {
        this.updated_at = updated_at;
    }
    public Account getDeleted_acc() {
        return deleted_acc;
    }
    public void setDeleted_acc(Account deleted_acc) {
        this.deleted_acc = deleted_acc;
    }
    public Timestamp getDeleted_at() {
        return deleted_at;
    }
    public void setDeleted_at(Timestamp deleted_at) {
        this.deleted_at = deleted_at;
    }
    public Account getApproved_acc() {
        return approved_acc;
    }
    public void setApproved_acc(Account approved_acc) {
        this.approved_acc = approved_acc;
    }
    public Timestamp getApproved_at() {
        return approved_at;
    }
    public void setApproved_at(Timestamp approved_at) {
        this.approved_at = approved_at;
    }
    
}
