package com.mbikwik.Authentication.services;

import com.mbikwik.Authentication.dao.InstituteDatabaseConnection;
import com.mbikwik.Authentication.model.InstituteDetails;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

public class Service {


public InstituteDetails instituteDetails() throws SQLException, ClassNotFoundException {
    InstituteDetails instituteDetails=new InstituteDetails();
    saveInstituteDetails(instituteDetails);
    return instituteDetails;
}

public void saveInstituteDetails(InstituteDetails instituteDetails) throws SQLException, ClassNotFoundException {

    ArrayList<String> instituteName = null;
    ArrayList<String> location=null;
    String name=null,id=null;

    Statement stmt=InstituteDatabaseConnection.getStatement();
    ResultSet rs=stmt.executeQuery("select college,location from InstituteDetail");
    if(rs.next())
    {
        for(;rs.next();)
        {
            instituteName.add(rs.getString("college"));
            location.add(rs.getString("location"));
        }
    }

}

}
