//package com.grouply.backend.project_review;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/review")
//@RequiredArgsConstructor
//public class ProjectReviewController {
//
//    private final ProjectReviewService projectReviewService;
//
//
//    @PostMapping("/review/${githubUrl}")
//    public ProjectReview reviewProject(@PathVariable String githubUrl) {
//        return projectReviewService.reviewProject(githubUrl);
//    }
//
//
//}
