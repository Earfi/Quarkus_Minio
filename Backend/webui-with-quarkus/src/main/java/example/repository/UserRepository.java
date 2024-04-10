package example.repository;

import example.model.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;


@ApplicationScoped
public class UserRepository implements PanacheRepositoryBase<User,Long> {

    public User findByUsername(String username) {
        return find("username", username).firstResult();
    }

    public User findByUsernameAndPassword(String username, String password) {
        return find("username = ?1 and password = ?2", username, password).firstResult();
    }

    public List<User> findByRole(String role) {
        return list("roles", role);
    }

}