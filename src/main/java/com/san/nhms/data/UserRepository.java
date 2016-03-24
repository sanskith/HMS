package com.san.nhms.data;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.san.nhms.model.Users;

@ApplicationScoped
public class UserRepository {

	@Inject
	private EntityManager em;

	public Users findById(Long id) {
		return em.find(Users.class, id);
	}

	public void deleteById(Long id) throws Exception {
		Users users = findById(id);
		em.remove(users);
	}

	public Users findByName(String name) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Users> criteria = cb.createQuery(Users.class);
		Root<Users> users = criteria.from(Users.class);
		criteria.select(users).where(cb.equal(users.get("username"), name));
		return em.createQuery(criteria).getSingleResult();
	}

	public List<Users> findAllOrderedByName() {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Users> criteria = cb.createQuery(Users.class);
		Root<Users> users = criteria.from(Users.class);
		criteria.select(users).orderBy(cb.asc(users.get("name")));
		return em.createQuery(criteria).getResultList();
	}

}
