package example.service.minio;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.errors.MinioException;
import io.minio.messages.Bucket;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class MinioBucketService {

    @Inject
    private MinioClient minioClient;

    public List<String> getAllBucket() {
        List<String> bucketReturn = new ArrayList<>();
        try {
            List<Bucket> bucketList = minioClient.listBuckets();
            for (Bucket bucket : bucketList) {
                bucketReturn.add(bucket.name());
            }
        } catch (MinioException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return bucketReturn;
    }

    public Object uploadBucket(String bucketName){
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
    }



}
