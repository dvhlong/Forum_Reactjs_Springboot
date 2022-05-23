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

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    @Column(nullable = false)
    private boolean isdeleted;

    @Column(nullable = false)
    private boolean isapproved;

    @ManyToOne(targetEntity = Topic.class)
    @JoinColumn(name = "topic_id", referencedColumnName = "id")
    private Topic topic;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "created_acc", referencedColumnName = "id")
    private User createdacc;

    @Column(name = "created_at")
    private Timestamp createdat;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "updated_acc", referencedColumnName = "id")
    @JsonIgnore
    private User updatedacc;

    @Column(name = "updated_at")
    private Timestamp updatedat;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "deleted_acc", referencedColumnName = "id")
    @JsonIgnore
    private User deletedacc;

    @Column(name = "deleted_at")
    private Timestamp deletedat;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "approved_acc", referencedColumnName = "id")
    @JsonIgnore
    private User approvedacc;

    @JsonIgnore
    @Column(name = "approved_at")
    private Timestamp approvedat;

    public Post() {
    }

    public Post(String title, String content, long view, boolean isdeleted, boolean isapproved, Topic topic,
            User createdacc, Timestamp createdat, User updatedacc, Timestamp updatedat, User deletedacc,
            Timestamp deletedat, User approvedacc, Timestamp approvedat) {
        this.title = title;
        this.content = content;
        this.view = view;
        this.isdeleted = isdeleted;
        this.isapproved = isapproved;
        this.topic = topic;
        this.createdacc = createdacc;
        this.createdat = createdat;
        this.updatedacc = updatedacc;
        this.updatedat = updatedat;
        this.deletedacc = deletedacc;
        this.deletedat = deletedat;
        this.approvedacc = approvedacc;
        this.approvedat = approvedat;
    }

    public boolean isIsapproved() {
        return isapproved;
    }

    public void setIsapproved(boolean isapproved) {
        this.isapproved = isapproved;
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

    public User getCreated_acc() {
        return createdacc;
    }

    public void setCreated_acc(User created_acc) {
        this.createdacc = created_acc;
    }

    public Timestamp getCreated_at() {
        return createdat;
    }

    public void setCreated_at(Timestamp created_at) {
        this.createdat = created_at;
    }

    public User getUpdated_acc() {
        return updatedacc;
    }

    public void setUpdated_acc(User updated_acc) {
        this.updatedacc = updated_acc;
    }

    public Timestamp getUpdated_at() {
        return updatedat;
    }

    public void setUpdated_at(Timestamp updated_at) {
        this.updatedat = updated_at;
    }

    public User getDeleted_acc() {
        return deletedacc;
    }

    public void setDeleted_acc(User deleted_acc) {
        this.deletedacc = deleted_acc;
    }

    public Timestamp getDeleted_at() {
        return deletedat;
    }

    public void setDeleted_at(Timestamp deleted_at) {
        this.deletedat = deleted_at;
    }

    public User getApproved_acc() {
        return approvedacc;
    }

    public void setApproved_acc(User approved_acc) {
        this.approvedacc = approved_acc;
    }

    public Timestamp getApproved_at() {
        return approvedat;
    }

    public void setApproved_at(Timestamp approved_at) {
        this.approvedat = approved_at;
    }

}
