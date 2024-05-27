package example.service.minio;

import io.minio.GetObjectTagsArgs;
import io.minio.MinioClient;
import io.minio.SetObjectTagsArgs;
import io.minio.errors.MinioException;
import io.minio.messages.Tags;
import io.vertx.codegen.doc.Tag;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class MinioTagsService {

    @Inject
    MinioClient minioClient;

//    public void addMoreTags(String bucketName, String objectName, Map<String, String> tags) throws MinioException, IOException, NoSuchAlgorithmException, InvalidKeyException {
//        Tags objectTags = Tags.newObjectTags(tags);
//        minioClient.setObjectTags(
//                SetObjectTagsArgs.builder()
//                        .bucket(bucketName)
//                        .object(objectName)
//                        .tags(objectTags)
//                        .build());
//    }
    public void addMoreTags(String bucketName, String objectName, Map<String, String> newTags) {
//        [{"key":"shirt color","value":"blue"},{"key":"theme","value":"nature"}]
        try {
            Map<String, String> existingTags = minioClient.getObjectTags(
                    GetObjectTagsArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .build()).get();

            Map<String, String> combinedTags = new HashMap<>(existingTags);
            combinedTags.putAll(newTags);

            minioClient.setObjectTags(
                    SetObjectTagsArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .tags(combinedTags)
                            .build());
        } catch (MinioException | IOException | NoSuchAlgorithmException | InvalidKeyException e) {
            e.printStackTrace();
        }
    }

    public void deleteTagsByKey(String bucketName, String objectName, String key) {
        try {
            Map<String, String> existingTags = new HashMap<>(minioClient.getObjectTags(
                    GetObjectTagsArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .build()).get());

            existingTags.remove(key);

            minioClient.setObjectTags(
                    SetObjectTagsArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .tags(existingTags)
                            .build());
        } catch (MinioException | IOException | NoSuchAlgorithmException | InvalidKeyException e) {
            e.printStackTrace();
        }
    }

}
