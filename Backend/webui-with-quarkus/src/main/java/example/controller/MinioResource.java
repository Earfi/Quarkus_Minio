package example.controller;

import example.dto.FileInfo;
import example.service.MinioBucketService;
import example.service.MinioFileService;
import example.service.serviceInject.BucketService;
import example.service.serviceInject.FileService;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import java.io.*;
import java.util.List;
import java.util.UUID;

@Path("/minio")
@Produces(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class MinioResource {
    @Inject
    MinioFileService fileService;

    @Inject
    MinioBucketService bucketService;

    @GET
    @Path("/file/all/{bucket}")
    @Produces(MediaType.APPLICATION_JSON)
//    @Schema(implementation = MinioFileService.class)
//    @APIResponses(value = {
//            @APIResponse(responseCode = "200", description = "ok" , content = @Content(mediaType = "application/json")),
//            @APIResponse(responseCode = "404", description = "Nooo Bucket")
//    })
    public Response getAllFile(@PathParam("bucket") String bucket) {
        try {
            List<FileInfo> files = fileService.getAllFile(bucket);
            return Response.ok(files).build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Nooo Bucket").build();
        }
    }

    @GET
    @Path("/download/file/{bucket}/{fileName}")
    @PermitAll
    public Response downloadFile(@PathParam("bucket") String bucket,
                                 @PathParam("fileName") String fileName) {
        try {
            // Check if bucket or fileName is empty
            if (bucket == null || bucket.isEmpty() || fileName == null || fileName.isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Bucket or fileName is empty.")
                        .build();
            }

            InputStream stream = fileService.downloadFile(bucket, fileName);

            if (stream == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("File not found.")
                        .build();
            }

            // Return response with the file stream
            return Response.ok(stream).build();
        } catch (Exception e) {
            // Return server error response
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error downloading file.")
                    .build();
        }
    }

    @POST
    @Path("/file/upload/{bucket}")
    @RolesAllowed({"User","Admin"})
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadFile(@PathParam("bucket") String bucketName,
                           @MultipartForm FileService file) throws Exception {
        InputStream filStream = file.file;
        String fileName = file.fileName;
        String objectId = UUID.randomUUID().toString();

        try  {
            return Response.status(200).entity(fileService.uploadFile(bucketName, filStream, fileName)).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity("Failed to upload file").build();
        }
    }

    @PUT
    @Path("/file/edit/{bucket}/{oldName}/{newName}")
    @RolesAllowed({"User","Admin"})
    @Consumes(MediaType.MULTIPART_FORM_DATA) 
    public Response renameFile(@PathParam("bucket") String bucketName,
                               @PathParam("oldName") String oldName,
                               @PathParam("newName") String newName) throws Exception {
        try  {
            return Response.status(200).entity(fileService.renameFile(bucketName, oldName, newName)).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity("Failed to upload file").build();
        }
    }

    @DELETE
    @Path("/file/delete/{bucket}/{fileName}")
    @RolesAllowed({"User","Admin"})
    public Response deleteFile(@PathParam("bucket") String bucketName,
                               @PathParam("fileName") String fileName) {
        try {
            fileService.deleteFile(bucketName, fileName);
            return Response.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Failed to delete file").build();
        }
    }



//--------------- bucket ---------------------------

    @GET
    @Path("/all/bucket")
    public Response getAllBucket() throws Exception {
        return Response.status(200).entity(bucketService.getAllBucket()).build();
    }

    @POST
    @Path("/bucket/upload")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({"User","Admin"})
    public Response uploadBucket(BucketService requestBody) {
        try {
            String bucketName = requestBody.getBucketName();
            bucketService.uploadBucket(bucketName);
            return Response.status(200).build();
        }catch (Exception e){
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DELETE
    @Path("/{bucket}/delete")
    @RolesAllowed({"User","Admin"})
    public Response deleteBucket(@PathParam("bucket") String bucketName) {
        try {
            bucketService.removeBucket(bucketName);
            return Response.status(200).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Failed to delete bucket").build();
        }
    }

}