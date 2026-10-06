package com.techelevator.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.techelevator.exception.DaoException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.techelevator.model.Profile;
@Component
public class JdbcProfileDao implements ProfileDao{

    private final JdbcTemplate jdbcTemplate;

    public JdbcProfileDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Profile getProfileById(int profileId) {
        Profile profile = null;
        String sql = "SELECT * FROM profile WHERE profile_id = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, profileId);
            if (results.next()) {
                profile = mapRowToProfile(results);
            }
        }
        catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return profile;
    }

    @Override
    public Profile createProfile(Profile newProfile) {
        return null;
    }

    @Override
    public Profile getProfileByUserId(int userId) {
        Profile profile = null;
        String sql = "SELECT * FROM profile WHERE user_id = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            if (results.next()) {
                profile = mapRowToProfile(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return profile;
    }
    public Profile getProfileByName(String name){
        Profile profile = new Profile();
        String sql = "SELECT * FROM profile WHERE nickname = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, name);
            if (results.next()) {
                profile = mapRowToProfile(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return profile;
    }


    private Profile mapRowToProfile(SqlRowSet rs) {
        Profile profile = new Profile();
        profile.setProfileId(rs.getInt("profile_id"));
        profile.setNickname(rs.getString("nickname"));
        profile.setBio(rs.getString("bio"));

        return profile;
    }
}
