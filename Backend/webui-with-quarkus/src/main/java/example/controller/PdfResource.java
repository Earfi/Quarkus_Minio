package example.controller;

import example.service.pdf.PdfMergeService;
import example.service.pdf.PdfSplitService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Path("/pdf")
public class PdfResource {

    @Inject
    PdfMergeService pdfMergeService;

    @Inject
    PdfSplitService pdfSplitService;

    @POST
    @Path("/merge")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response mergePdfFiles(@MultipartForm MultipartFormDataInput formDataInput) {
        List<InputPart> parts = formDataInput.getParts();
        if (parts == null || parts.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).entity("No PDF files provided").build();
        }

        List<byte[]> pdfs = new ArrayList<>();
        for (InputPart part : parts) {
            try {
                InputStream inputStream = part.getBody(InputStream.class, null);
                ByteArrayOutputStream buffer = new ByteArrayOutputStream();
                int nRead;
                byte[] data = new byte[16384];
                while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
                    buffer.write(data, 0, nRead);
                }
                buffer.flush();
                pdfs.add(buffer.toByteArray());
            } catch (IOException e) {
                return Response.serverError().entity("Failed to read PDF files").build();
            }
        }

        byte[] mergedPdf = pdfMergeService.mergePdfFiles(pdfs);
        return Response.ok(mergedPdf, "application/pdf").build();
    }

    @POST
    @Path("/split")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response splitPdfFiles(@MultipartForm MultipartFormDataInput formDataInput) {
        List<InputPart> parts = formDataInput.getParts();
        if (parts == null || parts.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).entity("No PDF files provided").build();
        }

        List<byte[]> pdfs = new ArrayList<>();
        for (InputPart part : parts) {
            try {
                InputStream inputStream = part.getBody(InputStream.class, null);
                ByteArrayOutputStream buffer = new ByteArrayOutputStream();
                int nRead;
                byte[] data = new byte[16384];
                while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
                    buffer.write(data, 0, nRead);
                }
                buffer.flush();
                pdfs.add(buffer.toByteArray());
            } catch (IOException e) {
                return Response.serverError().entity("Failed to read PDF files").build();
            }
        }

        List<byte[]> splitPages = pdfSplitService.splitPdf(pdfs);
        if (splitPages == null) {
            return Response.serverError().entity("Failed to split PDF files").build();
        }

        return Response.ok(splitPages).build();
    }

}
