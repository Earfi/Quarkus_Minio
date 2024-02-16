package example.dto;

public class BucketInfo {
    private String name;
    private String creationDate;

    public BucketInfo(String name, String creationDate) {
        this.name = name;
        this.creationDate = creationDate;
    }

    public String getName() {
        return name;
    }

    public String getCreationDate() {
        return creationDate;
    }
}
