package org.example.resource;

import io.minio.DownloadObjectArgs;
import io.minio.MinioClient;
import io.minio.errors.MinioException;
import org.example.service.MinioBucketService;
import org.example.service.serviceAll.BucketService;
import org.example.service.serviceAll.FileService;
import org.example.service.MinioFileService;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;
import org.springframework.web.bind.annotation.RequestBody;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.InputStream;

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
    public Response getAllFile(@PathParam("bucket") String bucket) throws Exception {
        return Response.status(200).entity(fileService.getAllFile(bucket)).build();
    }

    @GET
    @Path("/file/{bucket}/{objName}/{fileName}")
    public Response downloadFile(@PathParam("bucket") String bucket, @PathParam("objName") String objName, @PathParam("fileName") String fileName) throws Exception {
        return Response.status(200).entity(fileService.downloadFile(bucket,objName,fileName)).build();
    }

    @POST
    @Path("/file/upload/{bucket}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadFile(@PathParam("bucket") String bucketName,
                           @MultipartForm FileService file) throws Exception {
        InputStream filStream = file.file;
        try  {
            return Response.status(200).entity(fileService.uploadFile(bucketName, filStream, file.fileName)).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity("Failed to upload file").build();
        }
    }

    @DELETE
    @Path("/file/delete/{bucket}/{fileName}")
    public Response deleteFile(@PathParam("bucket") String bucketName,
                               @PathParam("fileName") String fileName) throws Exception {
        fileService.deleteFile(bucketName,fileName);
        return Response.ok().build();
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
        String bucketName = requestBody.getBucketName();
        return Response.ok().entity(bucketService.uploadBucket(bucketName)).build();
    }

    @DELETE
    @Path("/bucket/delete")
    public Response deleteBucket(@QueryParam("bucketName") String bucketName) throws Exception {
        return Response.ok().entity(bucketService.removeBucket(bucketName)).build();
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