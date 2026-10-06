package com.techelevator.controller;

import com.techelevator.dao.PostDao;
import com.techelevator.dao.ProfileDao;
import com.techelevator.dao.ReplyDao;
import jakarta.validation.Valid;

import com.techelevator.exception.DaoException;
import com.techelevator.model.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.techelevator.dao.UserDao;
import com.techelevator.security.jwt.TokenProvider;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin
public class AuthenticationController {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserDao userDao;
    private final ProfileDao profileDao;
    private final PostDao postDao;
    private final ReplyDao replyDao;

    public AuthenticationController(TokenProvider tokenProvider,
                                    AuthenticationManagerBuilder authenticationManagerBuilder,
                                    UserDao userDao,
                                    ProfileDao profileDao,
                                    PostDao postDao,
                                    ReplyDao replyDao) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userDao = userDao;
        this.profileDao = profileDao;
        this.postDao = postDao;
        this.replyDao = replyDao;
    }


    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public LoginResponseDto login(@Valid @RequestBody LoginDto loginDto) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.createToken(authentication, false);

            User user = userDao.getUserByUsername(loginDto.getUsername());
            return new LoginResponseDto(jwt, user);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "DAO error - " + e.getMessage());
        }
    }


    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "/register", method = RequestMethod.POST)
    public User register(@Valid @RequestBody RegisterUserDto newUser) {
        try {

            if (userDao.getUserByUsername(newUser.getUsername()) != null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists.");
            }


            if (newUser.getPassword() == null || newUser.getEmail() == null || newUser.getLocation() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing required registration fields.");
            }

            // Create the user
            return userDao.createUser(new User(
                    newUser.getUsername(),
                    newUser.getPassword(),
                    newUser.getRole() != null ? newUser.getRole() : "USER", // default role
                    newUser.getEmail(),
                    newUser.getLocation()
            ));

        } catch (DaoException e) {
            // Log the actual error for debugging
            System.err.println("Registration error: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "User registration failed: " + e.getMessage());
        }
    }


    @RequestMapping(path = "/profile", method = RequestMethod.GET)
    public Profile loadCurrentUserProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();

            User user = userDao.getUserByUsername(username);
            Profile profile = profileDao.getProfileByUserId(user.getId());

            if (profile == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile not found.");
            }
            return profile;
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to retrieve profile.");
        }
    }


    @RequestMapping(path = "/profile/{username}", method = RequestMethod.GET)
    public Profile getProfileByUsername(@PathVariable String username) {
        Profile profile = profileDao.getProfileByName(username);
        if (profile == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return profile;
    }


    @RequestMapping(path = "/posts/{id}/replies", method = RequestMethod.POST)
    public Reply addReply(@PathVariable int id, @RequestBody Reply reply) {
        reply.setPostId(id);
        return replyDao.createReply(reply);
    }

    @RequestMapping(path = "/posts", method = RequestMethod.POST)
    public Post addPost(@RequestBody Post post) {
        try {

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();
            post.setAuthor(username);

            return postDao.createPost(post);
        } catch (DaoException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to create post.");
        }
    }

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public List<Post> loadHome() {
        return postDao.getRandomPosts(10);
    }


    @RequestMapping(path = "/posts/{id}", method = RequestMethod.GET)
    public Post getPostById(@PathVariable int id) {
        return postDao.getPostById(id);
    }
}
