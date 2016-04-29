package com.san.nhms.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.StringTokenizer;

import javax.inject.Inject;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.ext.Provider;

import com.san.nhms.model.Users;

//Uncomment all if you need security

/*@Provider
@PreMatching*/
public class RestAuthenticationFilter { //implements ContainerRequestFilter {
/*
	@Inject
	private Authenticator authenticator;

	@Override
	public void filter(ContainerRequestContext context) throws IOException {

		String authHeader = context.getHeaderString(HttpHeaders.AUTHORIZATION);
		if (authHeader == null) {
			throw new NotAuthorizedException("Bearer");
		}

		String token = parseToken(authHeader);
		if (verifyToken(token) == false) {
			throw new NotAuthorizedException("Bearer error=\"invalid_token\"");
		}
	}

	private String parseToken(String header) {
		final String encodedUserPassword = header.replaceFirst("Basic" + " ", "");
		String usernameAndPassword = null;
		try {
			byte[] decodedBytes = Base64.getDecoder().decode(encodedUserPassword);
			usernameAndPassword = new String(decodedBytes, "UTF-8");
		} catch (IOException e) {
			e.printStackTrace();
		}
		return usernameAndPassword;
	}

	private boolean verifyToken(String token) {
		final StringTokenizer tokenizer = new StringTokenizer(token, ":");
		String username = tokenizer.nextToken();
		String password = tokenizer.nextToken();
			Users user = new Users();
			user.setUsername(username);
			user.setPassword(password);
			user = authenticator.authenticate(user);
		return user != null;
	}*/
}