package com.mbikwik.Authentication.services;

import com.mbikwik.Authentication.dao.DatabaseConnection;
import com.mbikwik.Authentication.Utility.UserData;
import com.mbikwik.Authentication.model.InstituteDetails;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

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

    Statement stmt=DatabaseConnection.getStatement();
    ResultSet rs=stmt.executeQuery("select college,location from Detail");
    if(rs.next())
    {
        for(;rs.next();)
        {
            instituteName.add(rs.getString("college"));
            location.add(rs.getString("location"));
        }
    }
    instituteDetails.setInstitute_name(instituteName);
    instituteDetails.setRegion(location);

}

 public String saveStudentDetails(String name, String id, boolean status) throws SQLException, ClassNotFoundException {

     Statement statement=DatabaseConnection.getStatement();
     if(status==false)
         return "Payment not successfull";
     statement.executeUpdate("UPDATE TABLE Detail set paid = '"+true+"' WHERE NAME = '"+name+"' AND ID = '"+id+ "''");
     return "you have paid successfully";
 }


 public String pay(UserData userData) throws SQLException, ClassNotFoundException {
     Statement statement=DatabaseConnection.getStatement();
     ResultSet resultSet=statement.executeQuery("select paid from table WHERE NAME = '"+userData.getName()+"id = '"+userData.getRollNumber()+"'");
     if(!resultSet.next())
         return "Invalid details";
     boolean flag=false;
     flag = resultSet.getBoolean("paid");
     if(flag==true)
         return "Fee Already paid";
     statement.executeUpdate("UPDATE TABLE Detail SET paid = '"+true+"' WHERE id = '"+userData.getRollNumber()+"' AND name = '"+userData.getName()+"'");
     return "paid successfully";
 }


}
