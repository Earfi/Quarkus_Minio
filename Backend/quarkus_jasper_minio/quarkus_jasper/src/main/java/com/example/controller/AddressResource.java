package com.example.controller;

import com.example.dto.AddressDto;
import com.example.model.Address;
import com.example.service.AddressService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;


@Path("/address")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AddressResource {
    @Inject
    AddressService service;

    @GET
    public Response listAll(){
        List<Address> list = service.listAllAddress();
        return Response.ok(list).build();
    }

    @POST
    @Path("/add")
    public Response addAddress(AddressDto dto){
        Address address = service.addAddress(dto);
        return Response.ok(address).status(201).build();
    }

    @DELETE
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
