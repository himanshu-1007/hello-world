package com.mbikwik.Authentication.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class InstituteDatabaseConnection {

public static Statement getStatement() throws ClassNotFoundException, SQLException {
    Class.forName("com.mysql.jdbc.Driver");
    Connection con= (Connection) DriverManager.getConnection(
            "jdbc:mysql://localhost:3306/sonoo","root","1234");
    Statement st =con.createStatement();
    return  st;
}

}
