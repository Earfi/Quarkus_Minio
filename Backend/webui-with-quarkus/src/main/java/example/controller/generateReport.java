package example.controller;

import example.dto.ReportDto;
import example.service.ReportService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
@Path("/api/v1/report")
public class generateReport {
    @Inject
    ReportService reportService;

    @POST
    @Path("/generate/{filename}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces("application/pdf")
    public Response generateReport(@Valid ReportDto reportDto ,@PathParam("filename") String filename) throws Exception {
        String fileName = filename+".pdf";
        byte[] pdfBytes = reportService.generatePdfReport(reportDto,fileName);
        return Response.ok(pdfBytes, "application/pdf")
                .header("Content-Disposition", "inline; filename=\""+ fileName +"\"")
                .build();
    }
}
