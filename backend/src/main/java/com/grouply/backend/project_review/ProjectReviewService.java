//package com.grouply.backend.project_review;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//@Slf4j
//public class ProjectReviewService {
//
//    private final ObjectMapper objectMapper;
//
//    public ProjectReview reviewProject(String githubUrl) {
//
//        String systemPrompt = """
//            You are a senior software engineer reviewing a project.
//            You MUST return a JSON object that matches exactly this Java class:
//
//            class ProjectReview {
//              int grade; // 1-100
//              String summary;
//              List<String> positives;
//              List<String> improvements;
//              Map<String, Integer> metrics; // e.g. {"architecture": 80, "codeQuality": 70}
//            }
//
//            Rules:
//            - grade must be an integer between 1 and 100.
//            - summary: 2-5 sentences maximum.
//            - positives: 3-10 short bullet points.
//            - improvements: 3-10 short bullet points.
//            - metrics: include at least "architecture", "codeQuality", "testing", "maintainability", "performance", "documentation" keys.
//            - IMPORTANT: Return ONLY raw JSON, no markdown, no explanations.
//            """;
//
//        String userPrompt = """
//            Here is the project to review.
//            This is the GitHub repository URL: %s
//
//            Review the project based on typical best practices for architecture,
//            code quality, testing, maintainability, performance and documentation.
//            If you don't have full code, infer from the URL/name as best as you can.
//            """.formatted(githubUrl);
//
//        return null;
//    }
//
//
//}
