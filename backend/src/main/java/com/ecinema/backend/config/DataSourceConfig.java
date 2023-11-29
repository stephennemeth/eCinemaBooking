package com.ecinema.backend.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Configuration;

@Configuration("dataSourceConfig")
public class DataSourceConfig {
    
    @Value("${spring.datasource.driver-class-name}")
    private String driverName;
    
    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    public DataSource getDataSource() {
        return DataSourceBuilder.create()
                .driverClassName(this.driverName)
                .url(this.url)
                .username(this.username)
                .password(this.password)
                .build();
    }
}
