package example.controller;

import example.dto.FileInfo;
import example.service.MinioBucketService;
import example.service.MinioFileService;
import example.service.serviceInject.BucketService;
import example.service.serviceInject.FileService;
import io.minio.*;
import io.minio.errors.MinioException;
import io.minio.messages.Item;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import java.io.*;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.UUID;

@Path("/minio")
@Produces(MediaType.APPLICATION_JSON)
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
    @Schema(implementation = MinioFileService.class)
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "ok" , content = @Content(mediaType = "application/json")),
            @APIResponse(responseCode = "404", description = "Nooo Bucket")
    })
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
    public Response downloadFile(@PathParam("bucket") String bucket, @PathParam("fileName") String fileName) throws Exception {
        InputStream stream = fileService.downloadFile(bucket,fileName);
        return Response.ok(stream).build();
    }


    @POST
    @Path("/file/upload/{bucket}")
//    @RolesAllowed({"User","Admin"})
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

//@QueryParam("bucket") String bucketName


//@POST
//@Path("/upload/{bucket}")
//@Consumes(MediaType.MULTIPART_FORM_DATA)
//public void uploadFile(@PathParam("bucket") String bucketName,
//                       @MultipartForm FileService file) throws Exception {
//    try{
//        InputStream filStream = file.file;
//        minioClient.putObject(
//                PutObjectArgs.builder()
//                        .bucket(bucketName)
//                        .object(file.fileName)
//                        .stream(filStream,-1,10485760)
//                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
//                        .build()
//        );
//    }catch (Exception e){
//        e.printStackTrace();
//    }
//}