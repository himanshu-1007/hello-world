package com.mbikwik.Authentication.model;

import java.util.ArrayList;

public class InstituteDetails {

    ArrayList<String> region=new ArrayList<String>();
    ArrayList<String> institute_name=new ArrayList<String>();

    public ArrayList<String> getRegion() {
        return region;
    }

    public void setRegion(ArrayList<String> region) {
        this.region = region;
    }

    public ArrayList<String> getInstitute_name() {
        return institute_name;
    }

    public void setInstitute_name(ArrayList<String> institute_name) {
        this.institute_name = institute_name;
    }


}
