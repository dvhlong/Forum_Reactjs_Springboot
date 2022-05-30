package com.dvhl.forum_be.model;

import java.sql.Timestamp;

public class CommentDTO {

    private long id;

    private long postId;

    private String content;

    private boolean isdeleted;

    private long repliedCommentId;

    private long createdUserId;

    private Timestamp createdAt;

    private long updatedUserId;

    private Timestamp updatedAt;

    private long deletedUserId;

    private Timestamp deletedAt;

    public CommentDTO() {
    }

    public CommentDTO(long id, long postId, String content, boolean isdeleted, long repliedCommentId,
            long createdUserId, Timestamp createdAt, long updatedUserId, Timestamp updatedAt, long deletedUserId,
            Timestamp deletedAt) {
        this.id = id;
        this.postId = postId;
        this.content = content;
        this.isdeleted = isdeleted;
        this.repliedCommentId = repliedCommentId;
        this.createdUserId = createdUserId;
        this.createdAt = createdAt;
        this.updatedUserId = updatedUserId;
        this.updatedAt = updatedAt;
        this.deletedUserId = deletedUserId;
        this.deletedAt = deletedAt;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getPostId() {
        return postId;
    }

    public void setPostId(long postId) {
        this.postId = postId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isIsdeleted() {
        return isdeleted;
    }

    public void setIsdeleted(boolean isdeleted) {
        this.isdeleted = isdeleted;
    }

    public long getRepliedCommentId() {
        return repliedCommentId;
    }

    public void setRepliedCommentId(long repliedCommentId) {
        this.repliedCommentId = repliedCommentId;
    }

    public long getCreatedUserId() {
        return createdUserId;
    }

    public void setCreatedUserId(long createdUserId) {
        this.createdUserId = createdUserId;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public long getUpdatedUserId() {
        return updatedUserId;
    }

    public void setUpdatedUserId(long updatedUserId) {
        this.updatedUserId = updatedUserId;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public long getDeletedUserId() {
        return deletedUserId;
    }

    public void setDeletedUserId(long deletedUserId) {
        this.deletedUserId = deletedUserId;
    }

    public Timestamp getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(Timestamp deletedAt) {
        this.deletedAt = deletedAt;
    }

}
