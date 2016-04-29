package com.san.nhms.data;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;

import com.san.nhms.model.Medicine;

@ApplicationScoped
public class MedicineRepository {

	@Inject
	private EntityManager em;

	public Medicine findById(Long id) {
		return em.find(Medicine.class, id);
	}

	public void deleteById(Long id) throws Exception{
		Medicine medicine = findById(id);
		em.remove(medicine);
	}

	public Medicine findByName(String name) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Medicine> criteria = cb.createQuery(Medicine.class);
		Root<Medicine> medicine = criteria.from(Medicine.class);
		 Expression<String> path = medicine.get("name");
		criteria.select(medicine).where(cb.equal(cb.lower(path), name.toLowerCase()));
		return em.createQuery(criteria).getSingleResult();
	}

	public List<Medicine> findAllOrderedByName() {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Medicine> criteria = cb.createQuery(Medicine.class);
		Root<Medicine> medicine = criteria.from(Medicine.class);
		criteria.select(medicine).orderBy(cb.asc(medicine.get("name")));
		return em.createQuery(criteria).getResultList();
	}

}
