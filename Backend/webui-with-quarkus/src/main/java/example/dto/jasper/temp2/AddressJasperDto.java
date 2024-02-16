package example.dto.jasper.temp2;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AddressJasperDto {

    private List<AddressJasperRowDto> addresses;


    public List<AddressJasperRowDto> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<AddressJasperRowDto> addresses) {
        this.addresses = addresses;
    }


}
