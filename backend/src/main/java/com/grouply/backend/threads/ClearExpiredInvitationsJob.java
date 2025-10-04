package com.grouply.backend.threads;

import com.grouply.backend.invitation.InvitationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;

@RequiredArgsConstructor
public class ClearExpiredInvitationsJob extends Thread {

    private final InvitationRepository invitationRepository;

    /**
     * this deletes all the invited that haven't got response a month since the request
     */
    @Override
    @Scheduled(cron = "* * * * * *")
    public void run() {

        // fetch all the invitations that are invited before 30 days and clear them

    }

}
