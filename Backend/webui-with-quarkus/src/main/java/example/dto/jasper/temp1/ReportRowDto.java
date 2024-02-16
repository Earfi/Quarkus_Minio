package example.dto.jasper.temp1;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReportRowDto {

    @JsonProperty("name")
    @NotNull(message = "can not be null")
    @Size(min = 1, message = "can not be blank")
    private String name;

    @JsonProperty("age")
    private String age = "-";

    @JsonProperty("gender")
    private String gender = "-";

    @JsonProperty("phone")
    private String phone = "-";

    @JsonProperty("birthday")
    private String birthday = "-";

    // Getters and setters.

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }
}