package example.controller;

import example.service.GenPdfDBService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
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
    @Path("/address/export")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces("application/pdf")
    public Response exportPDF() throws IOException, JRException {
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        StreamingOutput streamingOutput = output -> {
            try {
                addressService.exportJasperReportAddress(output);
            } catch (JRException e) {
                throw new RuntimeException(e);
            }
        };

        return Response.ok(streamingOutput, MediaType.APPLICATION_OCTET_STREAM)
                .header("Content-Disposition", "attachment; filename=\" " + currentDateTime + ".pdf\"")
                .build();
    }
}