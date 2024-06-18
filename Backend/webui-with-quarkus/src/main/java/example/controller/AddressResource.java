package example.controller;

import example.dto.AddressDto;
import example.model.Address;
import example.service.AddressService;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import jakarta.ws.rs.Path;

@Path("/address")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AddressResource {
    @Inject
    AddressService service;

    @GET
    @PermitAll
    @Produces(MediaType.TEXT_PLAIN)
    public Response listAll(){
        List<Address> list = service.listAllAddress();
        return Response.ok(list).build();
    }

    @POST
    @RolesAllowed({"Admin"})
    @Path("/add")
    public Response addAddress(AddressDto dto){
        Address address = service.addAddress(dto);
        return Response.ok(address).status(201).build();
    }

    @DELETE
    @RolesAllowed("Admin")
    @Path("/{id}")
    public Response deleteAddress(@PathParam("id") Long id){
        service.removeAddress(id);
        return Response.status(204).build();
    }









//    @GET
//    @Path("/{id}")
//    public Response listById(@PathParam("id") String id){
//        return Response.ok(service.getAddressById(id)).build();
//    }
}
