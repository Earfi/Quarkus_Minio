package example.repository;

import example.model.Address;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AddressRepository implements PanacheRepositoryBase<Address, Long> {

}