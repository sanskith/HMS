package com.san.nhms.data;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.enterprise.context.RequestScoped;
import javax.enterprise.event.Observes;
import javax.enterprise.event.Reception;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;

import com.san.nhms.model.Bill;

@RequestScoped
public class BillListProducer {
	@Inject
	private BillRepository billRepository;

	private List<Bill> bills;

	@Produces
	public List<Bill> getMedicines() {
		return bills;
	}

	public void onBillListChanged(
			@Observes(notifyObserver = Reception.IF_EXISTS) final Bill bill) {
		retrieveAllBillsOrderedByName();
	}

	@PostConstruct
	public void retrieveAllBillsOrderedByName() {
		bills = billRepository.findAllOrderedByName();
	}

}
