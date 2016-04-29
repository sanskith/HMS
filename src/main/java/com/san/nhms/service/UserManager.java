package com.san.nhms.service;

import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.san.nhms.model.SecuirtyQuestions;
import com.san.nhms.model.Users;

@Stateless
public class UserManager {
	@Inject
	private Logger log;

	@Inject
	private EntityManager em;

	public void create(Users users) throws Exception {
		for(SecuirtyQuestions secuirtyQuestions : users.getSecuirtyQuestions()){
			secuirtyQuestions.setUsers(users);
		}
		em.persist(users);
		log.info("Created User --" + users.getName());
	}

	public void upadte(Users users) throws Exception {
		
		em.createQuery("delete from SecuirtyQuestions s where s.users.id = ?1 ")
		.setParameter(1, users.getId()).executeUpdate();
		
		for(SecuirtyQuestions secuirtyQuestions : users.getSecuirtyQuestions()){
			secuirtyQuestions.setUsers(users);
		}
		em.merge(users);
		log.info("Updated User --" + users.getName());
	}

	public void delete(long id) throws Exception {
		Users users = em.find(Users.class, id);
		em.remove(users);
		log.info("Deleted User	:" + users.getName());
	}
}
