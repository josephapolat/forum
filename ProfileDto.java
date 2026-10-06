package com.techelevator.model;
public class ProfileDto{
    private int profileId;
    private String nickname;
    private String bio;

    public int getProfileId(){
        return profileId;
    }
    public String getNickname(){
        return nickname;
    }
    public String getBio(){



        return bio;
    }
    public void setProfileId(int profileId){
        this.profileId = profileId;
    }
    public void setNickname(String nickname){
        this.nickname = nickname;
    }
    public void setBio(String bio){
        this.bio = bio;
    }

}

