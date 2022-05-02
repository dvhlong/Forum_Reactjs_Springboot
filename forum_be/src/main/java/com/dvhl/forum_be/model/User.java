package com.dvhl.forum_be.model;

import java.sql.Date;
import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
// import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
// import javax.persistence.JoinTable;
// import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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
    @JoinColumn(name = "role_id",referencedColumnName = "id")
    private Role role;
    @Column(nullable = false)
    private boolean isblocked;
    private String name;
    private String email;
    private String phone;
    private Date birthdate;
    private Timestamp createdat;
    private Timestamp updatedat;
    public User() {
    }


    public User(String username, String password, Role role, boolean isblocked, String name, String email,
            String phone, Date birthdate, Timestamp created_at, Timestamp updated_at) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.isblocked = isblocked;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.birthdate = birthdate;
        this.createdat = created_at;
        this.updatedat = updated_at;
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
    public Timestamp getCreated_at() {
        return createdat;
    }
    public void setCreated_at(Timestamp created_at) {
        this.createdat = created_at;
    }
    public Timestamp getUpdated_at() {
        return updatedat;
    }
    public void setUpdated_at(Timestamp updated_at) {
        this.updatedat = updated_at;
    }
}
