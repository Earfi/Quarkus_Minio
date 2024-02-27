package example.service;

import example.dto.UserDto;
import example.model.Address;
import example.model.User;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

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

        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setBirthdate(dto.getBirthdate());
        user.setRoles(dto.getRoles());
        user.setCreated_at(ZonedDateTime.now());
        user.setUpdated_at(ZonedDateTime.now());
        user.persist();

        return user;
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
