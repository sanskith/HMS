package com.san.nhms.rest;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.san.nhms.data.BillRepository;

@RequestScoped
@Path("/transactions")
public class TranactionResource {

	@Inject
	private BillRepository repository;

	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Response transactionData(Date date) {
		Response.ResponseBuilder builder = null;

		Map<String, Double> responseObj = new HashMap<>();
		responseObj.put("amountOfTheDay", repository.findAmountOfTheDay(date));
		responseObj.put("amountOfTheMonth", repository.findAmountOfTheMonth(date));

		builder = Response.status(200).entity(responseObj);
		return builder.build();
	}

}
