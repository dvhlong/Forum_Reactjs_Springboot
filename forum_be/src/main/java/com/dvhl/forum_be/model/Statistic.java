package com.dvhl.forum_be.model;

public class Statistic {
    private long postQuantity;

    private long memberQuantity;

    private User newMember;

    public Statistic() {
    }

    public Statistic(long postQuantity, long memberQuantity, User newMember) {
        this.postQuantity = postQuantity;
        this.memberQuantity = memberQuantity;
        this.newMember = newMember;
    }

    public long getPostQuantity() {
        return postQuantity;
    }

    public void setPostQuantity(long postQuantity) {
        this.postQuantity = postQuantity;
    }

    public long getMemberQuantity() {
        return memberQuantity;
    }

    public void setMemberQuantity(long memberQuantity) {
        this.memberQuantity = memberQuantity;
    }

    public User getNewMember() {
        return newMember;
    }
    
    public void setNewMember(User newMember) {
        this.newMember = newMember;
    }
    
}
