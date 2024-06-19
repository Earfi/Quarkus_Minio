package example.service.announcement;

import example.dto.announcement.AnnouncementAddDto;
import example.model.User;
import example.model.announcement.Announcement;
import example.model.announcement.AnnouncementAdd;
import example.repository.AnnouncementRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class AnnouncementService {

    @Inject
    AnnouncementRepository repository;

    @Inject
    EntityManager entityManager;


    public List<Announcement> listAllAnnouncement() {
        List<Announcement> announcements = Announcement.listAll();
        Collections.reverse(announcements);
        return announcements;
    }

    @Transactional
    public AnnouncementAddDto createAnnouncement(AnnouncementAddDto dto) {
        AnnouncementAdd announcement = new AnnouncementAdd();
        announcement.setTitle(dto.getTitle());
        announcement.setContent(dto.getContent());
        announcement.setPostDate(LocalDateTime.now());
        announcement.setUser(dto.getUser());
        announcement.setAnnouncementType(dto.getAnnouncementType());

        entityManager.persist(announcement);

        dto.setAnnouncement_id(announcement.getAnnouncement_id());



        return dto;
    }

    @Transactional
    public void removeAnnouncement(Long Id) {
        Optional<Announcement> userOptional = Announcement.findByIdOptional(Id);
        userOptional.ifPresent(Announcement::delete);
    }



}
