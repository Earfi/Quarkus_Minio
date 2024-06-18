package example.repository;

import example.model.announcement.Announcement;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AnnouncementRepository implements PanacheRepositoryBase<Announcement,Long> {
}
