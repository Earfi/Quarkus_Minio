package example.service.user;

import example.dto.user.UserDto;
import example.model.User;
import example.repository.UserRepository;
import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository repository;

    public List<User> listAllUser() {
        return User.listAll();
    }

    public UserDto getUserById(Long id) {
        User user = User.findById(id);
        if (user != null) {
            return convertToUserDto(user);
        }
        return null;
    }

    public UserDto getUserByUsername(String username) {
        User user = repository.findByUsername(username);
        if (user != null) {
            return convertToUserDto(user);
        }
        return null;
    }

    @Transactional
    public UserDto createUser(UserDto userDto) {
        User user = new User();
        setUserFields(user, userDto);
        user.persist();
        return convertToUserDto(user);
    }

    @Transactional
    public boolean existsByUsername(String username) {
        return User.count("username", username) > 0;
    }

    @Transactional
    public void removeUser(Long userId) {
        Optional<User> userOptional = User.findByIdOptional(userId);
        userOptional.ifPresent(User::delete);
    }

    @Transactional
    public String saveProfileImage(byte[] fileBytes, String fileName) throws IOException {
        String uploadDir = "C:\\project_minio_quarkus_jasper_react\\img\\profile";
        String filePath = uploadDir + File.separator + fileName;
        File file = new File(filePath);
        FileUtils.writeByteArrayToFile(file, fileBytes);
        return filePath;
    }

    private UserDto convertToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setBirthdate(user.getBirthdate());
        userDto.setRoles(user.getRoles());
        userDto.setProfileImagePath(user.getProfileImagePath());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setNickname(user.getNickname());
        userDto.setAge(user.getAge());
        userDto.setGender(user.getGender());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setEmail(user.getEmail());
        userDto.setAddress(user.getAddress());
        userDto.setGithub(user.getGithub());
        return userDto;
    }

    private void setUserFields(User user, UserDto userDto) {
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
    }


    private String hashPassword(String password) {
        if (password != null && !password.isEmpty()) {
            return BcryptUtil.bcryptHash(password);
        } else {
            return null;
        }
    }

    @Transactional
    public UserDto updateUser(Long userId, UserDto dto) {
        User user = User.findById(userId);
        if (user != null) {
            // เรียกใช้ updateUserFields() แทน setUserFields()
            updateUserFields(user, dto);
            user.persist();
            return convertToUserDto(user);
        }
        return null;
    }

    private void updateUserFields(User user, UserDto userDto) {
        user.setUsername(userDto.getUsername());
        String hashedPassword = hashPassword(userDto.getPassword());
        if (hashedPassword != null) {
            user.setPassword(hashedPassword);
        }
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
    }

}
