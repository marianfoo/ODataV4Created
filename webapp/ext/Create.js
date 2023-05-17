sap.ui.define([], function () {
	"use strict";
	return {
		/**
		 * Create Dialog to Upload Excel and open it
		 * @param {*} oEvent
		 */
		create: async function (oEvent) {
            try {
                const payload = {
                    "OrderNo": "3",
                    "buyer": "test@test.de",
                    "currency_code": "EURO",
                };
                const tableObject = this.byId("createactivate::OrdersList--fe::table::Orders::LineItem-innerTable");
                const context = tableObject.getBinding("items").create(payload, true);
                await context.created()
                console.log("succesfull created")
            } catch (error) {
                console.log("error while creating");
                console.log(error);
            }

        }
	};
});
