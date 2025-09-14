package com.madmaximillion.simplerewards;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SimpleRewardsApplication {
    public static void main(String[] args) {
        SpringApplication.run(SimpleRewardsApplication.class, args);
    }
}