package com.techelevator.dao;

import com.techelevator.model.Profile;
import com.techelevator.model.User;

public interface ProfileDao {

    Profile getProfileById(int profileId);
    Profile createProfile(Profile newProfile);
    Profile getProfileByUserId(int userId);
    Profile getProfileByName(String name);
}
