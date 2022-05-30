package com.dvhl.forum_be.model;

public class RoleDTO {

    private long id;

    private String rolename;

    private String imageUrl;

    public RoleDTO() {
    }

    public RoleDTO(String rolename, String imageUrl) {
        this.rolename = rolename;
        this.imageUrl = imageUrl;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

}
