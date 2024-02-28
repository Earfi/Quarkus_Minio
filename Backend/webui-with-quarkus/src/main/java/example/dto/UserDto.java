package example.dto;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

public class UserDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String password;
    private String birthdate;
    private String roles;
    private LocalDateTime  created_at;
    private LocalDateTime updated_at;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public LocalDateTime  getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime  created_at) {
        this.created_at = created_at;
    }

    public LocalDateTime  getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(LocalDateTime  updated_at) {
        this.updated_at = updated_at;
    }
}
