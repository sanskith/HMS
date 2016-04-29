package com.san.nhms.rest;


import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Logger;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.NoResultException;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.ValidationException;
import javax.validation.Validator;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.san.nhms.data.BillRepository;
import com.san.nhms.data.MedicineRepository;
import com.san.nhms.model.Bill;
import com.san.nhms.model.BillMedicine;
import com.san.nhms.model.Medicine;
import com.san.nhms.service.BillManager;
import com.san.nhms.service.MedicineManger;

@RequestScoped
@Path("/bills")
public class BillResource {
	@Inject
    private Logger log;

    @Inject
    private Validator validator;


    @Inject
    private BillRepository repository;

    @Inject
    BillManager registration;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Bill> listAllBills() {
        return repository.findAllOrderedByName();
    }
    
    @GET
    @Path("/billMedicine/{id:[0-9][0-9]*}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<BillMedicine> listAllBillMedicines(@PathParam("id") long id) {
        return repository.AllBillMedicines(id);
    }

    @GET
    @Path("/{id:[0-9][0-9]*}")
    @Produces(MediaType.APPLICATION_JSON)
    public Bill lookupBillById(@PathParam("id") long id) {
    	Bill bill = repository.findById(id);
        if (bill == null) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
        return bill;
    }
    
    @DELETE
    @Path("/{id:[0-9][0-9]*}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteBillById(@PathParam("id") long id) {
    	 Response.ResponseBuilder builder = null;
    	try {
			registration.delete(id);
			builder = Response.ok();
		} catch (Exception e) {
			 Map<String, String> responseObj = new HashMap<>();
	            responseObj.put("error", e.getMessage());
	            builder = Response.status(Response.Status.BAD_REQUEST).entity(responseObj);
		}
    	 return builder.build();
    }
    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateMedicine(Bill bill) {

        Response.ResponseBuilder builder = null;

        try {
            // Validates member using bean validation
            //validateMember(medicine);

            registration.upadte(bill);

            // Create an "ok" response
            builder = Response.ok();
        } catch (ConstraintViolationException ce) {
            // Handle bean validation issues
            builder = createViolationResponse(ce.getConstraintViolations());
        } catch (ValidationException e) {
            // Handle the unique constrain violation
            Map<String, String> responseObj = new HashMap<>();
            responseObj.put("name", "Medicine name taken");
            builder = Response.status(Response.Status.CONFLICT).entity(responseObj);
        } catch (Exception e) {
            // Handle generic exceptions
            Map<String, String> responseObj = new HashMap<>();
            responseObj.put("error", e.getMessage());
            builder = Response.status(Response.Status.BAD_REQUEST).entity(responseObj);
        }

        return builder.build();
    }
    

    /**
     * Creates a new member from the values provided. Performs validation, and will return a JAX-RS response with either 200 ok,
     * or with a map of fields, and related errors.
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createMedicine(Bill bill) {

        Response.ResponseBuilder builder = null;

        try {
            // Validates member using bean validation
            //validateBill(bill);

            long billId = registration.create(bill);

            // Create an "ok" response
            Map<String, Long> responseObj = new HashMap<>();
             responseObj.put("id", billId);
            builder = Response.status(200).entity(responseObj);
        } catch (ConstraintViolationException ce) {
            // Handle bean validation issues
            builder = createViolationResponse(ce.getConstraintViolations());
        } catch (ValidationException e) {
            // Handle the unique constrain violation
            Map<String, String> responseObj = new HashMap<>();
           // responseObj.put("name", "Bill name taken");
            builder = Response.status(Response.Status.CONFLICT).entity(responseObj);
        } catch (Exception e) {
            // Handle generic exceptions
            Map<String, String> responseObj = new HashMap<>();
            responseObj.put("error", e.getMessage());
            builder = Response.status(Response.Status.BAD_REQUEST).entity(responseObj);
        }

        return builder.build();
    }

    /**
     * <p>
     * Validates the given Member variable and throws validation exceptions based on the type of error. If the error is standard
     * bean validation errors then it will throw a ConstraintValidationException with the set of the constraints violated.
     * </p>
     * <p>
     * If the error is caused because an existing member with the same email is registered it throws a regular validation
     * exception so that it can be interpreted separately.
     * </p>
     * 
     * @param member Member to be validated
     * @throws ConstraintViolationException If Bean Validation errors exist
     * @throws ValidationException If member with the same email already exists
     */
    private void validateBill(Bill bill) throws ConstraintViolationException, ValidationException {
        // Create a bean validator and check for issues.
        Set<ConstraintViolation<Bill>> violations = validator.validate(bill);

        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(new HashSet<ConstraintViolation<?>>(violations));
        }
    }

    /**
     * Creates a JAX-RS "Bad Request" response including a map of all violation fields, and their message. This can then be used
     * by clients to show violations.
     * 
     * @param violations A set of violations that needs to be reported
     * @return JAX-RS response containing all violations
     */
    private Response.ResponseBuilder createViolationResponse(Set<ConstraintViolation<?>> violations) {
        log.fine("Validation completed. violations found: " + violations.size());

        Map<String, String> responseObj = new HashMap<>();

        for (ConstraintViolation<?> violation : violations) {
            responseObj.put(violation.getPropertyPath().toString(), violation.getMessage());
        }

        return Response.status(Response.Status.BAD_REQUEST).entity(responseObj);
    }
}
