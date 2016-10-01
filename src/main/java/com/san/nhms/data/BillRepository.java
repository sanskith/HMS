package com.san.nhms.data;

import java.util.Calendar;
import java.util.Date;
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
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, -3);
		System.out.println("Bill Condition: "+calendar.getTime());
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Bill> criteria = cb.createQuery(Bill.class);
		Root<Bill> bill = criteria.from(Bill.class);
		criteria.select(bill).
		where(cb.greaterThan(bill.get("date"), calendar.getTime())).orderBy(cb.desc(bill.get("id")));
		List<Bill> bills = em.createQuery(criteria).getResultList();
		return bills;
	}
	
	public double findAmountOfTheDay(Date date) {
		double amountOfTheDay = 0d;
		try {
			amountOfTheDay = em.createQuery("select sum(b.total) from Bill  b where b.date = ?1", Double.class)
			.setParameter(1, date).getSingleResult();
		} catch (Exception e) {
			//do Nothing
		}
		
		return amountOfTheDay;
	}
	
	public double findAmountOfTheMonth(Date date) {
		double amountOfTheMonth = 0d;
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.DATE, 1);
		try {
			amountOfTheMonth = em.createQuery("select sum(b.total) from Bill  b where b.date between  ?1 and ?2", Double.class)
			.setParameter(1,  calendar.getTime()).setParameter(2,date).getSingleResult();
		} catch (Exception e) {
			//do Nothing
		}
		return amountOfTheMonth;
	}
}
