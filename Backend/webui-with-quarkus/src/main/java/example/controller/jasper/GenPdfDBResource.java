package example.controller.jasper;

import example.service.jasper.GenPdfDBService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.StreamingOutput;
import net.sf.jasperreports.engine.JRException;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Path("/jasper")
public class GenPdfDBResource {

    @Inject
    GenPdfDBService addressService;

    @GET
    @Path("/address/export/{bucket}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces("application/pdf")
    public Response exportPDF(@PathParam("bucket")String bucket) throws IOException, JRException {
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        StreamingOutput streamingOutput = output -> {
            try {
                addressService.exportJasperReportAddress(output,bucket);
            } catch (JRException e) {
                throw new RuntimeException(e);
            }
        };

        return Response.ok(streamingOutput, MediaType.APPLICATION_OCTET_STREAM)
                .header("Content-Disposition", "attachment; filename=\" " + currentDateTime + ".pdf\"")
                .build();
    }
}