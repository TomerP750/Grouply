package com.grouply.backend.threads;


import com.grouply.backend.invitation.InvitationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;


import java.time.LocalDateTime;

@RequiredArgsConstructor
@Slf4j
public class ClearExpiredInvitationsJob extends Thread {

    private final InvitationRepository invitationRepository;

    /**
     * this deletes all the invited that haven't got response a month since the request
     * this will run every day at 00:00
     */
    @Override
    @Scheduled(cron = "0 0 0 * * *")
    public void run() {

        log.info("Clearing expired invitations");
        LocalDateTime threshold = LocalDateTime.now().minusDays(30);
        invitationRepository.clearExpiredInvitations(threshold);
        log.info("Cleared expired Invitations");

    }

}
