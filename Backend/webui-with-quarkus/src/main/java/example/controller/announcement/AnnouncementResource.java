package example.controller.announcement;

import example.controller.User.inject.ProfileImageUploadForm;
import example.dto.announcement.AnnouncementAddDto;
import example.model.announcement.Announcement;
import example.service.announcement.AnnouncementService;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import java.util.List;

@Path("/announcement")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AnnouncementResource {

    @Inject
    AnnouncementService service;

    @GET
    @PermitAll
    public Response listAll(){
        List<Announcement> list = service.listAllAnnouncement();
        return Response.ok(list).build();
    }

    @POST
    @RolesAllowed({"Admin"})
    public Response addAnnouncement(AnnouncementAddDto dto, @MultipartForm ProfileImageUploadForm form){
        AnnouncementAddDto announcement = service.createAnnouncement(dto);
        return Response.ok(announcement).status(201).build();
    }

    @DELETE
    @RolesAllowed({"Admin"})
    @Path("/{id}")
    public Response deleteAnnouncement(@PathParam("id") Long id){
        service.removeAnnouncement(id);
        return Response.status(204).build();
    }

}
