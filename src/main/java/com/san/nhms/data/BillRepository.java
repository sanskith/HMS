package com.san.nhms.data;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.san.nhms.model.Bill;
import com.san.nhms.model.BillMedicine;

@ApplicationScoped
public class BillRepository {

	@Inject
	private EntityManager em;

	public Bill findById(Long id) {
		return em.find(Bill.class, id);
	}

	public void deleteById(Long id) throws Exception {
		Bill bill = findById(id);
		em.remove(bill);
	}

	public List<Bill> findAllOrderedByName() {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Bill> criteria = cb.createQuery(Bill.class);
		Root<Bill> bill = criteria.from(Bill.class);
		criteria.select(bill).orderBy(cb.asc(bill.get("customerName")));
		List<Bill> bills = em.createQuery(criteria).getResultList();
		return bills;
	}

	public List<BillMedicine> AllBillMedicines(Long id) {
		List<BillMedicine> billMedicines = em
				.createQuery("select b from  BillMedicine b where b.bill.id = ?1", BillMedicine.class)
				.setParameter(1, id)
				.getResultList();
		return billMedicines;
	}
}
