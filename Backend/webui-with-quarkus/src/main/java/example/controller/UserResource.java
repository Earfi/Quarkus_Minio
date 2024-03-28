package example.controller;

import example.dto.AddressDto;
import example.dto.UserDto;
import example.model.Address;
import example.model.User;
import example.service.AddressService;
import example.service.UserService;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
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
    public Response addUser(UserDto dto){
        if (service.existsByUsername(dto.getUsername())) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Username already exists")
                    .build();
        }

        User user = service.addUser(dto);
        return Response.ok(user).status(201).build();
    }

    @DELETE
    @RolesAllowed("Admin")
    @Path("/delete/{id}")
    public Response deleteUser(@PathParam("id") Integer id){
        service.removeUser(id);
        return Response.status(204).build();
    }

    @PUT
    @Path("/update/{id}")
    public Response updateUser(@PathParam("id") Integer id,User user) {
        User existingUser = User.findById(user.getId());
        if (existingUser == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());
        existingUser.setBirthdate(user.getBirthdate());
        existingUser.setRoles(user.getRoles());
        existingUser.setUpdated_at(LocalDateTime.now());

        existingUser.persist();

        return Response.ok(existingUser).build();
    }

}
