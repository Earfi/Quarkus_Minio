package example.controller.jasper;

import example.service.jasper.ReportService;
import io.vertx.core.json.JsonObject;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
@Path("/api/v1/report")
public class generateReport {
    @Inject
    ReportService reportService;

    @POST
    @Path("/generate/{filename}/{bucket}/{jasper}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces("application/pdf")
    public Response generateReport(JsonObject jsonObject, @PathParam("filename") String filename, @PathParam("bucket")String bucket, @PathParam("jasper")String jasper) throws Exception {
        String fileName = filename+".pdf";
        byte[] pdfBytes = reportService.generatePdfReport(jsonObject,fileName,bucket,jasper);
        return Response.ok(pdfBytes, "application/pdf")
                .header("Content-Disposition", "inline; filename=\""+ fileName +"\"")
                .build();
    }
}
