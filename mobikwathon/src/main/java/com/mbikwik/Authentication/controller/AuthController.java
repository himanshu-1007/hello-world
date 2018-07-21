package com.mbikwik.Authentication.controller;

import com.mbikwik.Authentication.model.InstituteDetails;
import com.mbikwik.Authentication.model.StudentDetail;
import com.mbikwik.Authentication.services.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.sql.SQLException;

public class AuthController {

    @Autowired
    private Service service;

@RequestMapping(value = "/instituteDetails",method=RequestMethod.GET)
public ModelAndView details() throws SQLException, ClassNotFoundException {

    InstituteDetails instituteDetails = service.instituteDetails();
   return new ModelAndView("details","command",instituteDetails);
}

@RequestMapping(value = "payDetails")
public ModelAndView studentDetails()
{
    return new ModelAndView("studentDetail","command",new StudentDetail());
}





}
