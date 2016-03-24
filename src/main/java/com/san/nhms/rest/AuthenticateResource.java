package com.san.nhms.rest;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.san.nhms.controller.Authenticator;
import com.san.nhms.model.Users;

@Path("/authenticate")
@RequestScoped
public class AuthenticateResource {

	@Inject
	private Authenticator authenticator;

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Users authenticate(Users users) {
		return authenticator.authenticate(users);
	}
}
