package com.mbikwik.Authentication.services;

import com.mbikwik.Authentication.model.InstituteDetails;

public class Service {


public InstituteDetails instituteDetails()
{
    InstituteDetails instituteDetails=new InstituteDetails();
    saveInstituteDetails(instituteDetails);
    return instituteDetails;
}

public void saveInstituteDetails(InstituteDetails instituteDetails)
{

}

}
