package example.service;

import example.dto.UserDto;
import example.model.User;
import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class UserService {
    public List<User> listAllUser() {
        return User.listAll();
    }

    public User getUserById(Long id) {
        return User.findById(id);
    }

    @Transactional
    public User addUser(UserDto dto) {
        User user = new User();

        System.out.println(ZonedDateTime.now());


        user.setUsername(dto.getUsername());
        user.setPassword(BcryptUtil.bcryptHash(dto.getPassword()));
        user.setBirthdate(dto.getBirthdate());
        user.setRoles(dto.getRoles());
        user.setCreated_at(LocalDateTime.now());
        user.setUpdated_at(LocalDateTime.now());
        user.persist();

        return user;
    }
    @Transactional
    public boolean existsByUsername(String username) {
        return User.count("username", username) > 0;
    }

    public void updateUser(User user) {
        User.persist(user);
    }

    @Transactional
    public void removeUser(Integer id) {
        Optional<User> user = User.findByIdOptional(id);

        if (user.isEmpty()){
            throw new NullPointerException("Address not found!!!");
        }

        User user1 = user.get();

        user1.delete();
    }
}
