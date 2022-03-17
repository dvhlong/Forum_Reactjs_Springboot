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
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne(targetEntity = Post.class)
    @JoinColumn(name = "post_id",referencedColumnName = "id")
    private Post post;
    private String content;
    @Column(nullable = false)
    private boolean isdeleted;
    @ManyToOne(targetEntity = Comment.class)
    @JoinColumn(name = "replied_cmt",referencedColumnName = "id")
    private Comment repliedcmt;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "created_acc",referencedColumnName = "id")
    private User createdacc;
    @Column(name = "created_at")
    private Timestamp createdat;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "updated_acc",referencedColumnName = "id")
    private User updatedacc;
    @Column(name = "updated_at")
    private Timestamp updatedat;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "deleted_acc",referencedColumnName = "id")
    private User deletedacc;
    @Column(name = "deleted_at")
    private Timestamp deletedat;
    public Comment() {
    }
    
    public Comment(Post post, String content, boolean isdeleted, Comment replied_cmt, User created_acc,
            Timestamp created_at, User updated_acc, Timestamp updated_at, User deleted_acc,
            Timestamp deleted_at) {
        this.post = post;
        this.content = content;
        this.isdeleted = isdeleted;
        this.repliedcmt = replied_cmt;
        this.createdacc = created_acc;
        this.createdat = created_at;
        this.updatedacc = updated_acc;
        this.updatedat = updated_at;
        this.deletedacc = deleted_acc;
        this.deletedat = deleted_at;
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
    public Post getPost() {
        return post;
    }
    public void setPost(Post post) {
        this.post = post;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public Comment getReplied_cmt() {
        return repliedcmt;
    }
    public void setReplied_cmt(Comment replied_cmt) {
        this.repliedcmt = replied_cmt;
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
    
}
