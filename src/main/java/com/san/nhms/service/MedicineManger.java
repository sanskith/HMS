package com.san.nhms.service;

import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.san.nhms.model.Medicine;
import com.san.nhms.model.Users;

@Stateless
public class MedicineManger {
	@Inject
	private Logger log;

	@Inject
	private EntityManager em;

	public void create(Medicine medicine) throws Exception {
		Users users = em.find(Users.class, medicine.getUsers().getId());
		em.detach(users);
		em.merge(users);
		medicine.setUsers(users);
		em.persist(medicine);
		log.info("Created Medicine --" + medicine.getName());
	}
	
	public void upadte(Medicine medicine) throws Exception {
		Users users = em.find(Users.class, medicine.getUsers().getId());
		em.detach(users);
		em.merge(users);
		medicine.setUsers(users);
		em.merge(medicine);
		log.info("Updated Medicine --" + medicine.getName());
	}
	
	public void delete(long id) throws Exception {
		Medicine medicine = em.find(Medicine.class, id);
		em.remove(medicine);
		log.info("Deleted Medicine:"+ medicine.getName());
	}
}
