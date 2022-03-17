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
    private Comment replied_cmt;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "created_acc",referencedColumnName = "id")
    private User created_acc;
    private Timestamp created_at;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "updated_acc",referencedColumnName = "id")
    private User updated_acc;
    private Timestamp updated_at;
    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "deleted_acc",referencedColumnName = "id")
    private User deleted_acc;
    private Timestamp deleted_at;
    public Comment() {
    }
    
    public Comment(Post post, String content, boolean isdeleted, Comment replied_cmt, User created_acc,
            Timestamp created_at, User updated_acc, Timestamp updated_at, User deleted_acc,
            Timestamp deleted_at) {
        this.post = post;
        this.content = content;
        this.isdeleted = isdeleted;
        this.replied_cmt = replied_cmt;
        this.created_acc = created_acc;
        this.created_at = created_at;
        this.updated_acc = updated_acc;
        this.updated_at = updated_at;
        this.deleted_acc = deleted_acc;
        this.deleted_at = deleted_at;
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
        return replied_cmt;
    }
    public void setReplied_cmt(Comment replied_cmt) {
        this.replied_cmt = replied_cmt;
    }
    public User getCreated_acc() {
        return created_acc;
    }
    public void setCreated_acc(User created_acc) {
        this.created_acc = created_acc;
    }
    public Timestamp getCreated_at() {
        return created_at;
    }
    public void setCreated_at(Timestamp created_at) {
        this.created_at = created_at;
    }
    public User getUpdated_acc() {
        return updated_acc;
    }
    public void setUpdated_acc(User updated_acc) {
        this.updated_acc = updated_acc;
    }
    public Timestamp getUpdated_at() {
        return updated_at;
    }
    public void setUpdated_at(Timestamp updated_at) {
        this.updated_at = updated_at;
    }
    public User getDeleted_acc() {
        return deleted_acc;
    }
    public void setDeleted_acc(User deleted_acc) {
        this.deleted_acc = deleted_acc;
    }
    public Timestamp getDeleted_at() {
        return deleted_at;
    }
    public void setDeleted_at(Timestamp deleted_at) {
        this.deleted_at = deleted_at;
    }
    
}
