package example.service;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.RemoveBucketArgs;
import io.minio.messages.Bucket;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class MinioBucketService {

    @Inject
    private MinioClient minioClient;

    public List<String> getAllBucket() throws Exception{
        List<Bucket> bucketList = minioClient.listBuckets();
        List<String> bucketReturn = new ArrayList<>();
        bucketList.forEach(value -> {
            try {
                bucketReturn.add(value.name());
                System.out.println(value.name() + ", " + value.creationDate());
            }catch (Exception e) {
                e.printStackTrace();
            }
        });
        return bucketReturn;
    }

    public Object uploadBucket(String bucketName){
//        String bucketName = "test";
        try {
            MakeBucketArgs args = MakeBucketArgs.builder()
                    .bucket(bucketName)
                    .build();

            minioClient.makeBucket(args);

            BucketExistsArgs bucketExistsArgs = BucketExistsArgs.builder()
                    .bucket(bucketName)
                    .build();

            if (minioClient.bucketExists(bucketExistsArgs)) {
                System.out.println(bucketName + " exists.");
                return "Bucket " + bucketName + " created successfully";
            } else {
                System.out.println(bucketName + " does not exist.");
                return "Bucket " + bucketName + " creation failed";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "An error occurred: " + e.getMessage();
        }
    }

    public void removeBucket(String bucketName) throws Exception{
        minioClient.removeBucket(bucketName);
//        try {
//            minioClient.removeBucket(
//                    RemoveBucketArgs.builder()
//                            .bucket(bucketName)
//                            .build()
//            );
//            return Response.ok("Bucket removed successfully").build();
//        } catch (Exception e) {
//            e.printStackTrace();
//            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
//                    .entity("Error removing bucket: " + e.getMessage()).build();
//        }
    }

}
