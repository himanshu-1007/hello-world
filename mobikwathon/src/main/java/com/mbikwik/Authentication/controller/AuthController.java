package com.mbikwik.Authentication.controller;

import com.mbikwik.Authentication.model.InstituteDetails;
import com.mbikwik.Authentication.services.Service;
import com.sun.tools.internal.ws.processor.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.mbikwik.Authentication.Utility.*;

public class AuthController {

    @Autowired
    private Service service;

@RequestMapping(value = "/InstituteDetails",method=RequestMethod.GET)
public ModelAndView details()
{

    InstituteDetails instituteDetails = service.instituteDetails();
   return new ModelAndView("details","command",instituteDetails);
}

@RequestMapping(value = "payDetails")
    New_Response evaluate(@RequestBody UserData userData){

    return null;

}






}





