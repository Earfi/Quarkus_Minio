package example.controller;

import example.controller.support.minio.deleteFile;
import example.controller.support.minio.downloadFile;
import example.dto.minio.FileInfo;
import example.service.minio.MinioBucketService;
import example.service.minio.MinioFileService;
import example.service.serviceInject.FileUpload;
import example.service.serviceInject.GetBucketName;
import io.minio.MinioClient;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import java.io.InputStream;
import java.util.List;

@Path("/minio")
@Produces(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class MinioResource {
        @Inject
        MinioFileService fileService;

        @Inject
        MinioBucketService bucketService;


        @Inject
        private MinioClient minioClient;

        @GET
        @Path("/file/all/{bucket}")
        @Produces(MediaType.APPLICATION_JSON)
        @PermitAll
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

        @POST
        @Path("/download/file")
        @PermitAll
        public Response downloadFile(@MultipartForm downloadFile file) {
            try {
                // Check if bucket or fileName is empty
                if (file.bucket == null || file.bucket.isEmpty() || file.fileName == null || file.fileName.isEmpty()) {
                    return Response.status(Response.Status.BAD_REQUEST)
                            .entity("Bucket or fileName is empty.")
                            .build();
                }

                InputStream stream = fileService.downloadFile(file.bucket, file.fileName);

                if (stream == null) {
                    return Response.status(Response.Status.NOT_FOUND)
                            .entity("File not found.")
                            .build();
                }

                return Response.ok(stream).build();
            } catch (Exception e) {
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                        .entity("Error downloading file.")
                        .build();
            }
        }

    @POST
    @Path("/file/upload")
    @RolesAllowed({"User","Admin"})
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadFile(@MultipartForm FileUpload file) throws Exception {
        InputStream fileStream = file.file;
        String fileName = file.fileName;
        String bucket = file.bucket;
        String folder = file.folder;

        try {
            Object response;
            if (folder == null) {
                response = fileService.uploadFile(bucket, fileStream, fileName, file.tagsAsString);
                return Response.status(200).entity(response).build();
            } else {
                response = fileService.uploadFile(bucket, folder, fileStream, fileName, file.tagsAsString);
                return Response.status(200).entity(response).build();
            }
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
    @Path("/file/delete")
    @RolesAllowed({"User","Admin"})
    public Response deleteFile(@MultipartForm deleteFile file) {
        try {
            fileService.deleteFile(file.bucket, file.fileName);
            return Response.ok("delete file : " + file.fileName + " successfully.").build();
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
    public Response createBucket(GetBucketName requestBody) {
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