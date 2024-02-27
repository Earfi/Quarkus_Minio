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
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;


@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {
    @Inject
    UserService service;

    @GET
    @RolesAllowed({"Admin"})
    public Response listAll(){
        List<User> list = service.listAllUser();
        return Response.ok(list).build();
    }

    @POST
    @Path("/add")
    public Response addUser(UserDto dto){
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









//    @GET
//    @Path("/{id}")
//    public Response listById(@PathParam("id") String id){
//        return Response.ok(service.getAddressById(id)).build();
//    }
}
