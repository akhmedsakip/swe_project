package com.example.sweproj.utils;

import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class CookieUtil {
    private int MAX_AGE = 60 * 60 * 24 * 3;
    private String tokenName = "access-token";

    CookieUtil() {}

    public Cookie createCookieWithToken(String token) {
        Cookie cookie = new Cookie(tokenName, token);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(MAX_AGE);
        cookie.setPath("/");
        return cookie;
    }

    public Optional<Cookie> findTokenCookie(Cookie[] cookies) {
        if(cookies == null) {
            return Optional.empty();
        }
        return Stream.of(cookies).filter(e -> e.getName().equals(tokenName)).findFirst();
    }

    public Optional<Cookie> deletedTokenCookie(Cookie[] cookies) {
        if(cookies == null) {
            return Optional.empty();
        }
        Optional<Cookie> cookie = Stream.of(cookies).filter(e -> e.getName().equals(tokenName)).findFirst();;
        cookie.ifPresent(value -> value.setMaxAge(0));
        cookie.ifPresent(value -> value.setHttpOnly(true));
        cookie.ifPresent(value -> value.setPath("/"));
        return cookie;
    }
}
