package com.dvhl.forum_be.model;

import java.sql.Date;
import java.sql.Timestamp;

public class UserDTO {

    private long id;

    private String username;

    private String password;

    private Role role;

    private boolean isblocked;

    private String name;

    private String email;

    private String phone;

    private Date birthdate;

    private String avatar;

    private String avatarUrl;

    private Timestamp createdat;

    private Timestamp updatedat;

    public UserDTO(long id, String username, String password, Role role, boolean isblocked, String name, String email,
            String phone, Date birthdate, String avatar, String avatarUrl, Timestamp createdat, Timestamp updatedat) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.isblocked = isblocked;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.birthdate = birthdate;
        this.avatar = avatar;
        this.avatarUrl = avatarUrl;
        this.createdat = createdat;
        this.updatedat = updatedat;
    }

    public UserDTO() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isIsblocked() {
        return isblocked;
    }

    public void setIsblocked(boolean isblocked) {
        this.isblocked = isblocked;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public Timestamp getCreatedat() {
        return createdat;
    }

    public void setCreatedat(Timestamp createdat) {
        this.createdat = createdat;
    }

    public Timestamp getUpdatedat() {
        return updatedat;
    }

    public void setUpdatedat(Timestamp updatedat) {
        this.updatedat = updatedat;
    }

}
