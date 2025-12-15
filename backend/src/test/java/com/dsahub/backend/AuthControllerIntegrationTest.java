package com.dsahub.backend;

import com.dsahub.backend.dto.LoginRequest;
import com.dsahub.backend.dto.RefreshTokenRequest;
import com.dsahub.backend.dto.RegisterRequest;
import com.dsahub.backend.model.Role;
import com.dsahub.backend.model.User;
import com.dsahub.backend.repository.RefreshTokenRepository;
import com.dsahub.backend.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Set;

import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @BeforeEach
    void setUp() {
        refreshTokenRepository.deleteAll();
        userRepository.deleteAll();
    }
    
    @Test
    void testRegister_Success() throws Exception {
        RegisterRequest request = new RegisterRequest("testuser", "test@example.com", "password123");
        
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.accessToken", notNullValue()))
                .andExpect(jsonPath("$.refreshToken", notNullValue()))
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.email").value("test@example.com"));
    }
    
    @Test
    void testRegister_DuplicateUsername() throws Exception {
        User user = User.builder()
                .username("existinguser")
                .email("existing@example.com")
                .password(passwordEncoder.encode("password123"))
                .roles(Set.of(Role.USER))
                .enabled(true)
                .build();
        userRepository.save(user);
        
        RegisterRequest request = new RegisterRequest("existinguser", "new@example.com", "password123");
        
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Username is already taken"));
    }
    
    @Test
    void testLogin_Success() throws Exception {
        User user = User.builder()
                .username("loginuser")
                .email("login@example.com")
                .password(passwordEncoder.encode("password123"))
                .roles(Set.of(Role.USER))
                .enabled(true)
                .build();
        userRepository.save(user);
        
        LoginRequest request = new LoginRequest("loginuser", "password123");
        
        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken", notNullValue()))
                .andExpect(jsonPath("$.refreshToken", notNullValue()))
                .andExpect(jsonPath("$.username").value("loginuser"));
    }
    
    @Test
    void testLogin_InvalidCredentials() throws Exception {
        LoginRequest request = new LoginRequest("nonexistent", "wrongpassword");
        
        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }
    
    @Test
    void testRefreshToken_Success() throws Exception {
        User user = User.builder()
                .username("refreshuser")
                .email("refresh@example.com")
                .password(passwordEncoder.encode("password123"))
                .roles(Set.of(Role.USER))
                .enabled(true)
                .build();
        userRepository.save(user);
        
        LoginRequest loginRequest = new LoginRequest("refreshuser", "password123");
        
        MvcResult loginResult = mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andReturn();
        
        String responseBody = loginResult.getResponse().getContentAsString();
        String refreshToken = objectMapper.readTree(responseBody).get("refreshToken").asText();
        
        RefreshTokenRequest refreshRequest = new RefreshTokenRequest(refreshToken);
        
        mockMvc.perform(post("/auth/refresh")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(refreshRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken", notNullValue()));
    }
    
    @Test
    void testProtectedRoute_WithoutToken() throws Exception {
        mockMvc.perform(get("/test/user"))
                .andExpect(status().isForbidden());
    }
    
    @Test
    void testProtectedRoute_WithToken() throws Exception {
        User user = User.builder()
                .username("protecteduser")
                .email("protected@example.com")
                .password(passwordEncoder.encode("password123"))
                .roles(Set.of(Role.USER))
                .enabled(true)
                .build();
        userRepository.save(user);
        
        LoginRequest loginRequest = new LoginRequest("protecteduser", "password123");
        
        MvcResult loginResult = mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andReturn();
        
        String responseBody = loginResult.getResponse().getContentAsString();
        String accessToken = objectMapper.readTree(responseBody).get("accessToken").asText();
        
        mockMvc.perform(get("/test/user")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("User content"));
    }
}
