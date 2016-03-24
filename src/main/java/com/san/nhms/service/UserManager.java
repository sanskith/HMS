package com.san.nhms.service;

import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.san.nhms.model.Users;

@Stateless
public class UserManager {
	@Inject
	private Logger log;

	@Inject
	private EntityManager em;

	@Inject
	private Event<Users> usersEventSrc;

	public void create(Users users) throws Exception {
		em.persist(users);
		log.info("Created User --" + users.getName());
		usersEventSrc.fire(users);
	}

	public void upadte(Users users) throws Exception {
		em.merge(users);
		log.info("Updated User --" + users.getName());
		usersEventSrc.fire(users);
	}

	public void delete(long id) throws Exception {
		Users users = em.find(Users.class, id);
		em.remove(users);
		log.info("Deleted User	:" + users.getName());
		usersEventSrc.fire(users);
	}
}
