package com.dvhl.forum_be.model;

import java.sql.Date;
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
@Table(name = "account")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String username;

    private String password;

    @ManyToOne(targetEntity = Role.class)
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role;

    @Column(nullable = false)
    private boolean isblocked;

    private String name;

    private String email;

    private String phone;

    private Date birthdate;

    private String avatar;

    @Column(columnDefinition = "varchar(255) default 'https://drive.google.com/uc?export=view&id=1cIgmNNzJVnsunnlDmhft52zhGL8YN8q_'")
    private String avatarUrl;

    @JsonIgnore
    private Timestamp createdat;

    @JsonIgnore
    private Timestamp updatedat;

    public User(long id, String username, String password, Role role, boolean isblocked, String name, String email,
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

    public User() {
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
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

    public boolean getIsblocked() {
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

    public Timestamp getCreatedAt() {
        return createdat;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdat = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedat;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedat = updatedAt;
    }
}
