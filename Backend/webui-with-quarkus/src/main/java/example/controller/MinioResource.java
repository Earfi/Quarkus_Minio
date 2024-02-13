package example.controller;

import example.service.MinioBucketService;
import example.service.MinioFileService;
import example.service.serviceAll.BucketService;
import example.service.serviceAll.FileService;
import io.minio.DownloadObjectArgs;
import io.minio.MinioClient;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import java.io.*;
import java.util.List;

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
    public Response getAllFile(@PathParam("bucket") String bucket) throws Exception {
        List<String> files = fileService.getAllFile(bucket);
        return Response.ok(files).build();
    }

    @GET
    @Path("/download/file/{bucket}/{fileName}")
    public Response downloadFile(@PathParam("bucket") String bucket, @PathParam("fileName") String fileName) throws Exception {
        InputStream stream = fileService.downloadFile(bucket,fileName);
        return Response.ok(stream).build();
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
    @Path("/{bucket}/delete")
    public Response deleteBucket(@PathParam("bucket") String bucketName) throws Exception {
        bucketService.removeBucket(bucketName);
        return Response.status(200).build();
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