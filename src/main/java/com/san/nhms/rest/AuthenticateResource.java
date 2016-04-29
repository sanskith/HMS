package com.san.nhms.rest;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
		users =  authenticator.authenticate(users);
		if (users == null) {
            throw new WebApplicationException(Response.Status.FORBIDDEN);
        }
		return users;
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Users check(Users users) {
		users =  authenticator.checkUser(users);
		if (users == null) {
            throw new WebApplicationException(Response.Status.FORBIDDEN);
        }
		return users;
	}
}
