package com.grouply.backend.service;

import com.grouply.backend.archived_post.ArchivedPost;
import com.grouply.backend.archived_post.ArchivedPostRepository;
import com.grouply.backend.archived_post.ArchivedPostService;
import com.grouply.backend.post.Post;
import com.grouply.backend.post.PostRepository;
import com.grouply.backend.project_member.ProjectMember;
import com.grouply.backend.project_member.ProjectMemberRepository;
import com.grouply.backend.user.User;
import com.grouply.backend.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;

@ExtendWith(MockitoExtension.class)
public class ArchivedPostServiceTest {

    @Mock
    private ArchivedPostRepository archivedPostRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private PostRepository postRepository;
    @Mock
    private ProjectMemberRepository projectMemberRepository;

    @InjectMocks
    private ArchivedPostService archivedPostService;


    User user1;
    User user2;
    Post post;
    ArchivedPost archivedPost;


    @BeforeEach
    void setup() {
        user1 = User.builder()
                .id(1L)
                .build();
        user2 = User.builder()
                .id(2L)
                .build();
        post = Post.builder()
                .id(1L)
                .postedAt(LocalDateTime.now())
                .description("desc")
                .title("title")
                .build();
    }

    @Test
    void toggleArchive_throwsException_whenUserIdNotExists() {

    }

}
