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
import javax.persistence.Transient;


@Entity
@Table(name = "topic")
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String topicname;

    @Column(columnDefinition = "bigint default 0")
    private long postamount;

    @Column(nullable = false)
    private boolean isdeleted;

    @Column(name = "deleted_at")
    private Timestamp deletedat;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "deleted_acc",referencedColumnName = "id")
    private User deletedacc;

    @Column(name = "created_at")
    private Timestamp createdat;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "created_acc",referencedColumnName = "id")
    private User createdacc;

    @Column(name = "updated_at")
    private Timestamp updatedat;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "updated_acc",referencedColumnName = "id")
    private User updatedacc;

    @Transient
    private long amountTopic;
    
    public Topic() {
    }
    
    public Topic(String topicname, long post_amount, boolean isdeleted, Timestamp deleted_at, User deleted_acc,
            Timestamp created_at, User created_acc, Timestamp updated_at, User updated_acc) {
        this.topicname = topicname;
        this.postamount = post_amount;
        this.isdeleted = isdeleted;
        this.deletedat = deleted_at;
        this.deletedacc = deleted_acc;
        this.createdat = created_at;
        this.createdacc = created_acc;
        this.updatedat = updated_at;
        this.updatedacc = updated_acc;
    }
    
    public long getAmountTopic() {
        return amountTopic;
    }

    public void setAmountTopic(long amountTopic) {
        this.amountTopic = amountTopic;
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
        return postamount;
    }

    public void setPost_amount(long post_amount) {
        this.postamount = post_amount;
    }

    public Timestamp getDeleted_at() {
        return deletedat;
    }

    public void setDeleted_at(Timestamp deleted_at) {
        this.deletedat = deleted_at;
    }

    public User getDeleted_acc() {
        return deletedacc;
    }

    public void setDeleted_acc(User deleted_acc) {
        this.deletedacc = deleted_acc;
    }

    public Timestamp getCreated_at() {
        return createdat;
    }

    public void setCreated_at(Timestamp created_at) {
        this.createdat = created_at;
    }

    public User getCreated_acc() {
        return createdacc;
    }

    public void setCreated_acc(User created_acc) {
        this.createdacc = created_acc;
    }

    public Timestamp getUpdated_at() {
        return updatedat;
    }

    public void setUpdated_at(Timestamp updated_at) {
        this.updatedat = updated_at;
    }

    public User getUpdated_acc() {
        return updatedacc;
    }
    
    public void setUpdated_acc(User updated_acc) {
        this.updatedacc = updated_acc;
    }
    
}
