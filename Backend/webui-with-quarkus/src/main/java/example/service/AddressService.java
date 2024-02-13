package example.service;

import example.dto.AddressDto;
import example.model.Address;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class AddressService {

    public List<Address> listAllAddress() {
        return Address.listAll();
    }

    public Address getAddressById(Long id) {
        return Address.findById(id);
    }

    @Transactional
    public Address addAddress(AddressDto dto) {
        Address address = new Address();

        address.setFirstname(dto.getFirstname());
        address.setLastname(dto.getLastname());
        address.setStreet(dto.getStreet());
        address.setCity(dto.getCity());
        address.persist();
        return address;
    }

    public void updateAddress(Address address) {
        Address.persist(address);
    }

    @Transactional
    public void removeAddress(Long id) {
        Optional<Address> address = Address.findByIdOptional(id);

        if (address.isEmpty()){
            throw new NullPointerException("Address not found!!!");
        }

        Address address1 = address.get();

        address1.delete();
    }
}
