package com.san.nhms.controller;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

import com.san.nhms.model.SecuirtyQuestions;
import com.san.nhms.model.Users;

@ApplicationScoped
public class Authenticator {

	@Inject
	private EntityManager em;

	public Users authenticate(Users users) {
		try {
			users = em
					.createQuery("select u from Users u where u.username = ?1  and u.password = ?2 and u.active = ?3",
							Users.class)
					.setParameter(1, users.getUsername()).setParameter(2, users.getPassword()).setParameter(3, true)
					.getSingleResult();
		} catch (NoResultException exception) {
			users = null;
		}
		return users;
	}

	public Users checkUser(Users users) {

		boolean flag = false;
		try {
			Users dbUsers = em
					.createQuery("select u from Users u  where u.username = ?1 and u.active = ?2", Users.class)
					.setParameter(1, users.getUsername()).setParameter(2, true).getSingleResult();

			List<SecuirtyQuestions> userQuestions = users.getSecuirtyQuestions();
			List<SecuirtyQuestions> dbQuestions = users.getSecuirtyQuestions();

			for (SecuirtyQuestions question : userQuestions) {
				if (dbQuestions.contains(question)) {
					flag = true;
				} else {
					flag = false;
					break;
				}
			}

			if (flag)
				users = dbUsers;
			else
				users = null;

		} catch (NoResultException exception) {
			exception.printStackTrace();
			users = null;
		}
		return users;
	}
}
