package com.example.sweproj.configurations;

import com.example.sweproj.filters.JwtRequestFilter;
import com.example.sweproj.services.UserService;
import com.example.sweproj.utils.UnauthorizedEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.security.co

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()
                .antMatchers("/api/user/**").authenticated()
                .antMatchers("/api/logout").authenticated()
                .antMatchers("/api/reservations").authenticated()
                .antMatchers(HttpMethod.GET, "/api/reservations/all").hasAnyAuthority("READ_ALL_ORDERS")
                .antMatchers(HttpMethod.DELETE, "/api/reservations/admin").hasAnyAuthority("WRITE_ALL_ORDERS")
                .antMatchers("/api/reservations/**").authenticated()
                .antMatchers("/api/persons/").authenticated()
                .antMatchers(HttpMethod.PUT, "/api/persons/edit").hasAnyAuthority("WRITE_ALL_USERS")
                .antMatchers(HttpMethod.GET, "/api/employees").hasAnyAuthority("READ_ALL_EMPLOYEES")
                .antMatchers(HttpMethod.PATCH, "/api/employees/salary").hasAnyAuthority("WRITE_ALL_EMPLOYEES")
                .antMatchers(HttpMethod.POST, "/api/employees/**").hasAnyAuthority("WRITE_ALL_EMPLOYEES")
                .antMatchers(HttpMethod.GET, "/api/schedules").hasAnyAuthority("READ_ALL_SCHEDULES")
                .antMatchers(HttpMethod.GET, "/api/schedules/**").hasAnyAuthority("READ_ALL_SCHEDULES")
                .antMatchers(HttpMethod.PUT, "/api/schedules").hasAnyAuthority("WRITE_ALL_SCHEDULES")
                .antMatchers(HttpMethod.DELETE, "/api/schedules").hasAnyAuthority("WRITE_ALL_SCHEDULES")
                .antMatchers(HttpMethod.GET, "/api/seasons").hasAnyAuthority("READ_ALL_SEASONS")
                .antMatchers(HttpMethod.GET, "/api/seasons/**").hasAnyAuthority("READ_ALL_SEASONS")
                .antMatchers(HttpMethod.POST, "/api/seasons").hasAnyAuthority("WRITE_ALL_SEASONS")
                .antMatchers(HttpMethod.PUT, "/api/seasons").hasAnyAuthority("WRITE_ALL_SEASONS")
                .antMatchers(HttpMethod.PUT, "/api/seasons/**").hasAnyAuthority("WRITE_ALL_SEASONS")
                .antMatchers(HttpMethod.DELETE, "/api/seasons").hasAnyAuthority("WRITE_ALL_SEASONS")
                .antMatchers(HttpMethod.DELETE, "/api/seasons/**").hasAnyAuthority("WRITE_ALL_SEASONS")
                .and().exceptionHandling().authenticationEntryPoint(new UnauthorizedEntryPoint());

        http.authorizeRequests().anyRequest().permitAll().and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
