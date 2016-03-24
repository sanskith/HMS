package com.san.nhms.service;

import java.util.Date;
import java.util.logging.Logger;

import javax.ejb.Stateless;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.san.nhms.model.Bill;
import com.san.nhms.model.BillMedicine;
import com.san.nhms.model.Users;

@Stateless
public class BillManager {
	@Inject
	private Logger log;

	@Inject
	private EntityManager em;

	@Inject
	private Event<Bill> billEventSrc;

	public long create(Bill bill) throws Exception {
		Users users = em.find(Users.class, bill.getUsers().getId());
		em.detach(users);
		em.merge(users);
		bill.setUsers(users);
		bill.setDate(new Date());
		bill.setBillMedicines(bill.getBillMedicines());
		em.persist(bill);

		for (BillMedicine billMedicine : bill.getBillMedicines()) {
			billMedicine.setBill(bill);
			em.persist(billMedicine);
			em.merge(billMedicine.getMedicine());
		}
		log.info("Created Bill	 --" + bill.getId());
		em.flush();
		billEventSrc.fire(bill);
		return bill.getId();
	}

	public void upadte(Bill bill) throws Exception {
		Users users = em.find(Users.class, bill.getUsers().getId());
		em.detach(users);
		em.merge(users);
		bill.setUsers(users);
		bill.setDate(new Date());
		bill.setBillMedicines(bill.getBillMedicines());
		em.merge(bill);

		em.createQuery("delete from BillMedicine m  where m.bill.id = ?1")
		.setParameter(1, bill.getId())
		.executeUpdate();

		for (BillMedicine billMedicine : bill.getBillMedicines()) {
			billMedicine.setBill(bill);
			em.persist(billMedicine);
			em.merge(billMedicine.getMedicine());
		}
		log.info("Created Bill	 --" + bill.getId());
		billEventSrc.fire(bill);
	}

	public void delete(long id) throws Exception {
		Bill bill = em.find(Bill.class, id);
		
		em.createQuery("delete from BillMedicine m  where m.bill.id = ?1")
		.setParameter(1, bill.getId())
		.executeUpdate();
		
		em.remove(bill);
		log.info("Deleted Medicine:" + bill.getId());
		billEventSrc.fire(bill);
	}
}
