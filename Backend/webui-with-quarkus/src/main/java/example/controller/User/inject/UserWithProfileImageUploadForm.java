package example.controller.User.inject;

import example.dto.user.UserDto;

public class UserWithProfileImageUploadForm {
    private UserDto userDto;
    private ProfileImageUploadForm profileImageForm;

    public UserDto getUserDto() {
        return userDto;
    }

    public void setUserDto(UserDto userDto) {
        this.userDto = userDto;
    }

    public ProfileImageUploadForm getProfileImageForm() {
        return profileImageForm;
    }

    public void setProfileImageForm(ProfileImageUploadForm profileImageForm) {
        this.profileImageForm = profileImageForm;
    }
}
