package com.san.nhms.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import javax.ejb.Stateless;
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

	public long create(Bill bill) throws Exception {
		Users users = em.find(Users.class, bill.getUsers().getId());
		em.detach(users);
		em.merge(users);
		bill.setUsers(users);
		bill.setDate(new Date());
		em.persist(bill);
		
		int n = bill.getBillMedicines().size();

		for (int i = 0; i < n; i++) {
			BillMedicine billMedicine = new BillMedicine(bill.getBillMedicines().get(i).getUnits(),
					bill, bill.getBillMedicines().get(i).getMedicine());
			em.persist(billMedicine);
			em.merge(billMedicine.getMedicine());
		}

		log.info("Created Bill	 --" + bill.getId());
		em.flush();
		return bill.getId();
	}

	public void upadte(Bill bill) throws Exception {
		

		em.createQuery("delete from BillMedicine m  where m.bill.id = ?1").setParameter(1, bill.getId())
				.executeUpdate();

		int n = bill.getBillMedicines().size();
		
		List<BillMedicine> list = new ArrayList<>();

		for (int i = 0; i < n; i++) {
			BillMedicine billMedicine = new BillMedicine(bill.getBillMedicines().get(i).getUnits(),
					bill, bill.getBillMedicines().get(i).getMedicine());
			em.persist(billMedicine);
			list.add(billMedicine);
			em.merge(billMedicine.getMedicine());
		}
		
		Users users = em.find(Users.class, bill.getUsers().getId());
		em.detach(users);
		em.merge(users);
		bill.setUsers(users);
		bill.setDate(new Date());
		bill.setBillMedicines(list);
		em.merge(bill);
		
		log.info("Updated Bill	 --" + bill.getId());
	}

	public void delete(long id) throws Exception {
		Bill bill = em.find(Bill.class, id);

		em.createQuery("delete from BillMedicine m  where m.bill.id = ?1").setParameter(1, bill.getId())
				.executeUpdate();

		em.remove(bill);
		log.info("Deleted Bill:" + bill.getId());
	}
}
