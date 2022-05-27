package com.dvhl.forum_be.model;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {

    private long id;

    private String title;

    private String content;

    private long view;

    private boolean isdeleted;

    private boolean isapproved;

    private long topicId;

    private long createdUserId;

    private Timestamp createdAt;

    private long updatedUserId;

    private Timestamp updatedAt;

    private long deletedUserId;

    private Timestamp deletedat;

    private long approvedUserId;

    private Timestamp approvedAt;

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

    public boolean isIsdeleted() {
        return isdeleted;
    }

    public void setIsdeleted(boolean isdeleted) {
        this.isdeleted = isdeleted;
    }

    public boolean isIsapproved() {
        return isapproved;
    }

    public void setIsapproved(boolean isapproved) {
        this.isapproved = isapproved;
    }

    public long getTopicId() {
        return topicId;
    }

    public void setTopicId(long topicId) {
        this.topicId = topicId;
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

    public Timestamp getDeletedat() {
        return deletedat;
    }

    public void setDeletedat(Timestamp deletedat) {
        this.deletedat = deletedat;
    }

    public long getApprovedUserId() {
        return approvedUserId;
    }

    public void setApprovedUserId(long approvedUserId) {
        this.approvedUserId = approvedUserId;
    }

    public Timestamp getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(Timestamp approvedAt) {
        this.approvedAt = approvedAt;
    }

}
