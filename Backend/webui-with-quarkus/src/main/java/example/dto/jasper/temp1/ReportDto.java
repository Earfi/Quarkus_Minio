package example.dto.jasper.temp1;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReportDto {

    @JsonProperty("companyName")
    @NotNull(message = "can not be null")
    @Size(min = 1, max = 30, message = "can not be blank")
    private String companyName;

    @JsonProperty("companyUrl")
    @NotNull(message = "can not be null")
    @Size(min = 1, max = 30, message = "can not be blank")
    private String companyUrl;

    @Valid
    @JsonProperty("rows")
    @NotNull(message = "can not be null")
    @Size(min = 1, message = "rows can not be empty")
    private List<ReportRowDto> rows;

    // Getters and setters


    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyUrl() {
        return companyUrl;
    }

    public void setCompanyUrl(String companyUrl) {
        this.companyUrl = companyUrl;
    }

    public List<ReportRowDto> getRows() {
        return rows;
    }

    public void setRows(List<ReportRowDto> rows) {
        this.rows = rows;
    }
}
