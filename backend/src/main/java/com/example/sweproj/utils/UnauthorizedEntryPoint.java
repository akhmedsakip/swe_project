package com.example.sweproj.utils;

import com.google.gson.Gson;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class UnauthorizedEntryPoint implements AuthenticationEntryPoint {

    private Gson gson;

    public UnauthorizedEntryPoint() {
        this.gson = new Gson();
    }

    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
        httpServletResponse.setStatus(401);
        List<Message> serverErrors = Collections.singletonList(new Message("User is not authorized"));
        httpServletResponse.getWriter().write(gson.toJson(serverErrors));
    }
}
