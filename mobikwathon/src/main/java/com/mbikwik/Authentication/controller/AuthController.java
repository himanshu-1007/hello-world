package com.mbikwik.Authentication.controller;

import com.mbikwik.Authentication.model.InstituteDetails;
import com.mbikwik.Authentication.services.Service;
import com.sun.tools.internal.ws.processor.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.mbikwik.Authentication.Utility.*;

import java.sql.SQLException;

public class AuthController {

    @Autowired
    private Service service;

@RequestMapping(value = "/instituteDetails",method=RequestMethod.GET)
public ModelAndView details() throws SQLException, ClassNotFoundException {

    InstituteDetails instituteDetails = service.instituteDetails();
   return new ModelAndView("details","command",instituteDetails);
}

<<<<<<< HEAD

    @Autowired
    Service services;

    @RequestMapping(value = "/payStatus")
    public String Payment(@RequestParam("Id") String id, @RequestParam("name") String name, @RequestParam("success") boolean success) throws SQLException, ClassNotFoundException {
        {
            return services.saveStudentDetails(name, id, success);
        }
    }


=======
@RequestMapping(value = "payDetails")
    New_Response evaluate(@RequestBody UserData userData){

    return null;

}
>>>>>>> d73131a87fadd1c697c5123ebaf77f2706a6956a






}





