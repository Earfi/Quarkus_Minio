package example.service.FeedbacksAndComplaints;


import example.dto.FeedbacksAndComplaints.FeedbacksAndComplaintsAddDto;
import example.model.FeedbacksComplaints.FeedbacksComplaints;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@ApplicationScoped
public class FeedbacksAndComplaintsService {

    @Inject
    EntityManager entityManager;

    public List<FeedbacksComplaints> listAllFeedbacksAndComplaints() {
        List<FeedbacksComplaints> feedbacksAndComplaints = FeedbacksComplaints.listAll();
        Collections.reverse(feedbacksAndComplaints);
        return feedbacksAndComplaints;
    }

    @Transactional
    public FeedbacksAndComplaintsAddDto createFeedbacksAndComplaints(FeedbacksAndComplaintsAddDto dto) {
        FeedbacksComplaints feedbacksAndComplaints = new FeedbacksComplaints();
        feedbacksAndComplaints.setUsername(dto.getUsername());
        feedbacksAndComplaints.setEmail(dto.getEmail());
        feedbacksAndComplaints.setMessage(dto.getMessage());
        feedbacksAndComplaints.setCreatedAt(LocalDateTime.now());

        entityManager.persist(feedbacksAndComplaints);

        dto.setId(feedbacksAndComplaints.getId());

        return dto;
    }
}
