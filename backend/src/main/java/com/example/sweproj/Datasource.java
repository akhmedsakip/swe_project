package com.example.sweproj;

import com.example.sweproj.services.UserDataAccessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class Datasource {

    @Bean
    public DataSource mysqlDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl("jdbc:mysql://localhost:3306/sweproj");
        dataSource.setUsername("university");
        dataSource.setPassword("password");
//        System.out.println(dataSource.getConnectionProperties());
//        System.out.println(dataSource.getCatalog());
//        System.out.println("dataSource");

        return dataSource;
    }
}
