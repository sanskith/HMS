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

@Provider
@PreMatching
public class RestAuthenticationFilter implements ContainerRequestFilter {

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
		boolean authenticated = false;
		if (authenticator.getUsers() == null) {
			Users u = new Users();
			u.setUsername(username);
			u.setPassword(password);
			u = authenticator.authenticate(u);
			authenticated = (u == null) ? false : true;
		} else {
			authenticated = (username.equals(authenticator.getUsers().getUsername())
					&& password.equals(authenticator.getUsers().getPassword())) ? true : false;
		}

		return authenticated;
	}
}