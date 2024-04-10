package example.service.user;

import example.dto.user.UserDto;
import example.model.User;
import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
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
    public User createUser(UserDto userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(BcryptUtil.bcryptHash(userDto.getPassword()));
        user.setBirthdate(userDto.getBirthdate());
        user.setRoles(userDto.getRoles());
        user.setCreated_at(LocalDateTime.now());
        user.setUpdated_at(LocalDateTime.now());
        user.setProfileImagePath(userDto.getProfileImagePath());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setNickname(userDto.getNickname());
        user.setAge(userDto.getAge());
        user.setGender(userDto.getGender());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setEmail(userDto.getEmail());
        user.setAddress(userDto.getAddress());
        user.setGithub(userDto.getGithub());

        user.persist();

        return user;
    }

    @Transactional
    public boolean existsByUsername(String username) {
        return User.count("username", username) > 0;
    }

    @Transactional
    public User updateUser(Long userId,UserDto dto) {
        User user = User.findById(userId);
        if (user == null) {
            throw new RuntimeException("User with id " + userId + " not found");
        }

        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setBirthdate(dto.getBirthdate());
        user.setRoles(dto.getRoles());
        user.setProfileImagePath(dto.getProfileImagePath());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setNickname(dto.getNickname());
        user.setAge(dto.getAge());
        user.setGender(dto.getGender());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setEmail(dto.getEmail());
        user.setAddress(dto.getAddress());
        user.setGithub(dto.getGithub());

        user.persist();

        return user;
    }

    @Transactional
    public void removeUser(Long userId) {
        Optional<User> userOptional = User.findByIdOptional(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.delete();
        }
    }
}
