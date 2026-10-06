package com.techelevator.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


public class User {

    private int id;
    private String username;
    private String email;
    private String location;
    @JsonIgnore
    private String password;
    @JsonIgnore
    private boolean activated;


    private String role;

    private Set<Authority> authorities = new HashSet<>();

    public User() { }


    public User(int id, String username, String password, String role, String email, String location) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
        this.location = location;
        this.activated = true;
        if(role != null && !role.trim().isEmpty()) {
            setAuthorities(role);
        }
    }

    public User(String username, String password, String role, String email, String location) {
        this(0, username, password, role, email, location);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public String getAuthoritiesString() {
        StringBuilder authString = new StringBuilder();
        for (Authority auth : authorities) {
            if (authString.length() > 0) authString.append(",");
            authString.append(auth.getName());
        }
        return authString.toString();
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    public void setAuthorities(String authorities) {
        String[] roles = authorities.split(",");
        for(String role : roles) {
            String authority = role.contains("ROLE_") ? role : "ROLE_" + role.toUpperCase();
            this.authorities.add(new Authority(authority));
        }
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
        if(role != null && !role.trim().isEmpty()) {
            setAuthorities(role);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id &&
                activated == user.activated &&
                Objects.equals(username, user.username) &&
                Objects.equals(password, user.password) &&
                Objects.equals(role, user.role) &&
                Objects.equals(email, user.email) &&
                Objects.equals(location, user.location) &&
                Objects.equals(authorities, user.authorities);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, role, email, location, activated, authorities);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", role='" + role + '\'' +
                ", email='" + email + '\'' +
                ", location='" + location + '\'' +
                ", activated=" + activated +
                ", authorities=" + authorities +
                '}';
    }
}
