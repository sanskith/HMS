package com.san.nhms.controller;

import javax.ejb.Stateful;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

import com.san.nhms.model.Users;

@Stateful
public class Authenticator {

	@Inject
	private EntityManager em;
	
	private Users users;

	public Users authenticate(Users users) {
		try {
			users = em.createQuery("select u from Users u where u.username = ?1  and u.password = ?2 ", Users.class)
					.setParameter(1, users.getUsername()).setParameter(2, users.getPassword()).getSingleResult();
			this.users = users;
		} catch (NoResultException exception) {
			exception.printStackTrace();
			users = null;
		}
		return users;
	}

	public Users getUsers() {
		return users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}
}
