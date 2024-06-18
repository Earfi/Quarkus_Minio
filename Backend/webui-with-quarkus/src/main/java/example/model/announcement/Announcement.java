package example.model.announcement;

import example.model.User;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "announcement")
public class Announcement extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long announcement_id;
    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "post_date")
    private LocalDateTime postDate;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "announcement_type")
    private String announcementType;

    public Long getAnnouncement_id() {
        return announcement_id;
    }

    public void setAnnouncement_id(Long announcement_id) {
        this.announcement_id = announcement_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getPost_date(LocalDateTime now) {
        return postDate;
    }

    public void setPost_date(LocalDateTime post_date) {
        this.postDate = post_date;
    }

    public LocalDateTime getPostDate() {
        return postDate;
    }

    public void setPostDate(LocalDateTime postDate) {
        this.postDate = postDate;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAnnouncementType() {
        return this.announcementType;
    }

    public void setAnnouncementType(String announcementType) {
        this.announcementType = announcementType;
    }

    public String getAnnouncement_type() {
        return announcementType;
    }

    public void setAnnouncement_type(String announcement_type) {
        this.announcementType = announcement_type;
    }

    public void setUser(Long user) {
    }
}
