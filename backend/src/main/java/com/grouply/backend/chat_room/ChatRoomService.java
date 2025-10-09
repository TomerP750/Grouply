//package com.grouply.backend.chat_room;
//
//import com.grouply.backend.chat_member.ChatMember;
//import com.grouply.backend.chat_member.ChatMemberRepository;
//import com.grouply.backend.chat_room.dto.ChatRoomDTO;
//import com.grouply.backend.chat_room.dto.CreateChatRoomDTO;
//import com.grouply.backend.project.Project;
//import com.grouply.backend.project.ProjectRepository;
//import com.grouply.backend.project_member.ProjectMember;
//import com.grouply.backend.project_member.ProjectMemberRepository;
//import com.grouply.backend.user.User;
//import com.grouply.backend.user.UserRepository;
//import com.grouply.backend.util.EntityToDtoMapper;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//import java.util.NoSuchElementException;
//
//@Service
//@Slf4j
//@RequiredArgsConstructor
//public class ChatRoomService {
//
//    private final ChatRoomRepository chatRoomRepository;
//    private final UserRepository userRepository;
//    private final ProjectRepository projectRepository;
//    private final ChatMemberRepository chatMemberRepository;
//    private final ProjectMemberRepository projectMemberRepository;
//
//
//    public ChatRoomDTO createChatRoom(Long userId, CreateChatRoomDTO dto) {
//
//        // ignore validation for now
//
//        Project project = projectRepository.findById(dto.getProjectId()).orElseThrow(() -> new NoSuchElementException("project not exists"));
//
//        ChatRoom chatRoom = ChatRoom.builder()
//                .name(dto.getName())
//                .project(project)
//                .build();
//
//        ProjectMember member = projectMemberRepository.findByUserIdAndProjectId(userId, dto.getProjectId()).orElseThrow(() -> new NoSuchElementException("Member not found"));
//
//        ChatMember newMember = ChatMember.builder()
//                .member(member)
//                .chatRoom(chatRoom)
//                .build();
//
//        chatRoom.getMembers().add(newMember);
//
//        ChatRoom saved = chatRoomRepository.save(chatRoom);
//
//        return EntityToDtoMapper.toChatRoomDto(saved);
//
//    }
//
//    private User fetchUser(Long userId) {
//        return userRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("Not found"));
//    }
//
//}
