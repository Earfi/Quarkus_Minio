package example.controller.User;

import example.dto.user.UserDto;
import example.model.User;
import example.service.user.UserService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.LocalDateTime;
import java.util.List;


@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {
    @Inject
    UserService service;

    @GET
    @RolesAllowed({"Admin"})
    @Path("/{id}")
    public Response getUserById(@PathParam("id") Long id){
        User user = service.getUserById(id);
        return Response.ok(user).build();
    }

    @GET
    @RolesAllowed({"Admin"})
    public Response listAll(){
        List<User> list = service.listAllUser();
        return Response.ok(list).build();
    }

    @POST
    @Path("/add")
    @RolesAllowed({"Admin"})
    public Response addUser(UserDto dto){
        if (service.existsByUsername(dto.getUsername())) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Username already exists")
                    .build();
        }

        User user = service.createUser(dto);
        return Response.ok(user).status(201).build();
    }

    @DELETE
    @RolesAllowed("Admin")
    @Path("/delete/{id}")
    public Response deleteUser(@PathParam("id") Long id){
        service.removeUser(id);
        return Response.status(204).build();
    }

    @PUT
    @Path("/update/{userId}")
    public Response updateUser(@PathParam("userId") Long userId, UserDto dto) {
        try {
            User updatedUser = service.updateUser(userId, dto);
            return Response.ok(updatedUser).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        }
    }


}
