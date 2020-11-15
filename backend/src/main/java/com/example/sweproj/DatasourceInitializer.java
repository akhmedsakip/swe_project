package com.example.sweproj;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.DataSourceInitializer;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

import javax.sql.DataSource;

@Configuration
public class DatasourceInitializer {

    @Autowired
    private ProcedureInitializer procedureInitializer;

    @Bean
    public DataSourceInitializer dataSourceInitializer(@Qualifier("mysqlDataSource") final DataSource dataSource) {
        DataSourceInitializer dataSourceInitializer = new DataSourceInitializer();
        dataSourceInitializer.setDataSource(dataSource);
        procedureInitializer.initializeProcedures();
        return dataSourceInitializer;
    }
}