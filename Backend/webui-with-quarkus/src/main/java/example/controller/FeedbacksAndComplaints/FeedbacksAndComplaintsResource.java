package example.controller.FeedbacksAndComplaints;

import example.dto.FeedbacksAndComplaints.FeedbacksAndComplaintsAddDto;
import example.model.FeedbacksComplaints.FeedbacksComplaints;
import example.service.FeedbacksAndComplaints.FeedbacksAndComplaintsService;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/feedbacksandcomplaints")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FeedbacksAndComplaintsResource {

    @Inject
    FeedbacksAndComplaintsService service;

    @GET
    @RolesAllowed({"Admin"})
    public Response listAll(){
        List<FeedbacksComplaints> list = service.listAllFeedbacksAndComplaints();
        return Response.ok(list).build();
    }

    @POST
    @RolesAllowed({"User","Admin"})
    public Response addFeedbacksAndComplaints(FeedbacksAndComplaintsAddDto dto){
        FeedbacksAndComplaintsAddDto announcement = service.createFeedbacksAndComplaints(dto);
        return Response.ok(announcement).status(201).build();
    }
}
