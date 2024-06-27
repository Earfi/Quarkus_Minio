package example.controller.User;

import example.controller.User.inject.ProfileImageUploadForm;
import example.dto.user.UserDto;
import example.model.User;
import example.service.user.UserService;
import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.apache.commons.io.FileUtils;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;
import jakarta.ws.rs.Path;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    UserService service;

    @ConfigProperty(name = "profile.image.upload.dir")
    String uploadDir;

    @GET
    @RolesAllowed({"Admin"})
    @Path("/{id}")
    public Response getUserById(@PathParam("id") Long id){
        UserDto user = service.getUserById(id);
        return Response.ok(user).build();
    }

    @GET
    @Path("/find/{name}")
    public Response getUserByUserName(@PathParam("name") String name){
        UserDto user = service.getUserByUsername(name);
        return Response.ok(user).build();
    }

    @GET
    @RolesAllowed({"Admin"})
    public Response listAllUser(){
        List<User> list = service.listAllUser();
        return Response.ok(list).build();
    }

    @POST
    @Path("/add")
    @PermitAll
    public Response addUser(UserDto dto,@MultipartForm ProfileImageUploadForm form){
        if (service.existsByUsername(dto.getUsername())) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Username already exists")
                    .build();
        }

        UserDto user = service.createUser(dto);
        return Response.ok(user).status(201).build();
    }

    @DELETE
    @RolesAllowed({"Admin","User"})
    @Path("/delete/{id}")
    public Response deleteUser(@PathParam("id") Long id){
        service.removeUser(id);
        return Response.status(204).build();
    }

    @PUT
    @Path("/update/{userId}")
    @RolesAllowed({"Admin","User"})
    public Response updateUser(@PathParam("userId") Long userId, UserDto dto) {
        try {
            UserDto updatedUser = service.updateUser(userId, dto);
            return Response.ok(updatedUser).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/{userId}/profile-image")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"Admin","User"})
    @Transactional
    public Response uploadProfileImage(
            @PathParam("userId") Long userId,
            @MultipartForm ProfileImageUploadForm form
    ) {
        try {
            UserDto user = service.getUserById(userId);
            if (user == null) {
                return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
            }

            String imagePath = saveProfileImage(form.getFile(), user.getUsername());

            user.setProfileImagePath(imagePath);

            String password = user.getPassword();
            if (password != null) {
                String hashedPassword = BcryptUtil.bcryptHash(password);
                user.setPassword(hashedPassword);
            } else {
                // ดำเนินการในกรณีที่รหัสผ่านเป็น null
                // ตรวจสอบว่าคุณต้องการทำอะไรบ้าง
            }

            service.updateUser(userId, user);

            return Response.ok().entity("Profile image uploaded successfully").build();
        } catch (IOException e) {
            e.printStackTrace();
            return Response.serverError().entity("Failed to upload profile image").build();
        }
    }

    private String saveProfileImage(byte[] fileBytes, String username) throws IOException {
        if (fileBytes == null) {
            throw new IllegalArgumentException("File bytes cannot be null");
        }

        String fileName = username + ".jpg";
        String filePath = uploadDir + File.separator  + fileName;
        FileUtils.writeByteArrayToFile(new File(filePath), fileBytes);
        return filePath;
    }

    @GET
    @Path("/{userId}/profile-image")
    @PermitAll
    @Produces("image/jpeg")
    public Response getProfileImage(@PathParam("userId") Long userId) {
        UserDto user = service.getUserById(userId);

        String imagePath = user.getProfileImagePath();

        File imageFile = new File(imagePath);
        if (!imageFile.exists()) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Response.ResponseBuilder responseBuilder = Response.ok(imageFile);
        responseBuilder.type("image/jpeg");
        return responseBuilder.build();
    }
}
